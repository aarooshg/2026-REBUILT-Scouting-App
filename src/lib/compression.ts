import { ref, watch, type ComputedRef } from 'vue';

export async function compressUint8Array(data: Uint8Array): Promise<Uint8Array> {
  const readableStream = new ReadableStream({
    start(controller) {
      controller.enqueue(data);
      controller.close();
    },
  });

  const compressedStream = readableStream.pipeThrough(new CompressionStream('gzip'));
  const reader = compressedStream.getReader();
  const chunks: Uint8Array[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  const compressedData = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
  let offset = 0;
  for (const chunk of chunks) {
    compressedData.set(chunk, offset);
    offset += chunk.length;
  }

  return compressedData;
}

export async function decompressUint8Array(data: Uint8Array): Promise<Uint8Array> {
  const readableStream = new ReadableStream({
    start(controller) {
      controller.enqueue(data);
      controller.close();
    },
  });

  const decompressedStream = readableStream.pipeThrough(new DecompressionStream('gzip'));
  const reader = decompressedStream.getReader();
  const chunks: Uint8Array[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  const decompressedData = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
  let offset = 0;
  for (const chunk of chunks) {
    decompressedData.set(chunk, offset);
    offset += chunk.length;
  }

  return decompressedData;
}

export function useCompression(data: ComputedRef<Uint8Array>): ComputedRef<Uint8Array | null> {
  const compressedRef = ref<Uint8Array | null>(null);
  watch(
    data,
    async (newData) => {
      compressedRef.value = null;
      compressedRef.value = await compressUint8Array(newData);
    },
    { immediate: true },
  );
  return compressedRef as ComputedRef<Uint8Array | null>;
}

export function useDecompression(
  data: ComputedRef<Uint8Array | null>,
): ComputedRef<Uint8Array | null> {
  const decompressedRef = ref<Uint8Array | null>(null);
  watch(
    data,
    async (newData) => {
      decompressedRef.value = null;
      if (!newData) return;
      decompressedRef.value = await decompressUint8Array(newData);
    },
    { immediate: true },
  );
  return decompressedRef as ComputedRef<Uint8Array | null>;
}

