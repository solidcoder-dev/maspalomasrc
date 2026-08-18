import type { RugbyKidsContentPort } from "../../ports/rugby-kids-content-port";

export async function loadRugbyKidsPage(port: RugbyKidsContentPort) {
  const [intro, schedule, pricing, insurance, cta] = await Promise.all([
    port.getIntro(),
    port.getSchedule(),
    port.getPricing(),
    port.getInsurance(),
    port.getCta()
  ]);
  return { intro, schedule, pricing, insurance, cta };
}
