import React, { createContext } from 'react';
import useNetInfo from './net-info';

const NetContext = createContext();

export const NetInfoProvider = ({ children }) => {
    const netInfo = useNetInfo();
    return <NetContext.Provider value={netInfo}>{children}</NetContext.Provider>
}

export default NetContext;