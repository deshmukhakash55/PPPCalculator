import React, {createContext, useContext, useEffect} from 'react';
import {usePPP} from '../../hooks/usePPP/usePPP';
import {PPPLoadDetails} from '../../types/types';

type PPPProviderProps = {
  children?: React.ReactNode;
};

const PPPContext = createContext<PPPLoadDetails | null>(null);

export const PPPProvider = ({children}: PPPProviderProps) => {
  const {data, isLoading, loadError, loadPPPDetails} = usePPP();

  useEffect(() => {
    loadPPPDetails();
  }, [loadPPPDetails]);

  return (
    <PPPContext.Provider value={{data, isLoading, loadError}}>
      {children}
    </PPPContext.Provider>
  );
};

export const usePPPData = () => {
  const pppData = useContext(PPPContext);

  if (!pppData) {
    throw 'Error loading PPP Data';
  }

  return pppData;
};
