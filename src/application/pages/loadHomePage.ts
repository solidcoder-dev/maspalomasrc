import type { HomeContentPort } from "../../ports/home-content-port";

export async function loadHomePage(port: HomeContentPort) {
  const [intro, rugbyKidsPromo, partnership, values, competition, training, inclusion, sponsors, cta, socials] = await Promise.all([
    port.getIntro(),
    port.getRugbyKidsPromo(),
    port.getPartnership(),
    port.getValues(),
    port.getCompetition(),
    port.getTraining(),
    port.getInclusion(),
    port.getSponsors(),
    port.getCta(),
    port.getSocials()
  ]);
  return { intro, rugbyKidsPromo, partnership, values, competition, training, inclusion, sponsors, cta, socials };
}
