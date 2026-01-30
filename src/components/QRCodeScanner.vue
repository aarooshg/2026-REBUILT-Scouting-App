<template>
  <div id="qr-code-full-region"></div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from 'html5-qrcode';

const emit = defineEmits<{
  result: [string, { bytes: Uint8Array }];
  error: [string];
}>();

const scanner = ref<Html5QrcodeScanner>();

function base64ToUint8Array(b64: string): Uint8Array {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

onMounted(() => {
  const config = {
    fps: 10,
    qrbox: 240,
    formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
  };

  scanner.value = new Html5QrcodeScanner('qr-code-full-region', config, false);
  scanner.value.render(
    (msg) => {
      // We encode binary payloads as base64 text with a `b64:` prefix.
      // Prereceive QR is plain text (version + comma-separated ids).
      const bytes = msg.startsWith('b64:')
        ? base64ToUint8Array(msg.slice('b64:'.length))
        : new TextEncoder().encode(msg);
      emit('result', msg, { bytes });
    },
    (msg) => {
      // html5-qrcode reports "errors" when no QR is detected
      emit('error', msg);
    },
  );
});

onBeforeUnmount(() => {
  if (scanner.value) {
    scanner.value.clear();
  }
});
</script>

