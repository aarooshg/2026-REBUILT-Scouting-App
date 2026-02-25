<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
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

// Check if any phase has "Scored" activity selected
const hasAnyShootingPhase = computed(() => {
  return matchRecord.value.teleopPhases?.some(phase => phase?.activity === 0) || false;
});

// Per-phase shot tracking functions
function incPhaseMissed(phaseIndex: number) {
  const phase = matchRecord.value.teleopPhases![phaseIndex];
  if (phase.shotsMissed! < phase.shotsAttempted!) {
    phase.shotsMissed!++;
  }
}

function decPhaseMissed(phaseIndex: number) {
  const phase = matchRecord.value.teleopPhases![phaseIndex];
  phase.shotsMissed = Math.max(0, (phase.shotsMissed || 0) - 1);
}

function incPhaseAttempted(phaseIndex: number) {
  const phase = matchRecord.value.teleopPhases![phaseIndex];
  phase.shotsAttempted = (phase.shotsAttempted || 0) + 1;
}

function decPhaseAttempted(phaseIndex: number) {
  const phase = matchRecord.value.teleopPhases![phaseIndex];
  const newValue = Math.max(0, (phase.shotsAttempted || 0) - 1);
  phase.shotsAttempted = newValue;
  // Ensure shots missed doesn't exceed shots attempted
  if ((phase.shotsMissed || 0) > newValue) {
    phase.shotsMissed = newValue;
  }
}

// Watch for changes in phase shot tracking and update global totals
watch(() => matchRecord.value.teleopPhases, (phases) => {
  if (!phases) return;
  
  let totalMissed = 0;
  let totalAttempted = 0;
  
  for (const phase of phases) {
    if (phase?.activity === 0) {  // SCORED activity
      totalMissed += phase.shotsMissed || 0;
      totalAttempted += phase.shotsAttempted || 0;
    }
  }
  
  matchRecord.value.teleopShotsMissed = totalMissed;
  matchRecord.value.teleopShotsAttempted = totalAttempted;
}, { deep: true });
const phases = [
  { value: 0, text: 'Transition Shift' },
  { value: 1, text: 'Shift 1' },
  { value: 2, text: 'Shift 2' },
  { value: 3, text: 'Shift 3' },
  { value: 4, text: 'Shift 4' },
  { value: 5, text: 'End Game' },
];

const activities = [
  { value: 0, text: 'Scored' },
  { value: 1, text: 'Pickup' },
  { value: 2, text: 'Defense' },
  { value: 3, text: 'Fed' },
];

const pickupLocations = [
  { value: 0, text: 'Alliance Zone' },
  { value: 1, text: 'Outpost' },
  { value: 2, text: 'Neutral Zone' },
  { value: 3, text: 'Opponent Area' },
];

// Initialize teleopPhases array if it doesn't exist
if (!matchRecord.value.teleopPhases) {
  matchRecord.value.teleopPhases = [];
}

// Ensure we have records for all 6 phases
watch(() => matchRecord.value.teleopPhases, () => {
  if (!matchRecord.value.teleopPhases) {
    matchRecord.value.teleopPhases = [];
  }
  // Initialize missing phases
  for (let i = 0; i < 6; i++) {
    if (!matchRecord.value.teleopPhases[i]) {
      matchRecord.value.teleopPhases[i] = {
        phase: i,
        activity: undefined,
        pickupLocation: undefined,
        shotsMissed: 0,
        shotsAttempted: 0,
      };
    }
  }
}, { immediate: true, deep: true });

// Watch for feeding activity in any phase and update neutralZoneFeedingTeleop
watch(() => matchRecord.value.teleopPhases, (phases) => {
  if (!phases) return;
  
  // Check if any phase has Fed activity (value 3)
  const hasFeedingActivity = phases.some(phase => phase?.activity === 3);
  
  // Update the neutralZoneFeedingTeleop flag
  matchRecord.value.neutralZoneFeedingTeleop = hasFeedingActivity;
}, { deep: true });

