<script setup lang="ts">
import { computed, ref } from 'vue';
import { csvify, generateTeamProfile, type MatchRecord, type TeamProfile } from '@/data';
import { matchRecords, sortedMatchRecords } from '@/components/DataCollect/MatchRecords';
import { troyargonautsprotobuf } from '@/protobuf/match-record';

const search = ref('');

function roundToDecimal(x: number, decimals: number) {
  const multiplier = Math.pow(10, decimals);
  return Math.round(x * multiplier) / multiplier;
}

const items = computed(() => {
  const allItems = Object.values(sortedMatchRecords.value).map((teamMatchRecords) => {
    const teamProfile = generateTeamProfile(teamMatchRecords);

    for (const [key, value] of Object.entries(teamProfile)) {
      if (typeof value === 'number') {
        (teamProfile as unknown as Record<string, number>)[key] = roundToDecimal(value, 5);
      }
    }

    for (const matchRecord of teamProfile.matchRecords) {
      for (const [key, value] of Object.entries(matchRecord)) {
        if (typeof value === 'number') {
          (matchRecord as unknown as Record<string, number>)[key] = roundToDecimal(value, 5);
        }
      }
    }

    return teamProfile;
  });

  // Filter by selected team if one is selected
  if (selectedTeam.value) {
    return allItems.filter(item => item.team === selectedTeam.value);
  }

  return allItems;
});

const selectedTeam = ref<string | null>(null);

function selectTeam(team: string) {
  selectedTeam.value = team;
  // Auto-expand the selected team - use team string as the ID
  expanded.value = [team];
}

function clearTeamFilter() {
  selectedTeam.value = null;
  expanded.value = [];
}

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

const innerHeaderTitles: Partial<Record<keyof MatchRecord | 'delete', string>> = {
  team: 'Team',
  match: 'Match',
  scouter: 'Scouter',
  autonShotsMissed: 'Auton Missed',
  autonShotsAttempted: 'Auton Attempted',
  teleopShotsMissed: 'Teleop Missed',
  teleopShotsAttempted: 'Teleop Attempted',
  climbLevel: 'Climb',
  canGoOverBump: 'Over Bump',
  canGoUnderTrench: 'Under Trench',
  canClimbLevel1Auton: 'Auton L1 Climb',
  neutralZoneFeedingAuton: 'Auton NZ Feed',
  neutralZoneFeedingTeleop: 'Teleop NZ Feed',
  notes: 'Notes',
  delete: 'Delete',
};

const headerTitles: Partial<Record<keyof TeamProfile, string>> = {
  team: 'Team',
  avgAutonShotsMissed: 'Avg Auton Missed',
  avgAutonShotsAttempted: 'Avg Auton Attempted',
  avgAutonAccuracy: 'Avg Auton Accuracy %',
  avgTeleopShotsMissed: 'Avg Teleop Missed',
  avgTeleopShotsAttempted: 'Avg Teleop Attempted',
  avgTeleopAccuracy: 'Avg Teleop Accuracy %',
  avgTotalMainScore: 'Avg Total Made',
  canClimbLevel1: 'Can Climb L1',
  canClimbLevel2: 'Can Climb L2',
  canClimbLevel3: 'Can Climb L3',
  canGoOverBump: 'Can Over Bump',
  canGoUnderTrench: 'Can Under Trench',
  canClimbLevel1Auton: 'Can Auton L1 Climb',
  neutralZoneFeedingAuton: 'Auton NZ Feed',
  neutralZoneFeedingTeleop: 'Teleop NZ Feed',
};

type InnerColumnKey = keyof MatchRecord | 'delete';

const innerHeaders = Object.entries(innerHeaderTitles).map(([key, title]) => ({
  value: key as InnerColumnKey,
  title,
  sortable: key !== 'delete',
}));

const innerHeadersNonDelete = computed(() => innerHeaders.filter((h) => h.value !== 'delete'));

const headers = Object.entries(headerTitles).map(([key, title]) => ({
  value: key as keyof TeamProfile,
  title,
  sortable: true as const,
}));


const expanded = ref<readonly string[]>([]);

