import { createContext, useContext } from 'react';

export const ReadOnlyContext = createContext(false);

export const useIsReadOnly = () => useContext(ReadOnlyContext);
