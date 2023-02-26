import React, { FC, createContext, ReactNode, ReactElement } from 'react';
import {RootStore} from '../stores/RootStore';

export const StoreContext = createContext<RootStore>({} as RootStore);

export type StoreComponent = FC<{
  store: RootStore;
  children: ReactNode;
}>;

export const StoreProvider: StoreComponent = ({
  children,
  store
}): ReactElement => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  )
}

export const useStore = () => React.useContext(StoreContext);