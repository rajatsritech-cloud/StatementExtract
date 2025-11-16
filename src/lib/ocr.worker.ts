// In new file: lib/ocr.worker.ts
import Tesseract from 'tesseract.js';

self.onmessage = async (event: MessageEvent<{ image: Blob }>) => {
  const { image } = event.data;

  try {
    // Run the OCR inside the worker
    const result = await Tesseract.recognize(image, 'eng', {
      logger: (m) => {
        // Send progress updates back to the main thread
        if (m.status === 'recognizing text') {
          self.postMessage({
            status: 'progress',
            progress: m.progress,
          });
        }
      },
    });

    // Send the final text back
    self.postMessage({
      status: 'complete',
      text: result.data.text,
    });

  } catch (error) {
    self.postMessage({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown OCR error',
    });
  }
};