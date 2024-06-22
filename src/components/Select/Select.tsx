import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {BottomSheetScrollView, BottomSheetView} from '@gorhom/bottom-sheet';
import SearchIcon from '../../../assets/icons/search.svg';
import {
  BottomSheetContents,
  BottomSheetContentsMethods,
} from '../BottomSheetContents/BottomSheetContents';

type SelectProps<T> = {
  options: Option<T>[];
  value: T | null;
  onChange: (newValue: T) => void;
  searchPlaceholder?: string;
  placeholder?: string;
  legend?: string;
};

export const Select = <T,>({
  value,
  onChange,
  options,
  searchPlaceholder = 'Search option...',
  placeholder = 'No option selected',
  legend,
}: SelectProps<T>) => {
  const [searchText, setSearchText] = useState<string>('');
  const bottomSheetRef = useRef<BottomSheetContentsMethods>(null);
  const theme = useColorScheme();

  const onSelect = (selectedValue: T) => {
    onChange(selectedValue);
    setSearchText('');
    bottomSheetRef.current?.close();
  };

  const optionList = useMemo(
    () =>
      options.filter(({label}: Option<T>) =>
        label.toLowerCase().startsWith(searchText.toLowerCase()),
      ),
    [options, searchText],
  );

  const selectedOption = useMemo(
    () =>
      options.find(({value: optionValue}: Option<T>) => value === optionValue),
    [value, options],
  );

  const onSheetChange = useCallback((index: number) => {
    if (index === -1) {
      setSearchText('');
    }
  }, []);

  const styles = useMemo(() => getStyles(theme ?? 'light'), [theme]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.trigger}
        activeOpacity={1}
        onPress={() => bottomSheetRef.current?.open()}>
        {legend && <Text style={styles.triggerLegend}>{legend}</Text>}
        <Text>{selectedOption?.label ?? placeholder}</Text>
      </TouchableOpacity>
      <BottomSheetContents ref={bottomSheetRef} onChange={onSheetChange}>
        <BottomSheetView style={styles.search}>
          <View style={styles.searchContainer}>
            <SearchIcon />
            <TextInput
              value={searchText}
              onChangeText={(newSearchText: string) =>
                setSearchText(newSearchText)
              }
              placeholder={searchPlaceholder}
            />
          </View>
        </BottomSheetView>
        <BottomSheetScrollView style={styles.options}>
          {optionList.map(
            ({value: optionValue, label}: Option<T>, index: number) => (
              <TouchableOpacity
                style={[
                  styles.option,
                  value === optionValue ? styles.selectedOption : undefined,
                ]}
                key={index}
                onPress={() => onSelect(optionValue)}>
                <Text style={styles.optionText}>{label}</Text>
              </TouchableOpacity>
            ),
          )}
        </BottomSheetScrollView>
      </BottomSheetContents>
    </View>
  );
};

const getStyles = (theme: 'light' | 'dark') =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    trigger: {
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: theme === 'light' ? '#797979' : '#ffffff',
      width: '100%',
      position: 'relative',
    },
    triggerLegend: {
      position: 'absolute',
      top: -10,
      left: 8,
      backgroundColor: theme === 'light' ? 'white' : '#343434',
      paddingHorizontal: 4,
      color: theme === 'light' ? '#6e6e6e' : '#ffffff',
    },
    options: {
      flex: 1,
      paddingTop: 4,
      paddingBottom: 16,
      paddingHorizontal: 16,
    },
    selectedOption: {
      backgroundColor: '#dbd2f4',
    },
    option: {
      width: '100%',
      borderRadius: 4,
      padding: 8,
    },
    optionText: {
      fontSize: 16,
    },
    search: {
      paddingTop: 8,
      paddingBottom: 12,
      paddingHorizontal: 16,
    },
    searchContainer: {
      paddingVertical: Platform.OS === 'ios' ? 10 : 0,
      paddingHorizontal: 12,
      borderRadius: 24,
      borderWidth: 2,
      borderColor: theme === 'light' ? '#797979' : '#ffffff',
      marginBottom: 8,
      flexDirection: 'row',
      gap: 8,
      alignItems: 'center',
    },
  });

type Option<T> = {
  value: T;
  label: string;
};
