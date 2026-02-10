import { troyargonautsprotobuf } from './protobuf/match-record';

export type MatchRecord = {
  id: string;
  team: string;
  match: string;
  scouter: string;

  preloadedGameElements: number;

  autonShotsMissed: number;
  autonShotsAttempted: number;
  teleopShotsMissed: number;
  teleopShotsAttempted: number;

  climbLevel: troyargonautsprotobuf.ClimbLevel;

  canGoOverBump: boolean;
  canGoUnderTrench: boolean;
  canClimbLevel1Auton: boolean;
  neutralZoneFeedingAuton: boolean;
  neutralZoneFeedingTeleop: boolean;

  notes: string;
};

export type TeamProfile = {
  team: string;
  matchRecords: MatchRecord[];

  avgAutonShotsMissed: number;
  avgAutonShotsAttempted: number;
  avgAutonAccuracy: number;
  avgTeleopShotsMissed: number;
  avgTeleopShotsAttempted: number;
  avgTeleopAccuracy: number;
  avgTotalMainScore: number;

  canClimbLevel1: boolean;
  canClimbLevel2: boolean;
  canClimbLevel3: boolean;

  canGoOverBump: boolean;
  canGoUnderTrench: boolean;
  canClimbLevel1Auton: boolean;
  neutralZoneFeedingAuton: boolean;
  neutralZoneFeedingTeleop: boolean;
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
  let neutralZoneFeedingAuton = false;
  let neutralZoneFeedingTeleop = false;

  const sums = {
    autonShotsMissed: 0,
    autonShotsAttempted: 0,
    teleopShotsMissed: 0,
    teleopShotsAttempted: 0,
  };

  for (const record of records) {
    if (record.team) team = record.team;

    sums.autonShotsMissed += record.autonShotsMissed || 0;
    sums.autonShotsAttempted += record.autonShotsAttempted || 0;
    sums.teleopShotsMissed += record.teleopShotsMissed || 0;
    sums.teleopShotsAttempted += record.teleopShotsAttempted || 0;

    if (record.climbLevel === troyargonautsprotobuf.ClimbLevel.LEVEL_1) canClimbLevel1 = true;
    if (record.climbLevel === troyargonautsprotobuf.ClimbLevel.LEVEL_2) canClimbLevel2 = true;
    if (record.climbLevel === troyargonautsprotobuf.ClimbLevel.LEVEL_3) canClimbLevel3 = true;

    if (record.canGoOverBump) canGoOverBump = true;
    if (record.canGoUnderTrench) canGoUnderTrench = true;
    if (record.canClimbLevel1Auton) canClimbLevel1Auton = true;
    if (record.neutralZoneFeedingAuton) neutralZoneFeedingAuton = true;
    if (record.neutralZoneFeedingTeleop) neutralZoneFeedingTeleop = true;
  }

  const avgAutonShotsMissed = records.length ? sums.autonShotsMissed / records.length : 0;
  const avgAutonShotsAttempted = records.length ? sums.autonShotsAttempted / records.length : 0;
  const avgAutonAccuracy = sums.autonShotsAttempted > 0
    ? (1 - (sums.autonShotsMissed / sums.autonShotsAttempted)) * 100
    : 0;

  const avgTeleopShotsMissed = records.length ? sums.teleopShotsMissed / records.length : 0;
  const avgTeleopShotsAttempted = records.length ? sums.teleopShotsAttempted / records.length : 0;
  const avgTeleopAccuracy = sums.teleopShotsAttempted > 0
    ? (1 - (sums.teleopShotsMissed / sums.teleopShotsAttempted)) * 100
    : 0;

  const avgTotalMainScore = (sums.autonShotsAttempted - sums.autonShotsMissed) + (sums.teleopShotsAttempted - sums.teleopShotsMissed);

  return {
    team,
    matchRecords: records,
    avgAutonShotsMissed,
    avgAutonShotsAttempted,
    avgAutonAccuracy,
    avgTeleopShotsMissed,
    avgTeleopShotsAttempted,
    avgTeleopAccuracy,
    avgTotalMainScore,
    canClimbLevel1,
    canClimbLevel2,
    canClimbLevel3,
    canGoOverBump,
    canGoUnderTrench,
    canClimbLevel1Auton,
    neutralZoneFeedingAuton,
    neutralZoneFeedingTeleop,
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

