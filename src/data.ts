import { troyargonautsprotobuf } from './protobuf/match-record';

export type MatchRecord = {
  id: string;
  team: string;
  match: string;
  scouter: string;

  autonMainScore: number;
  teleopMainScore: number;

  climbLevel: troyargonautsprotobuf.ClimbLevel;

  canGoOverBump: boolean;
  canGoUnderTrench: boolean;

  notes: string;
};

export type TeamProfile = {
  team: string;
  matchRecords: MatchRecord[];

  avgAutonMainScore: number;
  avgTeleopMainScore: number;
  avgTotalMainScore: number;

  canClimbLevel1: boolean;
  canClimbLevel2: boolean;
  canClimbLevel3: boolean;

  canGoOverBump: boolean;
  canGoUnderTrench: boolean;
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

  const sums = {
    autonMainScore: 0,
    teleopMainScore: 0,
  };

  for (const record of records) {
    if (record.team) team = record.team;

    sums.autonMainScore += record.autonMainScore || 0;
    sums.teleopMainScore += record.teleopMainScore || 0;

    if (record.climbLevel === troyargonautsprotobuf.ClimbLevel.LEVEL_1) canClimbLevel1 = true;
    if (record.climbLevel === troyargonautsprotobuf.ClimbLevel.LEVEL_2) canClimbLevel2 = true;
    if (record.climbLevel === troyargonautsprotobuf.ClimbLevel.LEVEL_3) canClimbLevel3 = true;

    if (record.canGoOverBump) canGoOverBump = true;
    if (record.canGoUnderTrench) canGoUnderTrench = true;
  }

  const avgAutonMainScore = records.length ? sums.autonMainScore / records.length : 0;
  const avgTeleopMainScore = records.length ? sums.teleopMainScore / records.length : 0;
  const avgTotalMainScore = avgAutonMainScore + avgTeleopMainScore;

  return {
    team,
    matchRecords: records,
    avgAutonMainScore,
    avgTeleopMainScore,
    avgTotalMainScore,
    canClimbLevel1,
    canClimbLevel2,
    canClimbLevel3,
    canGoOverBump,
    canGoUnderTrench,
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

