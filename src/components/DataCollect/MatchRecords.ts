import type { MatchRecord } from '@/data';
import { troyargonautsprotobuf } from '@/protobuf/match-record';
import { useLocalStorage } from '@vueuse/core';
import { computed, ref } from 'vue';

/** use this on app start and after a match record is finished, so we can start a new one */
export function initMatchRecord(): MatchRecord {
  return {
    id: Array.from(crypto.getRandomValues(new Uint8Array(8)))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join(''),

    team: '',
    match: '',
    scouter: '',

    preloadedGameElements: 0,

    autonShotsMissed: 0,
    autonShotsAttempted: 0,
    teleopShotsMissed: 0,
    teleopShotsAttempted: 0,

    climbLevel: troyargonautsprotobuf.ClimbLevel.CLIMB_NONE,

    canGoOverBump: false,
    canGoUnderTrench: false,
    canClimbLevel1Auton: false,
    neutralZoneFeedingAuton: false,
    neutralZoneFeedingTeleop: false,

    notes: '',
  };
}

export const matchRecord = ref<MatchRecord>(initMatchRecord());

export const matchRecords = useLocalStorage<MatchRecord[]>('scoutingMatchRecords2026', []);

export const sortedMatchRecords = computed(() => {
  const sortedMatchRecordsValue: {
    [teamId: string]: MatchRecord[];
  } = {};

  for (const mr of matchRecords.value) {
    const teamId = mr.team || '(unknown)';
    let matchRecordsForTeam = sortedMatchRecordsValue[teamId];
    if (!matchRecordsForTeam) {
      matchRecordsForTeam = [];
      sortedMatchRecordsValue[teamId] = matchRecordsForTeam;
    }
    matchRecordsForTeam.push(mr);
  }

  return sortedMatchRecordsValue;
});

