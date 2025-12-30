import SignaturePad from "signature_pad";
import type {
  SignaturePadInstance,
  SignaturePadPort
} from "../ports/signature-pad-port";

const resizeCanvas = (canvas: HTMLCanvasElement) => {
  const ratio = Math.max(window.devicePixelRatio || 1, 1);
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * ratio;
  canvas.height = rect.height * ratio;
  const context = canvas.getContext("2d");
  if (context) {
    context.scale(ratio, ratio);
  }
};

export function createSignaturePadAdapter(): SignaturePadPort {
  const create = (canvas: HTMLCanvasElement): SignaturePadInstance => {
    resizeCanvas(canvas);
    const pad = new SignaturePad(canvas);

    return {
      clear: () => pad.clear(),
      isEmpty: () => pad.isEmpty(),
      toDataURL: () => pad.toDataURL(),
      setOnEnd: (callback: () => void) => {
        pad.onEnd = callback;
      }
    };
  };

  return { create };
}
