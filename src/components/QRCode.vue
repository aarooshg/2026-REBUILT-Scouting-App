<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import qrcode from 'qrcode';

const imgUrl = ref('');
const errText = ref('');

const props = defineProps<{
  data: Uint8Array | string | null;
}>();

function uint8ToBase64(bytes: Uint8Array): string {
  // btoa expects "binary string"; do it in chunks to avoid call stack / arg limits
  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode(...chunk);
  }
  return btoa(binary);
}

watch(
  computed(() => props.data),
  () => {
    errText.value = '';
    imgUrl.value = '';
    if (!props.data) return;

    const payload =
      typeof props.data === 'string' ? props.data : `b64:${uint8ToBase64(props.data)}`;

    qrcode.toDataURL(payload, function (err, url) {
      if (err) {
        errText.value = err.message;
        console.error(err);
      } else {
        imgUrl.value = url;
      }
    });
  },
  { immediate: true },
);
</script>

<template>
  <div>
    <v-img
      loading
      v-bind="{
        width: 512,
        height: 512,
        ...$attrs,
      }"
      :src="imgUrl"
    >
      <template #placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-progress-circular color="grey-lighten-4" indeterminate />
        </div>
      </template>
    </v-img>
    <div v-if="errText">{{ errText }}</div>
  </div>
</template>

