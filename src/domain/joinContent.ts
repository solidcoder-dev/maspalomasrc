export type JoinIntroDTO = {
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
};

export type JoinFeeDTO = {
  label: string;
  price: string;
  cadence: string;
  description: string;
  note?: string;
};

export type JoinFeesDTO = {
  title: string;
  subtitle: string;
  fees: JoinFeeDTO[];
};

export type JoinEnrollmentOptionDTO = {
  title: string;
  description: string;
  bullets: string[];
  ctaLabel: string;
  ctaUrl: string;
};

export type JoinEnrollmentDTO = {
  title: string;
  description: string;
  options: JoinEnrollmentOptionDTO[];
  importantTitle: string;
  importantItems: string[];
};
