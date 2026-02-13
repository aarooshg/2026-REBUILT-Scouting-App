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
const matchEnded = ref(false);
const matchProgress = ref(0);
const elapsedTimeMs = ref(0);
const intervalMs = 50;
const autonTimeMs = 20 * 1000; // 0:20
const totalMatchTimeMs = 160000; // 2:40 (0:20 auton + 2:20 teleop)

const phasePromptOpen = ref(false);
const phasePromptText = ref('');
const phasePromptNextPhase = ref<Exclude<MatchPhase, 'prematch'> | null>(null);

// Track which phase transitions have been acknowledged to prevent re-prompting
const autonToTeleopAcknowledged = ref(false);
const teleopToPostmatchAcknowledged = ref(false);

const { pause, resume, isActive } = useIntervalFn(
  () => {
    if (matchEnded.value) return;

    elapsedTimeMs.value += intervalMs;
    if (elapsedTimeMs.value >= totalMatchTimeMs) {
      elapsedTimeMs.value = totalMatchTimeMs;
    }
    matchProgress.value = (elapsedTimeMs.value / totalMatchTimeMs) * 100;

    // advance from auton to teleop after 20 sec
    if (
      matchPhase.value === 'auton' &&
      elapsedTimeMs.value >= autonTimeMs &&
      phasePromptOpen.value === false &&
      !autonToTeleopAcknowledged.value
    ) {
      pauseTimer();
      phasePromptText.value = 'Auton over — switching to teleop';
      phasePromptNextPhase.value = 'teleop';
      phasePromptOpen.value = true;
    }

    // advance from teleop to postmatch after 2:40
    if (
      matchPhase.value === 'teleop' &&
      elapsedTimeMs.value >= totalMatchTimeMs &&
      phasePromptOpen.value === false &&
      !teleopToPostmatchAcknowledged.value
    ) {
      pauseTimer();
      matchEnded.value = true; // hard-stop timer at match end
      phasePromptText.value = 'Match over — switching to post-match';
      phasePromptNextPhase.value = 'postmatch';
      phasePromptOpen.value = true;
    }
  },
  intervalMs,
  { immediate: false },
);

/** tabs are disabled before match starts, to force prematch first */
const disableTabs = computed(() => !matchStarted.value);

/** Allow users to navigate freely between tabs once match has started */
const canNavigateToAuton = computed(() => matchStarted.value);
const canNavigateToTeleop = computed(() => matchStarted.value);
const canNavigateToPostmatch = computed(() => matchStarted.value);

function startMatch() {
  elapsedTimeMs.value = 0;
  matchStarted.value = true;
  matchEnded.value = false;
  matchPhase.value = 'auton';
  // Initialize auton shots attempted with preloaded game elements
  matchRecord.value.autonShotsAttempted = matchRecord.value.preloadedGameElements;
  resume();
}

function pauseTimer() {
  pause();
}

function unpauseTimer() {
  resume();
}

function onPhasePromptOk() {
  const next = phasePromptNextPhase.value;
  phasePromptOpen.value = false;
  phasePromptNextPhase.value = null;

  if (!next) return;

  // Mark this transition as acknowledged
  if (next === 'teleop') {
    autonToTeleopAcknowledged.value = true;
  } else if (next === 'postmatch') {
    teleopToPostmatchAcknowledged.value = true;
  }

  matchPhase.value = next;

  // match end: leave paused on postmatch (user can manually resume if they want)
  if (next === 'teleop') {
    unpauseTimer();
  }
}

function resetDataCollection() {
  elapsedTimeMs.value = 0;
  matchProgress.value = 0;
  matchStarted.value = false;
  matchEnded.value = false;
  matchPhase.value = 'prematch';
  pauseTimer();
  
  // Reset phase transition acknowledgments
  autonToTeleopAcknowledged.value = false;
  teleopToPostmatchAcknowledged.value = false;

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
  <v-dialog v-model="phasePromptOpen" persistent max-width="420">
    <v-card>
      <v-card-title class="text-center font-weight-bold">Time to switch phases</v-card-title>
      <v-card-text class="text-center">
        {{ phasePromptText }}
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn color="primary" variant="flat" @click="onPhasePromptOk">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-tabs v-model="matchPhase" bg-color="secondary" color="white" align-tabs="center">
    <v-tab value="prematch">Pre-match</v-tab>
    <v-tab value="auton" :disabled="!canNavigateToAuton">Auton</v-tab>
    <v-tab value="teleop" :disabled="!canNavigateToTeleop">Teleop</v-tab>
    <v-tab value="postmatch" :disabled="!canNavigateToPostmatch">Post-match</v-tab>
  </v-tabs>

  <div class="ma-2 pa-2">
    <div v-if="matchStarted" class="timer-container d-flex my-3">
      <v-progress-linear :model-value="matchProgress" height="32px" color="primary" bg-opacity=".5">
        <b style="color: white; position: absolute; left: 50%; transform: translateX(-50%)">
          {{ formattedTime }}
        </b>
      </v-progress-linear>
      <v-btn
        @click="isActive ? pauseTimer() : unpauseTimer()"
        :disabled="phasePromptOpen || matchEnded"
        color="grey"
        icon
        class="ml-1"
        size="x-small"
      >
        <v-icon>{{ isActive ? 'mdi-pause' : 'mdi-play' }}</v-icon>
      </v-btn>
      <v-btn
        @click="resetDataCollection"
        :disabled="phasePromptOpen"
        color="red"
        size="x-small"
        class="ml-1"
        icon
      >
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

