import {BottomSheetProps} from '@gorhom/bottom-sheet';
import React, {createContext, useContext, useState} from 'react';

const initialBottomSheetContentsContextState: BottomSheetContentsContextState =
  {
    sheetProps: {} as BottomSheetProps,
    setSheetProps: (_: BottomSheetProps) => {},
  };

const BottomSheetContentsContext =
  createContext<BottomSheetContentsContextState>(
    initialBottomSheetContentsContextState,
  );

type BottomSheetContentsProviderProps = {
  children?: React.ReactNode;
};

export const BottomSheetContentsProvider = ({
  children,
}: BottomSheetContentsProviderProps) => {
  const [sheetProps, setSheetProps] = useState<BottomSheetProps>(
    {} as BottomSheetProps,
  );

  return (
    <BottomSheetContentsContext.Provider
      value={{
        setSheetProps,
        sheetProps,
      }}>
      {children}
    </BottomSheetContentsContext.Provider>
  );
};

export const useBottomSheetContents = () => {
  const {sheetProps, setSheetProps} = useContext(BottomSheetContentsContext);

  return {sheetProps, setSheetProps};
};

type BottomSheetContentsContextState = {
  sheetProps: BottomSheetProps;
  setSheetProps: (props: BottomSheetProps) => void;
};
