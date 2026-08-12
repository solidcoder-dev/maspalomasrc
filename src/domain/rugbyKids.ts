export type RugbyKidsIntroDTO = {
  label: string;
  title: string;
  description: string;
  age: string;
};

export type RugbyKidsScheduleDTO = {
  title: string;
  seasons: {
    name: string;
    sessions: string[];
  }[];
};

export type RugbyKidsPricingOptionDTO = {
  title: string;
  description: string;
  price: string;
  cadence: string;
};

export type RugbyKidsPricingDTO = {
  title: string;
  options: RugbyKidsPricingOptionDTO[];
};

export type RugbyKidsInsuranceDTO = {
  title: string;
  price: string;
  cadence: string;
  text: string;
};

export type RugbyKidsCtaDTO = {
  title: string;
  text: string;
  primary: {
    label: string;
    href: string;
  };
  secondary: {
    label: string;
    href: string;
  };
};
