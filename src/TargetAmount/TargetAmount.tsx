import React, {useMemo} from 'react';
import {Text, View} from 'react-native';
import {usePPPData} from '../providers/PPPProvider/PPPProvider';
import {PPPData} from '../types/types';

type TargetAmountProps = {
  sourceCountry: string | null;
  targetCountry: string | null;
  amount: number;
};

export const TargetAmount = ({
  sourceCountry,
  targetCountry,
  amount,
}: TargetAmountProps) => {
  const {data} = usePPPData();

  const targetAmount = useMemo(
    () => getTargetAmount(sourceCountry, targetCountry, amount, data),
    [sourceCountry, targetCountry, amount, data],
  );

  if (!data || !sourceCountry || !targetCountry) {
    return null;
  }

  return (
    <View>
      <Text>
        You require {targetAmount.toFixed(2)} in {targetCountry}'s local
        currency to live a similar quality of life as you would with {amount} in{' '}
        {sourceCountry}'s local currency.
      </Text>
    </View>
  );
};

const getTargetAmount = (
  sourceCountry: string | null,
  targetCountry: string | null,
  amount: number,
  pppData: PPPData | null,
) => {
  if (!pppData || !sourceCountry || !targetCountry) {
    return -1;
  }

  const sourceCountryPPPData = pppData.countryToPPPDetails[sourceCountry];
  const targetCountryPPPData = pppData.countryToPPPDetails[targetCountry];

  const sourcePPP =
    sourceCountryPPPData[
      Math.max(...Object.keys(sourceCountryPPPData).map(x => parseInt(x, 10)))
    ] ?? 0;
  const targetPPP =
    targetCountryPPPData[
      Math.max(...Object.keys(targetCountryPPPData).map(x => parseInt(x, 10)))
    ] ?? 0;

  const targetAmount = (amount / sourcePPP) * targetPPP;

  return targetAmount;
};
