declare module "pdfjs-dist/legacy/build/pdf.mjs" {
  export const version: string;
  export const GlobalWorkerOptions: { workerSrc?: string };
  export function getDocument(options: any): any;
}
