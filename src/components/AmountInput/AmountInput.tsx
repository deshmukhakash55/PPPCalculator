import React, {useMemo, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  useColorScheme,
} from 'react-native';

type AmountInputProps = {
  value: number;
  onChange: (amount: number) => void;
  legend?: string;
};

export const AmountInput = ({value, onChange, legend}: AmountInputProps) => {
  const [amount, setAmount] = useState<string>(value.toString());
  const theme = useColorScheme();

  const onChangeText = (newAmount: string) => {
    const numberAmount = parseInt(newAmount, 10);
    setAmount(newAmount);
    onChange(numberAmount);
  };

  const styles = useMemo(() => getStyles(theme ?? 'light'), [theme]);

  return (
    <View style={styles.container}>
      {legend && <Text style={styles.legend}>{legend}</Text>}
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const getStyles = (theme: 'light' | 'dark') =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: '100%',
      gap: 8,
      paddingVertical: Platform.OS === 'ios' ? 10 : 0,
      paddingHorizontal: 12,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: theme === 'light' ? '#797979' : '#fff',
      position: 'relative',
    },
    legend: {
      position: 'absolute',
      top: -10,
      left: 8,
      paddingHorizontal: 4,
      backgroundColor: theme === 'light' ? 'white' : '#343434',
      color: theme === 'light' ? '#6e6e6e' : '#fff',
    },
    input: {
      width: '100%',
    },
  });
