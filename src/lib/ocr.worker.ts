// In new file: lib/ocr.worker.ts

self.onmessage = async (event: MessageEvent<{ image: Blob }>) => {
  const { image } = event.data;

  console.log('⚠️ Frontend OCR worker is disabled. Received image but will not perform OCR.', image);

  self.postMessage({
    status: 'error',
    error: 'Frontend OCR has been disabled in the browser. Please use backend OCR instead.',
  });
};

export {};