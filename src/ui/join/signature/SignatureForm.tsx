import { useEffect, useRef } from "react";
import type { JoinRequestHandlers } from "../../../application/join/joinRequestPresenter";
import { createSignaturePadAdapter } from "../../../infrastructure/signaturePadAdapter";
import type { SignaturePadInstance } from "../../../ports/signature-pad-port";
import SignatureFormView from "./SignatureFormView";

type SignatureFormProps = Pick<
  JoinRequestHandlers,
  "errors" | "shouldShowError" | "onSignatureChange" | "onSignatureClear"
>;

function SignatureForm({
  errors,
  shouldShowError,
  onSignatureChange,
  onSignatureClear
}: SignatureFormProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const signaturePadRef = useRef<SignaturePadInstance | null>(null);
  const onChangeRef = useRef(onSignatureChange);
  const onClearRef = useRef(onSignatureClear);

  useEffect(() => {
    onChangeRef.current = onSignatureChange;
    onClearRef.current = onSignatureClear;
  }, [onSignatureChange, onSignatureClear]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const adapter = createSignaturePadAdapter();
    const pad = adapter.create(canvasRef.current);
    signaturePadRef.current = pad;
    const canvas = canvasRef.current;
    const handleEnd = () => {
      if (pad.isEmpty()) {
        onClearRef.current();
        return;
      }
      onChangeRef.current(pad.toDataURL());
    };

    pad.setOnEnd(handleEnd);
    canvas.addEventListener("pointerup", handleEnd);

    return () => {
      canvas.removeEventListener("pointerup", handleEnd);
    };
  }, []);

  const handleClear = () => {
    if (!signaturePadRef.current) return;
    signaturePadRef.current.clear();
    onClearRef.current();
  };

  return (
    <SignatureFormView
      canvasRef={canvasRef}
      errors={errors}
      shouldShowError={shouldShowError}
      onClear={handleClear}
    />
  );
}

export default SignatureForm;
