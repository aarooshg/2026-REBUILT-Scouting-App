<script lang="ts" setup>
import { ref } from 'vue';
import DataTransferSend from './DataTransferSend.vue';
import DataTransferReceive from './DataTransferReceive.vue';
import { matchRecords } from '../DataCollect/MatchRecords';

const mode = ref<'modeSelection' | 'send' | 'receive'>('modeSelection');

function exportData() {
  const data = JSON.stringify(matchRecords.value);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `match-records-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  a.remove();
}

function importData() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = (event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      if (!data) return;

      const importedMatchRecords = JSON.parse(data as string);
      let newRecords = 0;
      for (const importedRecord of importedMatchRecords) {
        if (!matchRecords.value.some((r) => r.id === importedRecord.id)) {
          matchRecords.value.push(importedRecord);
          newRecords++;
        }
      }
      input.remove();
      alert(`Imported ${newRecords} new match records`);
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

