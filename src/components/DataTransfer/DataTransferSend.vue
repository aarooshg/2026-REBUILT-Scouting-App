<script lang="ts" setup>
import { computed, ref } from 'vue';
import QRCode from '../QRCode.vue';
import QRCodeScanner from '../QRCodeScanner.vue';
import { matchRecords } from '../DataCollect/MatchRecords';
import { troyargonautsprotobuf } from '@/protobuf/match-record';
import { compressUint8Array } from '@/lib/compression';

const MatchRecords = troyargonautsprotobuf.MatchRecords;

const chunks = ref<Uint8Array[]>([]);
const ready = ref(false);

/** hard limit depends on QR error correction level; keep conservative */
const payloadByteLimit = ref(1000);

async function onScanPrereceive(result: { bytes: Uint8Array }) {
  const decodedPrereceive = new TextDecoder().decode(result.bytes);
  const parts = decodedPrereceive.split(',');

  // first part is the version
  const version = parts[0];
  if (version !== '1') {
    alert('Invalid prereceive version');
    return;
  }

  // remaining parts are the match IDs receiver already has
  const matchIds = parts.slice(1);

  const matchRecordsToSend = matchRecords.value.filter((record) => !matchIds.includes(record.id));
  if (matchRecordsToSend.length === 0) {
    alert('Receiver already has all the matches you have');
    return;
  }

  const protobuffed = MatchRecords.encode({
    records: matchRecordsToSend,
  }).finish();

  const compressed = await compressUint8Array(protobuffed);

  // split into chunks
  chunks.value = [];
  let chunk: number[] = [];
  for (const byte of compressed) {
    chunk.push(byte);
    if (chunk.length >= payloadByteLimit.value) {
      chunks.value.push(new Uint8Array(chunk));
      chunk = [];
    }
  }
  if (chunk.length > 0) {
    chunks.value.push(new Uint8Array(chunk));
  }

  ready.value = true;
}

const currentQrIdx = ref(0);
const totalQrCodes = computed(() => chunks.value.length);
const currentQrData = computed<Uint8Array | null>(() => {
  const currentChunk = chunks.value[currentQrIdx.value];
  if (!currentChunk) return null;

  const qrData = new Uint8Array(currentChunk.length + 2);
  qrData[0] = currentQrIdx.value + 1;
  qrData[1] = totalQrCodes.value;
  qrData.set(currentChunk, 2);
  return qrData;
});

function updatePayloadByteLimit(value: string) {
  payloadByteLimit.value = Math.min(2300, Math.max(20, parseInt(value || '0', 10)));
}
</script>

<template>
  <div>
    <div v-if="!ready">
      <v-text-field
        :model-value="payloadByteLimit"
        label="Payload byte limit"
        min="20"
        max="2300"
        class="mt-2"
        hint="Lower this if scanning is flaky"
        @update:model-value="updatePayloadByteLimit"
      />
      <h2 class="text-center">Scan QR from the receiver</h2>
      <QRCodeScanner @result="(msg, result) => onScanPrereceive(result)" />
    </div>

    <div v-else>
      <h2 class="text-center">Scan this QR code with the receiver</h2>
      <QRCode :data="currentQrData" />
      <p class="text-center">QR: {{ currentQrIdx + 1 }} / {{ totalQrCodes }}</p>
      <br />
      <v-btn
        v-if="currentQrIdx + 1 !== totalQrCodes"
        color="green"
        block
        text="Next QR"
        @click="currentQrIdx++"
      />
    </div>
  </div>
</template>

