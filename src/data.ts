import { troyargonautsprotobuf } from './protobuf/match-record';

export type MatchRecord = {
  id: string;
  team: string;
  match: string;
  scouter: string;
  alliance?: number;
  startingPosition?: number;

  preloadedGameElements: number;
  robotMovedInAuton?: boolean;
  autonPickups?: Array<{
    location?: number;
    outcome?: number;
  }>;

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

  teleopPhases?: Array<{
    phase?: number;
    activity?: number;
    pickupLocation?: number;
  }>;

  notes: string;
  preferredPath?: number;
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

  preferredPickupLocation: string;
  mostCommonStartingPosition: string;
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

    // Check teleop phases for feeding activity (activity value 3 = FED)
    if (record.teleopPhases && record.teleopPhases.length > 0) {
      for (const phase of record.teleopPhases) {
        if (phase.activity === 3) {  // PhaseActivity.FED = 3
          neutralZoneFeedingTeleop = true;
          break;
        }
      }
    }
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

  // Calculate preferred pickup location from teleop phases
  const pickupLocationCounts: { [key: number]: number } = {};
  for (const record of records) {
    if (record.teleopPhases) {
      for (const phase of record.teleopPhases) {
        if (phase.activity === 1 && phase.pickupLocation !== undefined) {  // PICKUP activity
          pickupLocationCounts[phase.pickupLocation] = (pickupLocationCounts[phase.pickupLocation] || 0) + 1;
        }
      }
    }
  }

  let preferredPickupLocation = 'N/A';
  let maxPickupCount = 0;
  for (const [location, count] of Object.entries(pickupLocationCounts)) {
    if (count > maxPickupCount) {
      maxPickupCount = count;
      const loc = parseInt(location);
      preferredPickupLocation = loc === 0 ? 'Alliance Zone' :
        loc === 1 ? 'Outpost' :
          loc === 2 ? 'Neutral Zone' :
            loc === 3 ? 'Opponent Area' : 'N/A';
    }
  }

  // Calculate most common starting position
  const startingPositionCounts: { [key: number]: number } = {};
  for (const record of records) {
    if (record.startingPosition !== undefined) {
      startingPositionCounts[record.startingPosition] = (startingPositionCounts[record.startingPosition] || 0) + 1;
    }
  }

  let mostCommonStartingPosition = 'N/A';
  let maxPositionCount = 0;
  for (const [position, count] of Object.entries(startingPositionCounts)) {
    if (count > maxPositionCount) {
      maxPositionCount = count;
      mostCommonStartingPosition = `P${parseInt(position) + 1}`;
    }
  }

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
    preferredPickupLocation,
    mostCommonStartingPosition,
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

