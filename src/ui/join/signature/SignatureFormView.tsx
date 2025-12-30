import type { RefObject } from "react";
import type {
  JoinRequestErrors,
  JoinRequestValues
} from "../../../application/join/joinRequestPresenter";

type SignatureFormViewProps = {
  canvasRef: RefObject<HTMLCanvasElement>;
  errors: JoinRequestErrors;
  shouldShowError: (field: keyof JoinRequestValues) => boolean;
  onClear: () => void;
};

function SignatureFormView({
  canvasRef,
  errors,
  shouldShowError,
  onClear
}: SignatureFormViewProps) {
  const showError = Boolean(
    errors.signatureDataUrl && shouldShowError("signatureDataUrl")
  );

  return (
    <div className="col-12">
      <label className="form-label" htmlFor="signature">
        Firma *
      </label>
      <div
        className={`border rounded p-2 ${showError ? "border-danger" : ""}`}
      >
        <canvas
          id="signature"
          ref={canvasRef}
          className="w-100"
          style={{ height: "160px" }}
          aria-invalid={showError}
          aria-describedby={showError ? "signature-error" : undefined}
        />
      </div>
      <div className="mt-2 d-flex gap-2">
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm"
          onClick={onClear}
        >
          Limpiar firma
        </button>
      </div>
      {showError && (
        <div className="invalid-feedback d-block" id="signature-error">
          {errors.signatureDataUrl}
        </div>
      )}
    </div>
  );
}

export default SignatureFormView;
