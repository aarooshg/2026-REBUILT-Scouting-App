<script lang="ts" setup>
import { computed, ref } from 'vue';
import { matchRecord } from './MatchRecords';

const autonShotsMissed = computed({
  get: () => matchRecord.value.autonShotsMissed,
  set: (v) => {
    const newValue = Math.max(0, Math.floor(Number(v) || 0));
    // Cap shots missed at shots attempted
    matchRecord.value.autonShotsMissed = Math.min(newValue, matchRecord.value.autonShotsAttempted);
  },
});

const autonShotsAttempted = computed({
  get: () => matchRecord.value.autonShotsAttempted,
  set: (v) => {
    const newValue = Math.max(0, Math.floor(Number(v) || 0));
    matchRecord.value.autonShotsAttempted = newValue;
    // Ensure shots missed doesn't exceed shots attempted
    if (matchRecord.value.autonShotsMissed > newValue) {
      matchRecord.value.autonShotsMissed = newValue;
    }
  },
});

function incMissed() {
  // Only increment if we haven't reached the attempted count
  if (autonShotsMissed.value < autonShotsAttempted.value) {
    autonShotsMissed.value++;
  }
}

function decMissed() {
  autonShotsMissed.value = Math.max(0, autonShotsMissed.value - 1);
}

function incAttempted() {
  autonShotsAttempted.value++;
}

function decAttempted() {
  autonShotsAttempted.value = Math.max(0, autonShotsAttempted.value - 1);
}

// Pickup tracking
const pickupLocations = [
  { value: 0, text: 'Depot' },
  { value: 1, text: 'Outpost' },
  { value: 2, text: 'Neutral Zone' },
];

const pickupOutcomes = [
  { value: 0, text: 'Failed' },
  { value: 1, text: 'Attempted' },
  { value: 2, text: 'Successful' },
];

const selectedLocation = ref<number | undefined>(undefined);
const selectedOutcome = ref<number | undefined>(undefined);

// Initialize autonPickups if it doesn't exist
if (!matchRecord.value.autonPickups) {
  matchRecord.value.autonPickups = [];
}

function addPickup() {
  if (selectedLocation.value === undefined || selectedOutcome.value === undefined) {
    return;
  }
  
  if (!matchRecord.value.autonPickups) {
    matchRecord.value.autonPickups = [];
  }
  
  matchRecord.value.autonPickups.push({
    location: selectedLocation.value,
    outcome: selectedOutcome.value,
  });
  
  // Reset selections
  selectedLocation.value = undefined;
  selectedOutcome.value = undefined;
}

function deletePickup(index: number) {
  if (matchRecord.value.autonPickups) {
    matchRecord.value.autonPickups.splice(index, 1);
  }
}

function getLocationText(location: number | undefined): string {
  if (location === undefined) return '';
  return pickupLocations.find(l => l.value === location)?.text || '';
}

function getOutcomeText(outcome: number | undefined): string {
  if (outcome === undefined) return '';
  return pickupOutcomes.find(o => o.value === outcome)?.text || '';
}
</script>

<template>
  <v-card class="mx-auto my-6" elevation="12" max-width="420" style="border-radius: 24px">
    <v-card-item>
      <v-card-title class="text-center font-weight-bold">Auton — Shot Tracking</v-card-title>
      <v-card-subtitle class="text-center">Track shots attempted and missed</v-card-subtitle>
    </v-card-item>

    <v-card-text class="text-center">
      <div class="mb-6">
        <div class="text-subtitle-1 font-weight-bold mb-2">Shots Attempted</div>
        <div class="d-flex justify-center align-center mt-4">
          <v-btn color="red" variant="outlined" class="mx-2" @click="decAttempted" :disabled="autonShotsAttempted <= 0">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
          <v-text-field
            v-model.number="autonShotsAttempted"
            type="number"
            variant="outlined"
            hide-details
            class="text-center"
            style="max-width: 120px;"
          />
          <v-btn color="primary" class="mx-2" @click="incAttempted">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
      </div>

      <v-divider class="my-4"></v-divider>

      <div class="mb-6">
        <div class="text-subtitle-1 font-weight-bold mb-2">Shots Missed</div>
        <div class="d-flex justify-center align-center mt-4">
          <v-btn color="red" variant="outlined" class="mx-2" @click="decMissed" :disabled="autonShotsMissed <= 0">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
          <v-text-field
            v-model.number="autonShotsMissed"
            type="number"
            variant="outlined"
            hide-details
            class="text-center"
            style="max-width: 120px;"
          />
          <v-btn color="primary" class="mx-2" @click="incMissed" :disabled="autonShotsMissed >= autonShotsAttempted">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
      </div>

      <v-divider class="my-4"></v-divider>

      <!-- Pickup Tracking -->
      <div class="text-subtitle-1 font-weight-bold mb-4">Pickup Tracking</div>
      
      <v-select
        v-model="selectedLocation"
        :items="pickupLocations"
        item-title="text"
        item-value="value"
        label="Pickup Location"
        variant="outlined"
        density="compact"
        hide-details="auto"
        clearable
        class="mb-2"
      ></v-select>

      <v-select
        v-model="selectedOutcome"
        :items="pickupOutcomes"
        item-title="text"
        item-value="value"
        label="Outcome"
        variant="outlined"
        density="compact"
        hide-details="auto"
        clearable
        class="mb-2"
      ></v-select>

      <v-btn
        color="primary"
        @click="addPickup"
        :disabled="selectedLocation === undefined || selectedOutcome === undefined"
        block
        class="mb-4"
      >
        <v-icon left>mdi-plus</v-icon>
        Add Pickup
      </v-btn>

      <!-- List of pickups -->
      <div v-if="matchRecord.autonPickups && matchRecord.autonPickups.length > 0" class="mb-4">
        <div class="text-body-2 font-weight-medium mb-2">Recorded Pickups:</div>
        <v-chip
          v-for="(pickup, index) in matchRecord.autonPickups"
          :key="index"
          closable
          @click:close="deletePickup(index)"
          class="ma-1"
          color="primary"
          variant="outlined"
        >
          {{ getLocationText(pickup.location) }} - {{ getOutcomeText(pickup.outcome) }}
        </v-chip>
      </div>

      <v-divider class="my-4"></v-divider>

      <div>
        <v-checkbox
          v-model="matchRecord.canClimbLevel1Auton"
          label="Can Climb Level 1 in Auton"
          color="primary"
          hide-details
          class="mb-2"
        ></v-checkbox>
        <v-checkbox
          v-model="matchRecord.neutralZoneFeedingAuton"
          label="Neutral Zone Feeding"
          color="primary"
          hide-details
        ></v-checkbox>
        <v-checkbox
          v-model="matchRecord.robotMovedInAuton"
          label="Robot Moved in Auton"
          color="primary"
          hide-details
          class="mt-2"
        ></v-checkbox>
      </div>
    </v-card-text>
  </v-card>
</template>
