import type { RugbyKidsIntroDTO } from "../../domain/rugbyKids";

function RugbyKidsIntroView({ intro }: { intro: RugbyKidsIntroDTO }) {
  return <div className="mb-4 p-4 p-md-5 border rounded-4 bg-body-tertiary shadow-sm"><div className="row g-4 align-items-start"><div className="col-lg-8"><span className="text-uppercase small text-body-secondary">{intro.label}</span><h2 className="h3 fw-semibold mt-2 mb-3">{intro.title}</h2><p className="text-body-emphasis mb-0">{intro.description}</p></div><div className="col-lg-4"><div className="p-3 bg-body rounded-3 border"><span className="small text-body-secondary d-block">Edad</span><span className="h4 fw-semibold mb-0">{intro.age}</span></div></div></div></div>;
}

export default RugbyKidsIntroView;
