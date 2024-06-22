import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from 'react';
import {StyleSheet, View, useColorScheme} from 'react-native';
import {useBottomSheetContents} from '../BottomSheetContentsProvider/BottomSheetContentsProvider';

type BottomSheetProviderProps = {
  children?: React.ReactNode;
};

const initialBottomSheetProvider = {
  open: () => {},
  close: () => {},
};

const BottomSheetContext = createContext<BottomSheetProviderState>(
  initialBottomSheetProvider,
);

export const BottomSheetProvider = ({children}: BottomSheetProviderProps) => {
  const {sheetProps} = useBottomSheetContents();
  const bottomSheetRef = useRef<BottomSheet | null>(null);
  const theme = useColorScheme();

  const open = useCallback(() => bottomSheetRef.current?.expand(), []);
  const close = useCallback(() => bottomSheetRef.current?.close(), []);

  const styles = useMemo(() => getStyles(theme ?? 'light'), [theme]);

  return (
    <BottomSheetContext.Provider value={{open, close}}>
      <View style={styles.container}>
        {children}
        <BottomSheet
          enablePanDownToClose
          snapPoints={['50%']}
          backdropComponent={Backdrop}
          index={-1}
          {...sheetProps}
          ref={bottomSheetRef}
          backgroundStyle={styles.bottomSheetBackground}
        />
      </View>
    </BottomSheetContext.Provider>
  );
};

const Backdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop {...props} appearsOnIndex={1} disappearsOnIndex={-1} />
);

export const useBottomSheet = () => {
  const bottomSheet = useContext(BottomSheetContext);

  if (!bottomSheet) {
    throw 'useBottomSheet should be used within BottomSheetContext';
  }

  return bottomSheet;
};

const getStyles = (theme: 'light' | 'dark') =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    bottomSheetBackground: {
      backgroundColor: theme === 'light' ? 'white' : '#343434',
    },
  });

type BottomSheetProviderState = {
  open: () => void;
  close: () => void;
};
