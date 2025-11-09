// Polyfill for DOMMatrix in Node.js environment
if (typeof globalThis.DOMMatrix === 'undefined') {
  globalThis.DOMMatrix = class DOMMatrix {
    constructor() {
      this.a = 1; this.b = 0; this.c = 0; this.d = 1; this.e = 0; this.f = 0;
    }
    translateSelf() { return this; }
    scaleSelf() { return this; }
    inverse() { return this; }
    transformPoint() { return { x: 0, y: 0 }; }
  };
}

// Polyfill for ImageData
if (typeof globalThis.ImageData === 'undefined') {
  globalThis.ImageData = class ImageData {
    constructor(data, width, height) {
      this.data = data;
      this.width = width;
      this.height = height;
    }
  };
}

// Polyfill for HTMLCanvasElement
if (typeof globalThis.HTMLCanvasElement === 'undefined') {
  globalThis.HTMLCanvasElement = class HTMLCanvasElement {
    constructor() {
      this.width = 0;
      this.height = 0;
    }
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
    toBlob(callback) {
      callback(new Blob());
    }
  };
}

// Polyfill for document
if (typeof globalThis.document === 'undefined') {
  globalThis.document = {
    createElement: (tag) => {
      if (tag === 'canvas') {
        return new globalThis.HTMLCanvasElement();
      }
      return {};
    }
  };
}

// Polyfill for navigator
if (typeof globalThis.navigator === 'undefined') {
  globalThis.navigator = {
    userAgent: 'Node.js',
  };
}

// Polyfill for window
if (typeof globalThis.window === 'undefined') {
  globalThis.window = globalThis;
}
