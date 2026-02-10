<script lang="ts" setup>
import { computed } from 'vue';
import { matchRecord } from './MatchRecords';

const props = defineProps<{
  disabled: boolean;
  startMatch: () => void;
}>();

const prematchFormValid = computed(() => {
  const matchOk = !!matchRecord.value.match && Number(matchRecord.value.match) > 0;
  const teamOk = !!matchRecord.value.team && Number(matchRecord.value.team) > 0;
  const scouterOk = !!matchRecord.value.scouter && matchRecord.value.scouter.trim().length > 0;
  return matchOk && teamOk && scouterOk;
});
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

