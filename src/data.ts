import { troyargonautsprotobuf } from './protobuf/match-record';

export type MatchRecord = {
  id: string;
  team: string;
  match: string;
  scouter: string;

  autonShotsAttempted: number;
  autonShotsMade: number;
  teleopShotsAttempted: number;
  teleopShotsMade: number;

  climbLevel: troyargonautsprotobuf.ClimbLevel;

  canGoOverBump: boolean;
  canGoUnderTrench: boolean;
  canClimbLevel1Auton: boolean;

  notes: string;
};

export type TeamProfile = {
  team: string;
  matchRecords: MatchRecord[];

  avgAutonShotsAttempted: number;
  avgAutonShotsMade: number;
  avgAutonAccuracy: number;
  avgTeleopShotsAttempted: number;
  avgTeleopShotsMade: number;
  avgTeleopAccuracy: number;
  avgTotalMainScore: number;

  canClimbLevel1: boolean;
  canClimbLevel2: boolean;
  canClimbLevel3: boolean;

  canGoOverBump: boolean;
  canGoUnderTrench: boolean;
  canClimbLevel1Auton: boolean;
};

export type TeamProfiles = {
  [teamId: string]: TeamProfile;
};

export function generateTeamProfile(records: MatchRecord[]): TeamProfile {
  let team = '';

  let canClimbLevel1 = false;
  let canClimbLevel2 = false;
  let canClimbLevel3 = false;

  let canGoOverBump = false;
  let canGoUnderTrench = false;
  let canClimbLevel1Auton = false;

  const sums = {
    autonShotsAttempted: 0,
    autonShotsMade: 0,
    teleopShotsAttempted: 0,
    teleopShotsMade: 0,
  };

  for (const record of records) {
    if (record.team) team = record.team;

    sums.autonShotsAttempted += record.autonShotsAttempted || 0;
    sums.autonShotsMade += record.autonShotsMade || 0;
    sums.teleopShotsAttempted += record.teleopShotsAttempted || 0;
    sums.teleopShotsMade += record.teleopShotsMade || 0;

    if (record.climbLevel === troyargonautsprotobuf.ClimbLevel.LEVEL_1) canClimbLevel1 = true;
    if (record.climbLevel === troyargonautsprotobuf.ClimbLevel.LEVEL_2) canClimbLevel2 = true;
    if (record.climbLevel === troyargonautsprotobuf.ClimbLevel.LEVEL_3) canClimbLevel3 = true;

    if (record.canGoOverBump) canGoOverBump = true;
    if (record.canGoUnderTrench) canGoUnderTrench = true;
    if (record.canClimbLevel1Auton) canClimbLevel1Auton = true;
  }

  const avgAutonShotsAttempted = records.length ? sums.autonShotsAttempted / records.length : 0;
  const avgAutonShotsMade = records.length ? sums.autonShotsMade / records.length : 0;
  const avgAutonAccuracy = sums.autonShotsAttempted > 0
    ? (sums.autonShotsMade / sums.autonShotsAttempted) * 100
    : 0;

  const avgTeleopShotsAttempted = records.length ? sums.teleopShotsAttempted / records.length : 0;
  const avgTeleopShotsMade = records.length ? sums.teleopShotsMade / records.length : 0;
  const avgTeleopAccuracy = sums.teleopShotsAttempted > 0
    ? (sums.teleopShotsMade / sums.teleopShotsAttempted) * 100
    : 0;

  const avgTotalMainScore = avgAutonShotsMade + avgTeleopShotsMade;

  return {
    team,
    matchRecords: records,
    avgAutonShotsAttempted,
    avgAutonShotsMade,
    avgAutonAccuracy,
    avgTeleopShotsAttempted,
    avgTeleopShotsMade,
    avgTeleopAccuracy,
    avgTotalMainScore,
    canClimbLevel1,
    canClimbLevel2,
    canClimbLevel3,
    canGoOverBump,
    canGoUnderTrench,
    canClimbLevel1Auton,
  };
}

export function csvify<DATA, HEADERS extends Partial<Record<keyof DATA, string>>>(
  data: DATA[],
  headers: HEADERS,
) {
  const csvTextRows: string[] = [];

  const headerRowString: string[] = [];
  for (const header in headers) {
    headerRowString.push(header);
  }
  csvTextRows.push(headerRowString.join(','));

  for (const datum of data) {
    const rowString: string[] = [];
    const looseDatum = datum as Record<string, unknown>;
    for (const header in headers) {
      if (headers[header]) {
        rowString.push(String(looseDatum[header]));
      }
    }
    csvTextRows.push(rowString.join(','));
  }

  return csvTextRows.join('\n');
}

