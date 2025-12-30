export type SignaturePadInstance = {
  clear: () => void;
  isEmpty: () => boolean;
  toDataURL: () => string;
  setOnEnd: (callback: () => void) => void;
};

export interface SignaturePadPort {
  create(canvas: HTMLCanvasElement): SignaturePadInstance;
}
