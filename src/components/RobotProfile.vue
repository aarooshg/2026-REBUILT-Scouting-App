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

function activityLabel(activity: number | undefined) {
  if (activity === undefined) return '-';
  switch (activity) {
    case 0: return 'Scored';
    case 1: return 'Pickup';
    case 2: return 'Defense';
    case 3: return 'Fed';
    default: return '-';
  }
}

function pickupLocationLabel(location: number | undefined) {
  if (location === undefined) return '-';
  switch (location) {
    case 0: return 'Alliance Zone';
    case 1: return 'Outpost';
    case 2: return 'Neutral Zone';
    case 3: return 'Opponent Area';
    default: return '-';
  }
}

function getPhaseActivity(item: MatchRecord, phaseIndex: number): string {
  if (!item.teleopPhases || !item.teleopPhases[phaseIndex]) return '-';
  const phase = item.teleopPhases[phaseIndex];
  const activity = activityLabel(phase.activity);
  
  if (phase.activity === 0) {  // SCORED activity
    const attempted = phase.shotsAttempted || 0;
    const missed = phase.shotsMissed || 0;
    const made = attempted - missed;
    const accuracy = attempted > 0 ? roundToDecimal((made / attempted) * 100, 1) : 0;
    return `${activity} (${attempted}A/${made}M — ${accuracy}%)`;
  }
  
  if (phase.activity === 1 && phase.pickupLocation !== undefined) {
    return `${activity} (${pickupLocationLabel(phase.pickupLocation)})`;
  }
  
  return activity;
}

function preferredPathLabel(path: number | undefined): string {
  switch (path) {
    case 1: return 'Bump';
    case 2: return 'Trench';
    default: return 'None';
  }
}

function getMatchAccuracy(item: MatchRecord): string {
  const attempted = item.teleopShotsAttempted || 0;
  const missed = item.teleopShotsMissed || 0;
  if (attempted === 0) return 'N/A';
  const made = attempted - missed;
  const accuracy = roundToDecimal((made / attempted) * 100, 1);
  return `${accuracy}% (${made}/${attempted})`;
}

function autonPickupLocationLabel(location: number | undefined): string {
  if (location === undefined) return '';
  switch (location) {
    case 0: return 'Depot';
    case 1: return 'Outpost';
    case 2: return 'Neutral Zone';
    default: return '';
  }
}

function autonPickupOutcomeLabel(outcome: number | undefined): string {
  if (outcome === undefined) return '';
  switch (outcome) {
    case 0: return 'F';  // Failed
    case 1: return 'A';  // Attempted
    case 2: return 'S';  // Successful
    default: return '';
  }
}

function getAutonPickups(item: MatchRecord): string {
  if (!item.autonPickups || item.autonPickups.length === 0) return '-';
  
  return item.autonPickups
    .map(p => `${autonPickupLocationLabel(p.location)}: ${autonPickupOutcomeLabel(p.outcome)}`)
    .join(', ');
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
  // notes intentionally omitted here — added manually after phase columns
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
  avgPhase0ShotsAttempted: 'Avg T.Shift Attempted',
  avgPhase0ShotsMade: 'Avg T.Shift Made',
  avgPhase1ShotsAttempted: 'Avg S1 Attempted',
  avgPhase1ShotsMade: 'Avg S1 Made',
  avgPhase2ShotsAttempted: 'Avg S2 Attempted',
  avgPhase2ShotsMade: 'Avg S2 Made',
  avgPhase3ShotsAttempted: 'Avg S3 Attempted',
  avgPhase3ShotsMade: 'Avg S3 Made',
  avgPhase4ShotsAttempted: 'Avg S4 Attempted',
  avgPhase4ShotsMade: 'Avg S4 Made',
  avgPhase5ShotsAttempted: 'Avg EG Attempted',
  avgPhase5ShotsMade: 'Avg EG Made',
  canClimbLevel1: 'Can Climb L1',
  canClimbLevel2: 'Can Climb L2',
  canClimbLevel3: 'Can Climb L3',
  canGoOverBump: 'Can Over Bump',
  canGoUnderTrench: 'Can Under Trench',
  canClimbLevel1Auton: 'Can Auton L1 Climb',
  neutralZoneFeedingAuton: 'Auton NZ Feed',
  neutralZoneFeedingTeleop: 'Teleop NZ Feed',
  preferredPickupLocation: 'Preferred Pickup',
  mostCommonStartingPosition: 'Common Start Pos',
  mostCommonPath: 'Common Path',
};

type InnerColumnKey = keyof MatchRecord | 'delete' | 'phase0' | 'phase1' | 'phase2' | 'phase3' | 'phase4' | 'phase5' | 'autonPickups' | 'matchAccuracy';

const innerHeaders = [
  ...Object.entries(innerHeaderTitles)
    .filter(([key]) => key !== 'delete')
    .map(([key, title]) => ({
      value: key as InnerColumnKey,
      title,
      sortable: true,
    })),
  { value: 'autonPickups' as InnerColumnKey, title: 'Auton Pickups', sortable: false },
  { value: 'phase0' as InnerColumnKey, title: 'Transition Shift', sortable: false },
  { value: 'phase1' as InnerColumnKey, title: 'Shift 1', sortable: false },
  { value: 'phase2' as InnerColumnKey, title: 'Shift 2', sortable: false },
  { value: 'phase3' as InnerColumnKey, title: 'Shift 3', sortable: false },
  { value: 'phase4' as InnerColumnKey, title: 'Shift 4', sortable: false },
  { value: 'phase5' as InnerColumnKey, title: 'End Game', sortable: false },
  { value: 'matchAccuracy' as InnerColumnKey, title: 'Match Accuracy', sortable: false },
  { value: 'preferredPath' as InnerColumnKey, title: 'Preferred Path', sortable: false },
  { value: 'notes' as InnerColumnKey, title: 'Notes', sortable: true },
  { value: 'delete' as InnerColumnKey, title: 'Delete', sortable: false },
];


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
              <td @dblclick="header.value !== 'delete' && !header.value.startsWith('phase') && header.value !== 'autonPickups' && header.value !== 'matchAccuracy' && header.value !== 'preferredPath' ? editMatchRecord(item, header.value as keyof MatchRecord) : undefined">
                <span v-if="header.value === 'climbLevel'">{{ climbLabel(item.climbLevel) }}</span>
                <span v-else-if="header.value === 'autonPickups'">{{ getAutonPickups(item) }}</span>
                <span v-else-if="header.value === 'phase0'">{{ getPhaseActivity(item, 0) }}</span>
                <span v-else-if="header.value === 'phase1'">{{ getPhaseActivity(item, 1) }}</span>
                <span v-else-if="header.value === 'phase2'">{{ getPhaseActivity(item, 2) }}</span>
                <span v-else-if="header.value === 'phase3'">{{ getPhaseActivity(item, 3) }}</span>
                <span v-else-if="header.value === 'phase4'">{{ getPhaseActivity(item, 4) }}</span>
                <span v-else-if="header.value === 'phase5'">{{ getPhaseActivity(item, 5) }}</span>
                <span v-else-if="header.value === 'matchAccuracy'">{{ getMatchAccuracy(item) }}</span>
                <span v-else-if="header.value === 'preferredPath'">{{ preferredPathLabel(item.preferredPath) }}</span>
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

