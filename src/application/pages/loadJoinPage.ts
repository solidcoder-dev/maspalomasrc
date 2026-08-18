import type { JoinContentPort } from "../../ports/join-content-port";

export async function loadJoinPage(port: JoinContentPort) {
  const [intro, fees, enrollment] = await Promise.all([
    port.getIntro(),
    port.getFees(),
    port.getEnrollment()
  ]);
  return { intro, fees, enrollment };
}
