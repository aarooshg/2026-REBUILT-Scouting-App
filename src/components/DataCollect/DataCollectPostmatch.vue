<script setup lang="ts">
import { matchRecord } from './MatchRecords';
import { troyargonautsprotobuf } from '@/protobuf/match-record';

defineEmits(['save']);
</script>

<template>
  <div>
    <v-card class="mx-auto my-6" elevation="12" max-width="520" style="border-radius: 24px">
      <v-card-item>
        <v-card-title class="text-center font-weight-bold">Endgame — Climb Level</v-card-title>
      </v-card-item>

      <v-card-text>
        <v-btn-toggle v-model="matchRecord.climbLevel" class="mx-auto d-flex justify-center" mandatory>
          <v-btn :value="troyargonautsprotobuf.ClimbLevel.LEVEL_1" color="primary" style="flex: 1">
            Level 1
          </v-btn>
          <v-btn :value="troyargonautsprotobuf.ClimbLevel.LEVEL_2" color="primary" style="flex: 1">
            Level 2
          </v-btn>
          <v-btn :value="troyargonautsprotobuf.ClimbLevel.LEVEL_3" color="primary" style="flex: 1">
            Level 3
          </v-btn>
          <v-btn :value="troyargonautsprotobuf.ClimbLevel.CLIMB_NONE" color="primary" style="flex: 1">
            None
          </v-btn>
        </v-btn-toggle>
      </v-card-text>
    </v-card>

    <v-card class="mx-auto my-6" elevation="12" max-width="520" style="border-radius: 24px">
      <v-card-item>
        <v-card-title class="text-center font-weight-bold">Robot Capabilities (Observed)</v-card-title>
      </v-card-item>
      <v-card-text>
        <v-switch
          label="Can go over bump"
          color="secondary"
          v-model="matchRecord.canGoOverBump"
        />
        <v-switch
          label="Can go under trench"
          color="secondary"
          v-model="matchRecord.canGoUnderTrench"
        />
      </v-card-text>
    </v-card>

    <v-card class="mx-auto my-6" elevation="12" max-width="520" style="border-radius: 24px">
      <v-card-item>
        <v-card-title class="text-center font-weight-bold">Preferred Path</v-card-title>
        <v-card-subtitle class="text-center">Which path did the robot prefer?</v-card-subtitle>
      </v-card-item>
      <v-card-text>
        <v-btn-toggle v-model="matchRecord.preferredPath" class="mx-auto d-flex justify-center" mandatory>
          <v-btn :value="troyargonautsprotobuf.PreferredPath.BUMP" color="primary" style="flex: 1">
            Bump
          </v-btn>
          <v-btn :value="troyargonautsprotobuf.PreferredPath.TRENCH" color="primary" style="flex: 1">
            Trench
          </v-btn>
          <v-btn :value="troyargonautsprotobuf.PreferredPath.NONE" color="primary" style="flex: 1">
            None
          </v-btn>
        </v-btn-toggle>
      </v-card-text>
    </v-card>

    <v-text-field
      clearable
      label="Additional Comments"
      variant="outlined"
      v-model="matchRecord.notes"
    />

    <v-btn color="success" block size="large" class="mt-4" @click="$emit('save')">Save</v-btn>
  </div>
</template>

