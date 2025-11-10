// Polyfill for DOMMatrix in Node.js environment
if (typeof globalThis.DOMMatrix === 'undefined') {
  (globalThis as any).DOMMatrix = class DOMMatrix {
    a = 1; b = 0; c = 0; d = 1; e = 0; f = 0;
    translateSelf() { return this; }
    scaleSelf() { return this; }
    inverse() { return this; }
    transformPoint() { return { x: 0, y: 0 }; }
  };
}

// Polyfill for ImageData
if (typeof globalThis.ImageData === 'undefined') {
  (globalThis as any).ImageData = class ImageData {
    data: any;
    width: number;
    height: number;
    constructor(data: any, width: number, height: number) {
      this.data = data;
      this.width = width;
      this.height = height;
    }
  };
}

// Polyfill for HTMLCanvasElement
if (typeof globalThis.HTMLCanvasElement === 'undefined') {
  (globalThis as any).HTMLCanvasElement = class HTMLCanvasElement {
    width = 0;
    height = 0;
    getContext() {
      return {
        fillStyle: '',
        fillRect: () => {},
        getImageData: () => ({ data: new Uint8ClampedArray(4) }),
        putImageData: () => {},
        createImageData: () => ({ data: new Uint8ClampedArray(4) }),
        setTransform: () => {},
        drawImage: () => {},
        save: () => {},
        fillText: () => {},
        restore: () => {},
        beginPath: () => {},
        moveTo: () => {},
        lineTo: () => {},
        closePath: () => {},
        stroke: () => {},
        translate: () => {},
        scale: () => {},
        rotate: () => {},
        arc: () => {},
        fill: () => {},
        measureText: () => ({ width: 0 }),
        transform: () => {},
        rect: () => {},
        clip: () => {},
      };
    }
    toBlob(callback: any) {
      callback(new Blob());
    }
  };
}

// Polyfill for document
if (typeof globalThis.document === 'undefined') {
  (globalThis as any).document = {
    createElement: (tag: string) => {
      if (tag === 'canvas') {
        return new globalThis.HTMLCanvasElement();
      }
      return {};
    }
  };
}

// Polyfill for navigator
if (typeof globalThis.navigator === 'undefined') {
  (globalThis as any).navigator = {
    userAgent: 'Node.js',
  };
}

// Polyfill for window
if (typeof globalThis.window === 'undefined') {
  (globalThis as any).window = globalThis;
}

export {};
