export type CountryDateAndPPPListDetails = {
  country: string;
  date: string;
  ppp: number | null;
};

export type PPPLoadDetails = {
  data: PPPData | null;
  isLoading: boolean;
  loadError: string | null;
};

export type PPPData = {
  countryList: string[];
  countryToPPPDetails: CountryToPPPDetails;
};

export type CountryToPPPDetails = {
  [country: string]: {
    [date: string]: number | null;
  };
};
