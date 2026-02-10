<script lang="ts" setup>
import { computed } from 'vue';
import { matchRecord } from './MatchRecords';

const teleopShotsMissed = computed({
  get: () => matchRecord.value.teleopShotsMissed,
  set: (v) => {
    const newValue = Math.max(0, Math.floor(Number(v) || 0));
    // Cap shots missed at shots attempted
    matchRecord.value.teleopShotsMissed = Math.min(newValue, matchRecord.value.teleopShotsAttempted);
  },
});

const teleopShotsAttempted = computed({
  get: () => matchRecord.value.teleopShotsAttempted,
  set: (v) => {
    const newValue = Math.max(0, Math.floor(Number(v) || 0));
    matchRecord.value.teleopShotsAttempted = newValue;
    // Ensure shots missed doesn't exceed shots attempted
    if (matchRecord.value.teleopShotsMissed > newValue) {
      matchRecord.value.teleopShotsMissed = newValue;
    }
  },
});

function incMissed() {
  // Only increment if we haven't reached the attempted count
  if (teleopShotsMissed.value < teleopShotsAttempted.value) {
    teleopShotsMissed.value++;
  }
}

function decMissed() {
  teleopShotsMissed.value = Math.max(0, teleopShotsMissed.value - 1);
}

function incAttempted() {
  teleopShotsAttempted.value++;
}

function decAttempted() {
  teleopShotsAttempted.value = Math.max(0, teleopShotsAttempted.value - 1);
}
</script>

<template>
  <v-card class="mx-auto my-6" elevation="12" max-width="420" style="border-radius: 24px">
    <v-card-item>
      <v-card-title class="text-center font-weight-bold">Teleop — Shot Tracking</v-card-title>
      <v-card-subtitle class="text-center">Track shots attempted and missed</v-card-subtitle>
    </v-card-item>

    <v-card-text class="text-center">
      <div class="mb-6">
        <div class="text-subtitle-1 font-weight-bold mb-2">Shots Attempted</div>
        <div class="d-flex justify-center align-center mt-4">
          <v-btn color="red" variant="outlined" class="mx-2" @click="decAttempted" :disabled="teleopShotsAttempted <= 0">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
          <v-text-field
            v-model.number="teleopShotsAttempted"
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

      <div>
        <div class="text-subtitle-1 font-weight-bold mb-2">Shots Missed</div>
        <div class="d-flex justify-center align-center mt-4">
          <v-btn color="red" variant="outlined" class="mx-2" @click="decMissed" :disabled="teleopShotsMissed <= 0">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
          <v-text-field
            v-model.number="teleopShotsMissed"
            type="number"
            variant="outlined"
            hide-details
            class="text-center"
            style="max-width: 120px;"
          />
          <v-btn color="primary" class="mx-2" @click="incMissed" :disabled="teleopShotsMissed >= teleopShotsAttempted">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
      </div>

      <v-divider class="my-4"></v-divider>

      <div>
        <v-checkbox
          v-model="matchRecord.neutralZoneFeedingTeleop"
          label="Neutral Zone Feeding"
          color="primary"
          hide-details
        ></v-checkbox>
      </div>
    </v-card-text>
  </v-card>
</template>
