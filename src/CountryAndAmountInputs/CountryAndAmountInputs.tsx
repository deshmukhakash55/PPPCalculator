import React, {useMemo, useState} from 'react';
import {StyleSheet, Text, View, useColorScheme} from 'react-native';
import {Select} from '../components/Select/Select';
import {usePPPData} from '../providers/PPPProvider/PPPProvider';
import {AmountInput} from '../components/AmountInput/AmountInput';
import {TargetAmount} from '../TargetAmount/TargetAmount';

export const CountryAndAmountInputs = () => {
  const [sourceCountry, setSourceCountry] = useState<string | null>(null);
  const [targetCountry, setTargetCountry] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const {data, isLoading, loadError} = usePPPData();
  const theme = useColorScheme();

  const countryOptions = useMemo(
    () =>
      data?.countryList.map((country: string) => ({
        value: country,
        label: country,
      })) ?? [],
    [data],
  );

  const styles = useMemo(() => getStyles(theme ?? 'light'), [theme]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingOrErrorText}>Loading...</Text>
      </View>
    );
  }

  if (loadError) {
    return (
      <View style={styles.container}>
        <Text style={[styles.loadingOrErrorText, styles.error]}>
          Error occurred while loading the PPP information. Please try again
          later
        </Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingOrErrorText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Select
        value={sourceCountry}
        onChange={(value: string) => setSourceCountry(value)}
        options={countryOptions}
        searchPlaceholder="Search country..."
        placeholder="No country selected"
        legend="Source Country"
      />
      <AmountInput
        value={amount}
        onChange={(newAmount: number) => setAmount(newAmount)}
        legend="Amount"
      />
      <Select
        value={targetCountry}
        onChange={(value: string) => setTargetCountry(value)}
        options={countryOptions}
        searchPlaceholder="Search country..."
        placeholder="No country selected"
        legend="Target Country"
      />
      <TargetAmount
        sourceCountry={sourceCountry}
        targetCountry={targetCountry}
        amount={amount}
      />
    </View>
  );
};

const getStyles = (theme: 'light' | 'dark') =>
  StyleSheet.create({
    container: {
      flex: 1,
      gap: 24,
      padding: 16,
      paddingTop: 32,
      backgroundColor: theme === 'dark' ? '#343434' : '#fff',
    },
    loadingOrErrorText: {
      alignSelf: 'center',
      marginVertical: 'auto',
    },
    error: {
      color: theme === 'light' ? '#bc3434' : '#ed2424',
    },
  });
