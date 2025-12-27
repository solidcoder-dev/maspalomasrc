type SubmitFormViewProps = {
  submitDisabled: boolean;
};

function SubmitFormView({ submitDisabled }: SubmitFormViewProps) {
  return (
    <div className="col-12">
      <button type="submit" className="btn btn-primary" disabled={submitDisabled}>
        Enviar solicitud
      </button>
    </div>
  );
}

export default SubmitFormView;
