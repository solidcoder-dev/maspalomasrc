import type { AulaContentPort } from "../../ports/aula-content-port";

export async function loadAulaPage(port: AulaContentPort) {
  const [intro, audience, training, approach, partnership, cta, socials] = await Promise.all([
    port.getIntro(),
    port.getAudience(),
    port.getTraining(),
    port.getApproach(),
    port.getPartnership(),
    port.getCta(),
    port.getSocials()
  ]);
  return { intro, audience, training, approach, partnership, cta, socials };
}