</script>

<template>
  <v-card class="mx-auto my-6" elevation="12" max-width="420" style="border-radius: 24px">
    <v-card-item>
      <v-card-title class="text-center font-weight-bold">Teleop — Phase Tracking</v-card-title>
      <v-card-subtitle class="text-center">Track activity and shots per phase</v-card-subtitle>
    </v-card-item>

    <v-card-text class="text-center">
      <!-- Phase Activity Tracking -->
      <div class="text-subtitle-1 font-weight-bold mb-4">Phase Activity Tracking</div>
      
      <div v-for="(phase, index) in phases" :key="phase.value" class="mb-4">
        <div class="text-body-2 font-weight-medium mb-2">{{ phase.text }}</div>
        
        <v-select
          v-model="matchRecord.teleopPhases![index].activity"
          :items="activities"
          item-title="text"
          item-value="value"
          label="Activity"
          variant="outlined"
          density="compact"
          hide-details="auto"
          clearable
        ></v-select>

        <!-- Conditional Pickup Location -->
        <v-select
          v-if="matchRecord.teleopPhases![index].activity === 1"
          v-model="matchRecord.teleopPhases![index].pickupLocation"
          :items="pickupLocations"
          item-title="text"
          item-value="value"
          label="Pickup Location"
          variant="outlined"
          density="compact"
          hide-details="auto"
          class="mt-2"
          clearable
        ></v-select>

        <!-- Conditional Shot Tracking for Scored Activity -->
        <div v-if="matchRecord.teleopPhases![index].activity === 0" class="mt-3">
          <v-divider class="my-3"></v-divider>
          
          <!-- Shots Attempted for this Phase -->
          <div class="mb-3">
            <div class="text-caption font-weight-medium mb-2">Shots Attempted</div>
            <div class="d-flex justify-center align-center">
              <v-btn 
                color="red" 
                variant="outlined" 
                size="small" 
                class="mx-1" 
                @click="decPhaseAttempted(index)" 
                :disabled="(matchRecord.teleopPhases![index].shotsAttempted || 0) <= 0"
              >
                <v-icon>mdi-minus</v-icon>
              </v-btn>
              <v-text-field
                v-model.number="matchRecord.teleopPhases![index].shotsAttempted"
                type="number"
                variant="outlined"
                hide-details
                density="compact"
                class="text-center"
                style="max-width: 80px;"
              />
              <v-btn 
                color="primary" 
                size="small" 
                class="mx-1" 
                @click="incPhaseAttempted(index)"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>
          </div>

          <!-- Shots Missed for this Phase -->
          <div>
            <div class="text-caption font-weight-medium mb-2">Shots Missed</div>
            <div class="d-flex justify-center align-center">
              <v-btn 
                color="red" 
                variant="outlined" 
                size="small" 
                class="mx-1" 
                @click="decPhaseMissed(index)" 
                :disabled="(matchRecord.teleopPhases![index].shotsMissed || 0) <= 0"
              >
                <v-icon>mdi-minus</v-icon>
              </v-btn>
              <v-text-field
                v-model.number="matchRecord.teleopPhases![index].shotsMissed"
                type="number"
                variant="outlined"
                hide-details
                density="compact"
                class="text-center"
                style="max-width: 80px;"
              />
              <v-btn 
                color="primary" 
                size="small" 
                class="mx-1" 
                @click="incPhaseMissed(index)" 
                :disabled="(matchRecord.teleopPhases![index].shotsMissed || 0) >= (matchRecord.teleopPhases![index].shotsAttempted || 0)"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>
          </div>

          <!-- Show scored count for this phase -->
          <div class="text-caption mt-2 text-grey">
            Scored: {{ (matchRecord.teleopPhases![index].shotsAttempted || 0) - (matchRecord.teleopPhases![index].shotsMissed || 0) }}
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
