<script lang="ts" setup>
import { computed, ref } from 'vue';
import QRCode from '../QRCode.vue';
import QRCodeScanner from '../QRCodeScanner.vue';
import { matchRecords } from '../DataCollect/MatchRecords';
import { decompressUint8Array } from '@/lib/compression';
import { troyargonautsprotobuf } from '@/protobuf/match-record';
import type { MatchRecord } from '@/data';

const MatchRecords = troyargonautsprotobuf.MatchRecords;

const ready = ref(false);

// first stage: present QR for matches we already have
const matchIds = computed(() => matchRecords.value.map((record) => record.id));
const prereceiveData = computed<string>(() => {
  const parts: string[] = [];
  parts.push('1'); // version
  for (const id of matchIds.value) parts.push(id);
  return parts.join(',');
});

/** compressed payload chunks */
const receivedData = ref<Uint8Array[]>([]);
/** 1 based */
const lastQrReceived = ref(0);
const totalQrCodes = ref(0);

async function onScanResult(result: { bytes: Uint8Array }) {
  const scannedQrNum = result.bytes[0]; // 1-indexed
  if (scannedQrNum === lastQrReceived.value) {
    return; // duplicate scan
  }
  lastQrReceived.value = scannedQrNum;

  totalQrCodes.value = result.bytes[1];
  const compressedChunk = result.bytes.slice(2);
  receivedData.value.push(compressedChunk);

  if (lastQrReceived.value === totalQrCodes.value) {
    // all QR codes received. join parts, decompress and process
    const totalByteLength = receivedData.value.reduce<number>((a, b) => a + b.length, 0);
    const compressed = new Uint8Array(totalByteLength);
    let offset = 0;
    for (const part of receivedData.value) {
      compressed.set(part, offset);
      offset += part.length;
    }

    const decompressed = await decompressUint8Array(compressed);
    const decodedMatchRecords = MatchRecords.toObject(MatchRecords.decode(decompressed), {
      // protobufjs classes serialize enums as strings unless forced to numbers
      enums: Number,
      defaults: true,
      arrays: true,
      objects: true,
    }) as unknown as { records: MatchRecord[] };

    let added = 0;
    for (const record of decodedMatchRecords.records) {
      if (!matchRecords.value.some((r) => r.id === record.id)) {
        matchRecords.value.push(record);
        added++;
      }
    }

    alert(`Transfer complete! Added ${added} new match records.`);
  }
}

function readyToReceive() {
  ready.value = true;
  lastQrReceived.value = 0;
  totalQrCodes.value = 0;
  receivedData.value = [];
}
</script>

<template>
  <div>
    <div v-if="!ready">
      Show this to the sender:
      <QRCode :data="prereceiveData" />
      <br />
      <v-btn color="green" block @click="readyToReceive()">Ready</v-btn>
    </div>
    <div v-else>
      Scanned {{ lastQrReceived }} / {{ totalQrCodes }} QR codes.
      <QRCodeScanner @result="(msg, result) => onScanResult(result)" />
    </div>
  </div>
</template>

