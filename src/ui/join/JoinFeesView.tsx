import type { JoinFeesDTO } from "../../domain/joinContent";
import PricingOptionsView from "../shared/PricingOptionsView";

type JoinFeesViewProps = {
  fees: JoinFeesDTO;
};

function JoinFeesView({ fees }: JoinFeesViewProps) {
  return <PricingOptionsView label="Cuotas" title={fees.title} subtitle={fees.subtitle} options={fees.fees.map((fee) => ({ title: fee.label, description: fee.description, price: fee.price, cadence: fee.cadence, note: fee.note }))} />;
}

export default JoinFeesView;
