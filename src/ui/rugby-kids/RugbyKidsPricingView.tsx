import type { RugbyKidsPricingDTO } from "../../domain/rugbyKids";
import PricingOptionsView from "../shared/PricingOptionsView";

function RugbyKidsPricingView({ pricing }: { pricing: RugbyKidsPricingDTO }) {
  return <PricingOptionsView label="Precio" title={pricing.title} options={pricing.options} />;
}

export default RugbyKidsPricingView;
