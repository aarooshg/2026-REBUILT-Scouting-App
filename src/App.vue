<script setup lang="ts">
import { computed, ref } from 'vue';
import DataCollectPage from './components/DataCollect/DataCollectPage.vue';
import DataTransferPage from './components/DataTransfer/DataTransferPage.vue';
import RobotProfile from './components/RobotProfile.vue';
import MatchRecordsPage from './components/MatchRecordsPage.vue';

type ScreenName = 'data-collect' | 'data-transfer' | 'match-records' | 'robot-profiles';

const drawer = ref(false);
const page = ref<ScreenName>('data-collect');

const appVersion = APP_VERSION;

const pageTitle = computed(() => {
  switch (page.value) {
    case 'data-collect':
      return 'Data Collect';
    case 'data-transfer':
      return 'Data Transfer';
    case 'match-records':
      return 'Match Records';
    case 'robot-profiles':
      return 'Robot Profiles';
    default:
      return 'Scouting';
  }
});
</script>

<template>
  <v-app>
    <v-layout class="rounded rounded-md">
      <v-navigation-drawer v-model="drawer" color="primary">
        <v-list>
          <v-list-subheader justify="center" title="Navigation" />

          <v-list-item
            prepend-icon="mdi-clipboard-edit"
            title="Data Collect"
            @click="page = 'data-collect'"
          />
          <v-list-item
            prepend-icon="mdi-qrcode"
            title="Data Transfer"
            @click="page = 'data-transfer'"
          />
          <v-list-item
            prepend-icon="mdi-table"
            title="Match Records"
            @click="page = 'match-records'"
          />
          <v-list-item
            prepend-icon="mdi-chart-box"
            title="Robot Profiles"
            @click="page = 'robot-profiles'"
          />

          <v-spacer />
          <div class="mr-2 mt-2 text-center">v{{ appVersion }}</div>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar color="primary">
        <v-app-bar-nav-icon variant="text" @click="drawer = !drawer" />
        <v-toolbar-title>Argonauts Scouting 2026 — {{ pageTitle }}</v-toolbar-title>
      </v-app-bar>

      <v-main style="min-height: 300px">
        <DataCollectPage v-if="page === 'data-collect'" />
        <DataTransferPage v-else-if="page === 'data-transfer'" />
        <MatchRecordsPage v-else-if="page === 'match-records'" />
        <RobotProfile v-else />
      </v-main>
    </v-layout>
  </v-app>
</template>

