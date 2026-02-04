<script lang="ts" setup>
import { computed, watch } from 'vue';
import { matchRecord } from './MatchRecords';

const autonShotsAttempted = computed({
  get: () => matchRecord.value.autonShotsAttempted,
  set: (v) => {
    const newValue = Math.max(0, Math.floor(Number(v) || 0));
    matchRecord.value.autonShotsAttempted = newValue;
    // Ensure shots made doesn't exceed shots attempted
    if (matchRecord.value.autonShotsMade > newValue) {
      matchRecord.value.autonShotsMade = newValue;
    }
  },
});

const autonShotsMade = computed({
  get: () => matchRecord.value.autonShotsMade,
  set: (v) => {
    const newValue = Math.max(0, Math.floor(Number(v) || 0));
    // Cap shots made at shots attempted
    matchRecord.value.autonShotsMade = Math.min(newValue, matchRecord.value.autonShotsAttempted);
  },
});

function incAttempted() {
  autonShotsAttempted.value++;
}

function decAttempted() {
  autonShotsAttempted.value = Math.max(0, autonShotsAttempted.value - 1);
}

function incMade() {
  // Only increment if we haven't reached the attempted count
  if (autonShotsMade.value < autonShotsAttempted.value) {
    autonShotsMade.value++;
  }
}

function decMade() {
  autonShotsMade.value = Math.max(0, autonShotsMade.value - 1);
}
</script>

<template>
  <v-card class="mx-auto my-6" elevation="12" max-width="420" style="border-radius: 24px">
    <v-card-item>
      <v-card-title class="text-center font-weight-bold">Auton — Shot Tracking</v-card-title>
      <v-card-subtitle class="text-center">Track shots attempted and made</v-card-subtitle>
    </v-card-item>

    <v-card-text class="text-center">
      <div class="mb-6">
        <div class="text-subtitle-1 font-weight-bold mb-2">Shots Attempted</div>
        <div class="text-h2 font-weight-bold">{{ autonShotsAttempted }}</div>
        <div class="d-flex justify-center mt-4">
          <v-btn color="red" variant="outlined" class="mx-2" @click="decAttempted" :disabled="autonShotsAttempted <= 0">
            <v-icon class="mr-1">mdi-minus</v-icon>
            -1
          </v-btn>
          <v-btn color="primary" class="mx-2" @click="incAttempted">
            <v-icon class="mr-1">mdi-plus</v-icon>
            +1
          </v-btn>
        </div>
      </div>

      <v-divider class="my-4"></v-divider>

      <div class="mb-6">
        <div class="text-subtitle-1 font-weight-bold mb-2">Shots Made</div>
        <div class="text-h2 font-weight-bold">{{ autonShotsMade }}</div>
        <div class="d-flex justify-center mt-4">
          <v-btn color="red" variant="outlined" class="mx-2" @click="decMade" :disabled="autonShotsMade <= 0">
            <v-icon class="mr-1">mdi-minus</v-icon>
            -1
          </v-btn>
          <v-btn color="primary" class="mx-2" @click="incMade" :disabled="autonShotsMade >= autonShotsAttempted">
            <v-icon class="mr-1">mdi-plus</v-icon>
            +1
          </v-btn>
        </div>
      </div>

      <v-divider class="my-4"></v-divider>

      <div>
        <v-checkbox
          v-model="matchRecord.canClimbLevel1Auton"
          label="Can Climb Level 1 in Auton"
          color="primary"
          hide-details
        ></v-checkbox>
      </div>
    </v-card-text>
  </v-card>
</template>
