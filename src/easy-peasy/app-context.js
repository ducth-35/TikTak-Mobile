import React from "react";
import { useStoreActions, useStoreState } from 'easy-peasy';

const AppStateContext = React.createContext();

export const AppContextProvider = (props) => {
    const {

    } = useStoreActions((actions) => {
        const {

        } = actions;
        return {

        }
    });

    const appState = useStoreState((state) => store.ac)


    return (
        <AppStateContext.Provider
            value={{
                appState
            }}
        >{props.children}</AppStateContext.Provider>
    )
}

export default AppStateContext;
