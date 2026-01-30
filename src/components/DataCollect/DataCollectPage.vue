<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useIntervalFn } from '@vueuse/core';
import DataCollectPrematch from './DataCollectPrematch.vue';
import DataCollectAuton from './DataCollectAuton.vue';
import DataCollectTeleop from './DataCollectTeleop.vue';
import DataCollectPostmatch from './DataCollectPostmatch.vue';
import { initMatchRecord, matchRecord, matchRecords } from './MatchRecords';
import type { MatchRecord } from '@/data';

type MatchPhase = 'prematch' | 'auton' | 'teleop' | 'postmatch';
const matchPhase = ref<MatchPhase>('prematch');

const matchStarted = ref(false);
const matchProgress = ref(0);
const elapsedTimeMs = ref(0);
const intervalMs = 50;
const totalMatchTimeMs = 150000; // 2:30

const { pause, resume, isActive } = useIntervalFn(
  () => {
    elapsedTimeMs.value += intervalMs;
    matchProgress.value = (elapsedTimeMs.value / totalMatchTimeMs) * 100;

    // advance from auton to teleop after 15 sec
    if (matchPhase.value === 'auton' && elapsedTimeMs.value > 15 * 1000) {
      matchPhase.value = 'teleop';
      pauseTimer();
      alert('Switching to teleop');
      unpauseTimer();
    }

    // advance from teleop to postmatch after 2.5 minutes
    if (matchPhase.value === 'teleop' && elapsedTimeMs.value >= totalMatchTimeMs) {
      matchPhase.value = 'postmatch';
      pauseTimer();
      alert('Match over, switching to post-match');
    }
  },
  intervalMs,
  { immediate: false },
);

/** tabs are disabled before match starts, to force prematch first */
const disableTabs = computed(() => !matchStarted.value);

function startMatch() {
  elapsedTimeMs.value = 0;
  matchStarted.value = true;
  matchPhase.value = 'auton';
  resume();
}

function pauseTimer() {
  pause();
}

function unpauseTimer() {
  resume();
}

function resetDataCollection() {
  elapsedTimeMs.value = 0;
  matchProgress.value = 0;
  matchStarted.value = false;
  matchPhase.value = 'prematch';
  pauseTimer();

  const preserved: Pick<MatchRecord, 'scouter'> = {
    scouter: matchRecord.value.scouter,
  };

  matchRecord.value = initMatchRecord();
  matchRecord.value = { ...matchRecord.value, ...preserved };
}

const formattedTime = computed(() => {
  const minutes = Math.floor(elapsedTimeMs.value / 60000);
  const seconds = Math.floor((elapsedTimeMs.value % 60000) / 1000);
  const milliseconds = Math.floor((elapsedTimeMs.value % 1000) / 10);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
});

function onSaveBtn() {
  matchRecords.value.push(matchRecord.value);
  alert('Match record saved! Resetting for next match...');
  resetDataCollection();
}
</script>

<template>
  <v-tabs v-model="matchPhase" bg-color="secondary" color="white" align-tabs="center">
    <v-tab value="prematch">Pre-match</v-tab>
    <v-tab value="auton" :disabled="disableTabs">Auton</v-tab>
    <v-tab value="teleop" :disabled="disableTabs">Teleop</v-tab>
    <v-tab value="postmatch" :disabled="disableTabs">Post-match</v-tab>
  </v-tabs>

  <div class="ma-2 pa-2">
    <div v-if="matchStarted" class="timer-container d-flex my-3">
      <v-progress-linear :model-value="matchProgress" height="32px" color="primary" bg-opacity=".5">
        <b style="color: white; position: absolute; left: 50%; transform: translateX(-50%)">
          {{ formattedTime }}
        </b>
      </v-progress-linear>
      <v-btn @click="isActive ? pauseTimer() : unpauseTimer()" color="grey" icon class="ml-1" size="x-small">
        <v-icon>{{ isActive ? 'mdi-pause' : 'mdi-play' }}</v-icon>
      </v-btn>
      <v-btn @click="resetDataCollection" color="red" size="x-small" class="ml-1" icon>
        <v-icon>mdi-restart</v-icon>
      </v-btn>
    </div>

    <v-btn v-if="matchStarted === false && matchPhase !== 'prematch'" @click="startMatch" color="accent" class="mt-4" block size="large">
      Start Match
    </v-btn>

    <v-tabs-window v-model="matchPhase">
      <v-tabs-window-item value="prematch">
        <DataCollectPrematch :disabled="matchStarted" :start-match="startMatch" />
      </v-tabs-window-item>

      <v-tabs-window-item value="auton">
        <DataCollectAuton />
      </v-tabs-window-item>

      <v-tabs-window-item value="teleop">
        <DataCollectTeleop />
      </v-tabs-window-item>

      <v-tabs-window-item value="postmatch">
        <DataCollectPostmatch @save="onSaveBtn" />
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>

