import { useContext } from 'react';
import AppStateContext from '@/easy-peasy/app-context';

const useAppContext = () => {
  return useContext(AppStateContext);
};

export default useAppContext;
