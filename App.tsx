import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PPPProvider} from './src/providers/PPPProvider/PPPProvider';
import {CountryAndAmountInputs} from './src/CountryAndAmountInputs/CountryAndAmountInputs';
import {BottomSheetContentsProvider} from './src/providers/BottomSheetContentsProvider/BottomSheetContentsProvider';
import {BottomSheetProvider} from './src/providers/BottomSheetProvider/BottomSheetProvider';

function App(): React.JSX.Element {
  return (
    <PPPProvider>
      <GestureHandlerRootView style={styles.container}>
        <BottomSheetContentsProvider>
          <BottomSheetProvider>
            <SafeAreaView style={styles.container}>
              <ScrollView contentContainerStyle={styles.container}>
                <CountryAndAmountInputs />
              </ScrollView>
            </SafeAreaView>
          </BottomSheetProvider>
        </BottomSheetContentsProvider>
      </GestureHandlerRootView>
    </PPPProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
