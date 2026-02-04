<script lang="ts" setup>
import { computed, watch } from 'vue';
import { matchRecord } from './MatchRecords';

const teleopShotsAttempted = computed({
  get: () => matchRecord.value.teleopShotsAttempted,
  set: (v) => {
    const newValue = Math.max(0, Math.floor(Number(v) || 0));
    matchRecord.value.teleopShotsAttempted = newValue;
    // Ensure shots made doesn't exceed shots attempted
    if (matchRecord.value.teleopShotsMade > newValue) {
      matchRecord.value.teleopShotsMade = newValue;
    }
  },
});

const teleopShotsMade = computed({
  get: () => matchRecord.value.teleopShotsMade,
  set: (v) => {
    const newValue = Math.max(0, Math.floor(Number(v) || 0));
    // Cap shots made at shots attempted
    matchRecord.value.teleopShotsMade = Math.min(newValue, matchRecord.value.teleopShotsAttempted);
  },
});

function incAttempted() {
  teleopShotsAttempted.value++;
}

function decAttempted() {
  teleopShotsAttempted.value = Math.max(0, teleopShotsAttempted.value - 1);
}

function incMade() {
  // Only increment if we haven't reached the attempted count
  if (teleopShotsMade.value < teleopShotsAttempted.value) {
    teleopShotsMade.value++;
  }
}

function decMade() {
  teleopShotsMade.value = Math.max(0, teleopShotsMade.value - 1);
}
</script>

<template>
  <v-card class="mx-auto my-6" elevation="12" max-width="420" style="border-radius: 24px">
    <v-card-item>
      <v-card-title class="text-center font-weight-bold">Teleop — Shot Tracking</v-card-title>
      <v-card-subtitle class="text-center">Track shots attempted and made</v-card-subtitle>
    </v-card-item>

    <v-card-text class="text-center">
      <div class="mb-6">
        <div class="text-subtitle-1 font-weight-bold mb-2">Shots Attempted</div>
        <div class="text-h2 font-weight-bold">{{ teleopShotsAttempted }}</div>
        <div class="d-flex justify-center mt-4">
          <v-btn color="red" variant="outlined" class="mx-2" @click="decAttempted" :disabled="teleopShotsAttempted <= 0">
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

      <div>
        <div class="text-subtitle-1 font-weight-bold mb-2">Shots Made</div>
        <div class="text-h2 font-weight-bold">{{ teleopShotsMade }}</div>
        <div class="d-flex justify-center mt-4">
          <v-btn color="red" variant="outlined" class="mx-2" @click="decMade" :disabled="teleopShotsMade <= 0">
            <v-icon class="mr-1">mdi-minus</v-icon>
            -1
          </v-btn>
          <v-btn color="primary" class="mx-2" @click="incMade" :disabled="teleopShotsMade >= teleopShotsAttempted">
            <v-icon class="mr-1">mdi-plus</v-icon>
            +1
          </v-btn>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
