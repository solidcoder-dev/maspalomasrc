import JoinForm from "./join/JoinForm";

function JoinSection() {
  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <h1 className="card-title h4 fw-bold mb-3">Únete</h1>
        <p className="text-secondary mb-4">
          Completa el formulario para iniciar el alta. Nos pondremos en contacto
          contigo para confirmar los próximos pasos.
        </p>
        <JoinForm />
      </div>
    </section>
  );
}

export default JoinSection;
