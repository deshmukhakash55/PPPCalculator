import axios, {AxiosResponse} from 'axios';
import {useCallback, useState} from 'react';
import {
  CountryDateAndPPPListDetails,
  CountryToPPPDetails,
  PPPData,
  PPPLoadDetails,
} from '../../types/types';

export const usePPP = () => {
  const [pppLoadDetails, setPPPLoadDetails] = useState<PPPLoadDetails>(
    initialPPPLoadDetails,
  );

  const loadPPPDetails = useCallback(async () => {
    const year: number = new Date().getFullYear();
    setPPPLoadDetails((previousPPPLoadDetails: PPPLoadDetails) => ({
      ...previousPPPLoadDetails,
      isLoading: true,
      loadError: null,
    }));

    try {
      const response = await axios.get(
        `https://api.worldbank.org/v2/en/country/all/indicator/PA.NUS.PPP?format=json&per_page=20000&source=2&date=${
          year - 5
        }:${year}`,
      );

      const data = getDataFrom(response);
      setPPPLoadDetails((previousPPPLoadDetails: PPPLoadDetails) => ({
        ...previousPPPLoadDetails,
        data,
        isLoading: false,
        loadError: null,
      }));
    } catch {
      setPPPLoadDetails((previousPPPLoadDetails: PPPLoadDetails) => ({
        ...previousPPPLoadDetails,
        isLoading: false,
        loadError: 'Error occurred while loading PPP Details',
      }));
    }
  }, []);

  return {
    ...pppLoadDetails,
    loadPPPDetails,
  };
};

const initialPPPLoadDetails: PPPLoadDetails = {
  data: null,
  isLoading: false,
  loadError: null,
};

const getDataFrom = ({data}: AxiosResponse<PPPDataResponse>): PPPData => {
  const pppCountryResponseDetailsList = data[1];
  const validPPPCountryResponseDetailsList =
    pppCountryResponseDetailsList.filter(
      ({value}: PPPCountryResponseDetails) => value !== null,
    );
  const countryDateAndPPPList = validPPPCountryResponseDetailsList.map(
    ({
      country,
      date,
      value: ppp,
    }: PPPCountryResponseDetails): CountryDateAndPPPListDetails => ({
      country: country.value,
      date,
      ppp,
    }),
  );
  const pppData = countryDateAndPPPList.reduce(
    (
      countryToPPPDetails: CountryToPPPDetails,
      {country, date, ppp}: CountryDateAndPPPListDetails,
    ) => ({
      ...countryToPPPDetails,
      [country]: {
        ...countryToPPPDetails[country],
        [date]: ppp,
      },
    }),
    {} as CountryToPPPDetails,
  );

  return {countryList: Object.keys(pppData), countryToPPPDetails: pppData};
};

type PPPDataResponse = [never, PPPCountryResponseDetails[]];

type PPPCountryResponseDetails = {
  country: {
    id: string;
    value: string;
  };
  date: string;
  value: number | null;
};
