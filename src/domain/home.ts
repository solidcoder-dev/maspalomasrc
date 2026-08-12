export type HomeIntroDTO = {
  title: string;
  subtitle: string;
  description: string;
};

export type HomeRugbyKidsPromoDTO = {
  label: string;
  title: string;
  description: string;
  age: string;
  ctaLabel: string;
  ctaHref: string;
};

export type HomePartnershipDTO = {
  title: string;
  description: string;
  linkLabel: string;
  linkHref: string;
};

export type HomeValuesDTO = {
  title: string;
  points: string[];
};

export type HomeCompetitionDTO = {
  title: string;
  description: string;
};

export type HomeTrainingDTO = {
  schedule: string;
  location: string;
  mapsUrl: string;
};

export type HomeInclusionDTO = {
  title: string;
  description: string;
};

export type HomeSponsorsDTO = {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

export type HomeCtaDTO = {
  title: string;
  description: string;
  primary: {
    label: string;
    href: string;
  };
  secondary: {
    label: string;
    href: string;
  };
  tertiary: {
    label: string;
    href: string;
  };
};

export type HomeSocialsDTO = {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
};
