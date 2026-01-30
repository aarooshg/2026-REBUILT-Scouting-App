<script lang="ts" setup>
import { computed } from 'vue';
import { matchRecord } from './MatchRecords';

const autonScore = computed({
  get: () => matchRecord.value.autonMainScore,
  set: (v) => {
    matchRecord.value.autonMainScore = Math.max(0, Math.floor(Number(v) || 0));
  },
});

function inc() {
  autonScore.value++;
}

function dec() {
  autonScore.value = Math.max(0, autonScore.value - 1);
}
</script>

<template>
  <v-card class="mx-auto my-6" elevation="12" max-width="420" style="border-radius: 24px">
    <v-card-item>
      <v-card-title class="text-center font-weight-bold">Auton — Main Area Scoring</v-card-title>
      <v-card-subtitle class="text-center">Tap + to record each scored game element</v-card-subtitle>
    </v-card-item>

    <v-card-text class="text-center">
      <div class="text-h2 font-weight-bold">{{ autonScore }}</div>
      <div class="d-flex justify-center mt-4">
        <v-btn color="red" variant="outlined" class="mx-2" @click="dec" :disabled="autonScore <= 0">
          <v-icon class="mr-1">mdi-minus</v-icon>
          -1
        </v-btn>
        <v-btn color="primary" class="mx-2" @click="inc">
          <v-icon class="mr-1">mdi-plus</v-icon>
          +1
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

