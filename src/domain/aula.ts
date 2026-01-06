export type AulaIntroDTO = {
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
};

export type AulaAudienceDTO = {
  title: string;
  points: string[];
};

export type AulaPartnershipDTO = {
  title: string;
  description: string;
};

export type AulaTrainingDTO = {
  schedule: string;
  location: string;
  mapsUrl: string;
};

export type AulaApproachDTO = {
  title: string;
  points: string[];
};

export type AulaCtaDTO = {
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
};

export type AulaSocialsDTO = {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
};
