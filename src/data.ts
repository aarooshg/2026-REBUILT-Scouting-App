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
    shotsMissed?: number;
    shotsAttempted?: number;
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

  // Per-phase statistics
  avgPhase0ShotsAttempted: number;
  avgPhase0ShotsMade: number;
  avgPhase1ShotsAttempted: number;
  avgPhase1ShotsMade: number;
  avgPhase2ShotsAttempted: number;
  avgPhase2ShotsMade: number;
  avgPhase3ShotsAttempted: number;
  avgPhase3ShotsMade: number;
  avgPhase4ShotsAttempted: number;
  avgPhase4ShotsMade: number;
  avgPhase5ShotsAttempted: number;
  avgPhase5ShotsMade: number;

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
  mostCommonPath: string;
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

  // Calculate per-phase statistics
  const phaseSums = {
    phase0Attempted: 0,
    phase0Made: 0,
    phase1Attempted: 0,
    phase1Made: 0,
    phase2Attempted: 0,
    phase2Made: 0,
    phase3Attempted: 0,
    phase3Made: 0,
    phase4Attempted: 0,
    phase4Made: 0,
    phase5Attempted: 0,
    phase5Made: 0,
  };

  for (const record of records) {
    if (record.teleopPhases) {
      for (let i = 0; i < 6; i++) {
        const phase = record.teleopPhases[i];
        if (phase && phase.activity === 0) {  // SCORED activity
          const attempted = phase.shotsAttempted || 0;
          const missed = phase.shotsMissed || 0;
          const made = attempted - missed;

          switch (i) {
            case 0:
              phaseSums.phase0Attempted += attempted;
              phaseSums.phase0Made += made;
              break;
            case 1:
              phaseSums.phase1Attempted += attempted;
              phaseSums.phase1Made += made;
              break;
            case 2:
              phaseSums.phase2Attempted += attempted;
              phaseSums.phase2Made += made;
              break;
            case 3:
              phaseSums.phase3Attempted += attempted;
              phaseSums.phase3Made += made;
              break;
            case 4:
              phaseSums.phase4Attempted += attempted;
              phaseSums.phase4Made += made;
              break;
            case 5:
              phaseSums.phase5Attempted += attempted;
              phaseSums.phase5Made += made;
              break;
          }
        }
      }
    }
  }

  // Calculate averages for each phase
  const avgPhase0ShotsAttempted = records.length ? phaseSums.phase0Attempted / records.length : 0;
  const avgPhase0ShotsMade = records.length ? phaseSums.phase0Made / records.length : 0;
  const avgPhase1ShotsAttempted = records.length ? phaseSums.phase1Attempted / records.length : 0;
  const avgPhase1ShotsMade = records.length ? phaseSums.phase1Made / records.length : 0;
  const avgPhase2ShotsAttempted = records.length ? phaseSums.phase2Attempted / records.length : 0;
  const avgPhase2ShotsMade = records.length ? phaseSums.phase2Made / records.length : 0;
  const avgPhase3ShotsAttempted = records.length ? phaseSums.phase3Attempted / records.length : 0;
  const avgPhase3ShotsMade = records.length ? phaseSums.phase3Made / records.length : 0;
  const avgPhase4ShotsAttempted = records.length ? phaseSums.phase4Attempted / records.length : 0;
  const avgPhase4ShotsMade = records.length ? phaseSums.phase4Made / records.length : 0;
  const avgPhase5ShotsAttempted = records.length ? phaseSums.phase5Attempted / records.length : 0;
  const avgPhase5ShotsMade = records.length ? phaseSums.phase5Made / records.length : 0;

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

  // Calculate most common path (Bump or Trench) — excludes NONE (0)
  const pathCounts: { [key: number]: number } = {};
  for (const record of records) {
    if (record.preferredPath !== undefined && record.preferredPath !== 0) {
      pathCounts[record.preferredPath] = (pathCounts[record.preferredPath] || 0) + 1;
    }
  }

  let mostCommonPath = 'N/A';
  let maxPathCount = 0;
  for (const [path, count] of Object.entries(pathCounts)) {
    if (count > maxPathCount) {
      maxPathCount = count;
      const p = parseInt(path);
      mostCommonPath = p === 1 ? 'Bump' : p === 2 ? 'Trench' : 'N/A';
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
    avgPhase0ShotsAttempted,
    avgPhase0ShotsMade,
    avgPhase1ShotsAttempted,
    avgPhase1ShotsMade,
    avgPhase2ShotsAttempted,
    avgPhase2ShotsMade,
    avgPhase3ShotsAttempted,
    avgPhase3ShotsMade,
    avgPhase4ShotsAttempted,
    avgPhase4ShotsMade,
    avgPhase5ShotsAttempted,
    avgPhase5ShotsMade,
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
    mostCommonPath,
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

