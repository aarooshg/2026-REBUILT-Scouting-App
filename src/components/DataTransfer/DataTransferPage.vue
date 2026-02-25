<script lang="ts" setup>
import { ref } from 'vue';
import DataTransferSend from './DataTransferSend.vue';
import DataTransferReceive from './DataTransferReceive.vue';
import { matchRecords } from '../DataCollect/MatchRecords';
import { csvify, type MatchRecord } from '@/data';

const mode = ref<'modeSelection' | 'send' | 'receive'>('modeSelection');

function exportData() {
  // Define CSV headers for all match record fields
  const headers: Partial<Record<keyof MatchRecord, string>> = {
    id: 'id',
    team: 'team',
    match: 'match',
    scouter: 'scouter',
    alliance: 'alliance',
    startingPosition: 'startingPosition',
    preloadedGameElements: 'preloadedGameElements',
    robotMovedInAuton: 'robotMovedInAuton',
    autonShotsMissed: 'autonShotsMissed',
    autonShotsAttempted: 'autonShotsAttempted',
    teleopShotsMissed: 'teleopShotsMissed',
    teleopShotsAttempted: 'teleopShotsAttempted',
    climbLevel: 'climbLevel',
    canGoOverBump: 'canGoOverBump',
    canGoUnderTrench: 'canGoUnderTrench',
    canClimbLevel1Auton: 'canClimbLevel1Auton',
    neutralZoneFeedingAuton: 'neutralZoneFeedingAuton',
    neutralZoneFeedingTeleop: 'neutralZoneFeedingTeleop',
    notes: 'notes',
    preferredPath: 'preferredPath',
  };

  const csvData = csvify(matchRecords.value, headers);
  const blob = new Blob([csvData], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  
  // Generate random numbers for ArgoData filename
  const randomNum = Math.floor(Math.random() * 1000000000);
  a.download = `ArgoData-${randomNum}.csv`;

  a.click();
  URL.revokeObjectURL(url);
  a.remove();
}

function importData() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.csv';  // Changed from .json to .csv
  input.onchange = (event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const csvText = e.target?.result as string;
      if (!csvText) return;

      try {
        // Parse CSV
        const lines = csvText.trim().split('\n');
        if (lines.length < 2) {
          alert('Invalid CSV file: No data found');
          return;
        }

        const headers = lines[0].split(',');
        const importedMatchRecords: MatchRecord[] = [];

        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue;

          const values = lines[i].split(',');
          const record: any = {};

          headers.forEach((header, index) => {
            const value = values[index];
            
            // Type conversion for specific fields
            if (header === 'preloadedGameElements' || header === 'autonShotsMissed' || 
                header === 'autonShotsAttempted' || header === 'teleopShotsMissed' || 
                header === 'teleopShotsAttempted' || header === 'climbLevel' ||
                header === 'alliance' || header === 'startingPosition' || header === 'preferredPath') {
              record[header] = value ? parseInt(value) : 0;
            } else if (header === 'robotMovedInAuton' || header === 'canGoOverBump' || 
                       header === 'canGoUnderTrench' || header === 'canClimbLevel1Auton' ||
                       header === 'neutralZoneFeedingAuton' || header === 'neutralZoneFeedingTeleop') {
              record[header] = value === 'true';
            } else {
              record[header] = value || '';
            }
          });

          importedMatchRecords.push(record as MatchRecord);
        }

        // Merge with existing records (avoid duplicates by ID)
        let newRecords = 0;
        for (const importedRecord of importedMatchRecords) {
          if (!matchRecords.value.some((r) => r.id === importedRecord.id)) {
            matchRecords.value.push(importedRecord);
            newRecords++;
          }
        }

        input.remove();
        alert(`Imported ${newRecords} new match records from CSV`);
      } catch (error) {
        alert(`Error parsing CSV file: ${error}`);
        input.remove();
      }
    };
    reader.readAsText(file);
  };
  input.click();
}
</script>

<template>
  <div class="ma-2 pa-2">
    <div v-if="mode === 'modeSelection'">
      <v-btn color="blue" block @click="mode = 'send'">
        <v-icon class="mr-2">mdi-qrcode</v-icon>
        Send
      </v-btn>
      <br />
      <v-btn color="orange" block class="mt-2" @click="mode = 'receive'">
        <v-icon class="mr-2">mdi-qrcode</v-icon>
        Receive
      </v-btn>
      <br />
      <v-btn color="green" block class="mt-2" @click="exportData">
        <v-icon class="mr-2">mdi-file-download</v-icon>
        Export to File
      </v-btn>
      <br />
      <v-btn color="yellow" block class="mt-2" @click="importData">
        <v-icon class="mr-2">mdi-file-upload</v-icon>
        Import from File
      </v-btn>
    </div>

    <v-btn v-if="mode !== 'modeSelection'" color="red" block @click="mode = 'modeSelection'">
      Cancel
    </v-btn>

    <DataTransferSend v-if="mode === 'send'" />
    <DataTransferReceive v-if="mode === 'receive'" />
  </div>
</template>

