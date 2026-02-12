<script lang="ts" setup>
import { computed } from 'vue';
import { matchRecord } from './MatchRecords';
import fieldDiagram from '../../assets/images/field-diagram.png';

const props = defineProps<{
  disabled: boolean;
  startMatch: () => void;
}>();

const prematchFormValid = computed(() => {
  const matchOk = !!matchRecord.value.match && Number(matchRecord.value.match) > 0;
  const teamOk = !!matchRecord.value.team && Number(matchRecord.value.team) > 0;
  const scouterOk = !!matchRecord.value.scouter && matchRecord.value.scouter.trim().length > 0;
  const allianceOk = matchRecord.value.alliance !== undefined;
  const startingPositionOk = matchRecord.value.startingPosition !== undefined;
  return matchOk && teamOk && scouterOk && allianceOk && startingPositionOk;
});

const allianceOptions: {
  text: string;
  color: string;
  value: number;
}[] = [
  { text: 'R1', color: 'red', value: 0 },
  { text: 'R2', color: 'red', value: 1 },
  { text: 'R3', color: 'red', value: 2 },
  { text: 'B1', color: 'blue', value: 3 },
  { text: 'B2', color: 'blue', value: 4 },
  { text: 'B3', color: 'blue', value: 5 },
];

const startingPositionOptions: {
  text: string;
  value: number;
}[] = [
  { text: 'P1', value: 0 },
  { text: 'P2', value: 1 },
  { text: 'P3', value: 2 },
  { text: 'P4', value: 3 },
  { text: 'P5', value: 4 },
];


</script>

<template>
  <div>
    <v-text-field
      label="Match Number"
      type="number"
      variant="outlined"
      class="mt-2"
      v-model="matchRecord.match"
      :rules="[(value) => (value && parseInt(value, 10) > 0) || 'Match number must be a positive number']"
      :disabled="disabled"
    />

    <v-text-field
      label="Team Number"
      type="number"
      variant="outlined"
      class="mt-2"
      v-model="matchRecord.team"
      :rules="[(value) => (value && parseInt(value, 10) > 0) || 'Team number must be a positive number']"
      :disabled="disabled"
    />

    <v-text-field
      label="Scouter Name"
      type="text"
      variant="outlined"
      class="mt-2"
      v-model="matchRecord.scouter"
      :rules="[(value) => (value && value.trim() !== '') || 'Please enter your name']"
      :disabled="disabled"
    />

    <v-text-field
      label="Preloaded Game Elements"
      type="number"
      variant="outlined"
      class="mt-2"
      v-model.number="matchRecord.preloadedGameElements"
      :rules="[(value) => (value >= 0) || 'Must be 0 or greater']"
      :disabled="disabled"
      hint="Number of game pieces loaded at start"
    />

    <!-- Alliance Selection -->
    <div class="mt-6">
      <h3 class="text-h6 text-center mb-2">Alliance Selection</h3>
      <div class="d-flex">
        <v-btn-toggle
          v-model="matchRecord.alliance"
          rounded
          variant="outlined"
          divided
          class="mx-auto"
          :disabled="disabled"
          mandatory
        >
          <v-btn
            v-for="(option, idx) in allianceOptions"
            :key="idx"
            :value="option.value"
            :color="option.color"
          >
            {{ option.text }}
          </v-btn>
        </v-btn-toggle>
      </div>
    </div>

    <!-- Starting Position Selection -->
    <div class="mt-6">
      <h3 class="text-h6 text-center mb-2">Starting Position</h3>
      <div class="d-flex">
        <v-btn-toggle
          v-model="matchRecord.startingPosition"
          rounded
          variant="outlined"
          divided
          class="mx-auto"
          :disabled="disabled"
          mandatory
        >
          <v-btn
            v-for="(option, idx) in startingPositionOptions"
            :key="idx"
            :value="option.value"
          >
            {{ option.text }}
          </v-btn>
        </v-btn-toggle>
      </div>
    </div>

    <!-- Field Diagram -->
    <div class="d-flex justify-center mt-6 mb-2">
      <img :src="fieldDiagram" alt="Field Diagram" style="max-width: 70%; height: auto; border-radius: 8px;" />
    </div>

    <v-btn
      :disabled="disabled || !prematchFormValid"
      color="accent"
      class="mt-4"
      block
      size="large"
      @click="props.startMatch()"
    >
      Start Match
    </v-btn>
  </div>
</template>

