import React from 'react';

import './i18n';
import I18n from 'i18n-js';
import { useStorage } from './useStorage';
import { LOCALES } from '../common';
import TranslateOrFallback from './translate-fallback';

const LocalContext = React.createContext();

export const LocaleContextProvider = (props) => {
    const [locale, changeLocale] = useStorage('@language', LOCALES.VIETNAMESE);
    I18n.locale = locale.name;

    const _changeLocale = (locale) => {
        I18n.locale = locale.name;
        changeLocale(locale);
    };

    return (
        <LocalContext.Provider
            value={{
                ...I18n,
                localeProvider: locale,
                t: TranslateOrFallback,
                changeLocale: _changeLocale
            }}
        >
            {props.children}
        </LocalContext.Provider>
    )
}

export default LocalContext;
