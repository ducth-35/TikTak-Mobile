import React, { useContext } from 'react';
import { LocaleContext } from '@/i18n';

const useTranslation = (props) => {
  return useContext(LocaleContext);
};

export default useTranslation;
