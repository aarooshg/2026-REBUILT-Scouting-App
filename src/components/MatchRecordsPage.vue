<script setup lang="ts">
import { computed, ref } from 'vue';
import { matchRecords } from '@/components/DataCollect/MatchRecords';
import type { MatchRecord } from '@/data';
import { troyargonautsprotobuf } from '@/protobuf/match-record';

const search = ref('');

function climbLabel(level: number) {
  switch (level) {
    case troyargonautsprotobuf.ClimbLevel.LEVEL_1:
      return 'Level 1';
    case troyargonautsprotobuf.ClimbLevel.LEVEL_2:
      return 'Level 2';
    case troyargonautsprotobuf.ClimbLevel.LEVEL_3:
      return 'Level 3';
    default:
      return 'None';
  }
}

const items = computed(() => {
  // show most recent match numbers last by default-ish; Vuetify user can sort anyway
  return [...matchRecords.value].sort((a, b) => {
    const aMatch = Number(a.match) || 0;
    const bMatch = Number(b.match) || 0;
    if (aMatch !== bMatch) return aMatch - bMatch;
    return (Number(a.team) || 0) - (Number(b.team) || 0);
  });
});

const headers = [
  { title: 'Team', value: 'team', sortable: true },
  { title: 'Match', value: 'match', sortable: true },
  { title: 'Scouter', value: 'scouter', sortable: true },
  { title: 'Auton Main', value: 'autonMainScore', sortable: true },
  { title: 'Teleop Main', value: 'teleopMainScore', sortable: true },
  { title: 'Climb', value: 'climbLevel', sortable: true },
  { title: 'Over Bump', value: 'canGoOverBump', sortable: true },
  { title: 'Under Trench', value: 'canGoUnderTrench', sortable: true },
  { title: 'Notes', value: 'notes', sortable: false },
  { title: 'Delete', value: 'delete', sortable: false },
] as const;

function deleteRecordById(id: string) {
  const idx = matchRecords.value.findIndex((mr) => mr.id === id);
  if (idx < 0) return;

  const mr = matchRecords.value[idx];
  const ok = confirm(`Delete match record? (Team ${mr.team}, Match ${mr.match})`);
  if (!ok) return;

  matchRecords.value.splice(idx, 1);
}
</script>

<template>
  <div class="ma-2 pa-2">
    <div class="d-flex">
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="solo"
        hide-details
        single-line
        tile
        class="ma-0 flex-grow-1"
      />
    </div>

    <v-data-table :items="items" :headers="headers" :search="search" class="datatable">
      <template v-slot:[`item.climbLevel`]="{ item }">
        <span>{{ climbLabel((item as MatchRecord).climbLevel) }}</span>
      </template>

      <template v-slot:[`item.delete`]="{ item }">
        <v-btn
          icon="mdi-delete"
          variant="plain"
          color="red"
          @click="deleteRecordById((item as MatchRecord).id)"
        />
      </template>
    </v-data-table>
  </div>
</template>

<style scoped>
:deep(.datatable tr:hover) {
  background-color: rgba(255, 255, 255, 0.09);
}
</style>