function onDownloadCSV() {
  const text = csvify(items.value, headerTitles);
  const filename = `ArgoData-${Date.now()}.csv`;
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function deleteItem(itemId: string) {
  const itemIndex = matchRecords.value.findIndex((mr) => mr.id === itemId);
  if (itemIndex >= 0 && confirm('Are you sure you want to delete this match record?')) {
    matchRecords.value.splice(itemIndex, 1);
  }
}

const containsDuplicates = computed(() => {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const mr of matchRecords.value) {
    const x = `${mr.team} - #${mr.match}`;
    if (seen.has(x)) duplicates.add(x);
    else seen.add(x);
  }
  if (duplicates.size > 0) {
    return `Duplicate match records found: ${Array.from(duplicates).join(', ')}. Please delete them to avoid aggregation issues.`;
  }
  return null;
});

function editMatchRecord(item: MatchRecord, header: keyof MatchRecord) {
  const existingRecord = matchRecords.value.find((r) => r.id === item.id);
  if (!existingRecord) {
    alert('Something went wrong, match record not found.');
    return;
  }

  const oldValue = existingRecord[header];
  const newValueAsString = prompt(
    `Edit ${header} for ${item.team} - ${item.match} (${item.scouter})`,
    String(oldValue),
  );
  if (newValueAsString === '' || newValueAsString === null) return;

  let newValue: string | number | boolean = newValueAsString;
  if (typeof oldValue === 'boolean') {
    newValue = newValueAsString.toLowerCase() === 'true';
  } else if (typeof oldValue === 'number') {
    newValue = Number(newValueAsString);
    if (isNaN(newValue)) {
      alert('Invalid input. Please enter a valid number.');
      return;
    }
  } else {
    newValue = newValueAsString.trim();
  }

  (existingRecord as Record<string, unknown>)[header] = newValue;
}
</script>

<template>
  <v-alert v-if="containsDuplicates" :text="containsDuplicates" type="error" />

  <v-alert v-if="selectedTeam" type="info" closable @click:close="clearTeamFilter">
    Showing only team {{ selectedTeam }}. Click X to show all teams.
  </v-alert>

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
    <v-btn v-if="selectedTeam" size="x-large" color="warning" @click="clearTeamFilter" class="mx-2">
      <v-icon>mdi-filter-off</v-icon>
    </v-btn>
    <v-btn size="x-large" color="success" @click="onDownloadCSV">
      <v-icon>mdi-content-save</v-icon>
    </v-btn>
  </div>

  <v-data-table
    :items="items"
    show-expand
    :headers="headers"
    :search="search"
    expand-on-click
    v-model:expanded="expanded"
    class="datatable"
  >
    <template v-slot:[`item.data-table-expand`]="{ internalItem, isExpanded, toggleExpand }">
      <td>
        <v-btn
          :icon="isExpanded(internalItem) ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          size="small"
          variant="plain"
          @click="toggleExpand(internalItem)"
        />
      </td>
    </template>

    <template v-slot:[`item.team`]="{ item }">
      <td @click="selectTeam(item.team)" style="cursor: pointer; text-decoration: underline;">
        {{ item.team }}
      </td>
    </template>

    <template v-slot:expanded-row="{ columns, item }">
      <tr>
        <td :colspan="columns.length" style="background-color: #222">
          <v-data-table
            style="background-color: #222"
            class="datatable"
            :items="item.matchRecords"
            :headers="innerHeaders"
          >
            <template v-slot:[`item.delete`]="{ item: mrItem }">
              <v-btn icon="mdi-delete" variant="plain" color="red" @click="deleteItem(mrItem.id)" />
            </template>

            <template
              v-for="header in innerHeadersNonDelete"
              :key="header.value"
              v-slot:[`item.${header.value}`]="{ item }"
            >
              <td @dblclick="header.value !== 'delete' ? editMatchRecord(item, header.value as keyof MatchRecord) : undefined">
                <span v-if="header.value === 'climbLevel'">{{ climbLabel(item.climbLevel) }}</span>
                <span v-else-if="header.value !== 'delete'">{{ item[header.value as keyof MatchRecord] }}</span>
              </td>
            </template>
          </v-data-table>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<style lang="css" scoped>
:deep(.datatable tr:hover) {
  background-color: rgba(255, 255, 255, 0.09);
}
</style>

