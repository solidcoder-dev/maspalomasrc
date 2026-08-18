import type { Club } from "../../domain/club";
import type { RugbyKidsContentPort } from "../../ports/rugby-kids-content-port";
import RugbyKidsCtaView from "./RugbyKidsCtaView";
import RugbyKidsInsuranceView from "./RugbyKidsInsuranceView";
import RugbyKidsIntroView from "./RugbyKidsIntroView";
import RugbyKidsPricingView from "./RugbyKidsPricingView";
import RugbyKidsScheduleView from "./RugbyKidsScheduleView";
import RugbyKidsTrainingView from "./RugbyKidsTrainingView";
import { useRugbyKidsPresenter } from "./useRugbyKidsPresenter";
import { useEffect } from "react";

type RugbyKidsSectionProps = { rugbyKidsContentPort: RugbyKidsContentPort; training: Club["training"] };

function RugbyKidsSection({ rugbyKidsContentPort, training }: RugbyKidsSectionProps) {
  useEffect(() => {
    const title = "Rugby infantil en Las Palmas de Gran Canaria | Rugby Kids";
    const description =
      "Rugby para niños y niñas de 10 a 16 años en Las Palmas de Gran Canaria. Entrenamientos en el Campus de Tafira.";
    const previousTitle = document.title;
    const previousMeta = new Map<string, string | null>();
    const previousCanonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = `${window.location.origin}${import.meta.env.BASE_URL}rugby-kids`;
    document.title = title;
    document.head.appendChild(canonical);

    const setMeta = (attribute: "name" | "property", key: string, content: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      previousMeta.set(`${attribute}:${key}`, element?.content ?? null);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);

    const structuredData = document.createElement("script");
    structuredData.type = "application/ld+json";
    structuredData.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SportsActivityLocation",
      name: "Rugby Kids - Club de Rugby Maspalomas",
      description,
      sport: "Rugby",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Las Palmas de Gran Canaria",
        addressCountry: "ES"
      },
      url: `${window.location.origin}${import.meta.env.BASE_URL}rugby-kids`
    });
    document.head.appendChild(structuredData);

    return () => {
      structuredData.remove();
      canonical.remove();
      if (previousCanonical) document.head.appendChild(previousCanonical);
      document.title = previousTitle;
      previousMeta.forEach((previousContent, selector) => {
        const [attribute, key] = selector.split(":");
        const element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
        if (!element) return;
        if (previousContent === null) element.remove();
        else element.content = previousContent;
      });
    };
  }, []);

  const { intro, schedule, pricing, insurance, cta, error, isLoading } = useRugbyKidsPresenter({ rugbyKidsContentPort });
  return <section><div className="d-flex flex-wrap align-items-center gap-2 mb-4"><h1 className="h4 fw-bold mb-0">Rugby para niños y niñas en Las Palmas de Gran Canaria</h1><span className="badge bg-primary-subtle text-primary-emphasis">Rugby Kids</span></div>{error && <p className="text-danger mb-3" role="alert">{error}</p>}{isLoading && !error && <p className="text-body-secondary mb-3">Cargando información...</p>}{intro && schedule && pricing && insurance && cta && !error && <><RugbyKidsIntroView intro={intro} /><RugbyKidsScheduleView schedule={schedule} /><RugbyKidsPricingView pricing={pricing} /><RugbyKidsInsuranceView insurance={insurance} /><RugbyKidsTrainingView training={training} /><RugbyKidsCtaView cta={cta} /></>}</section>;
}

export default RugbyKidsSection;
