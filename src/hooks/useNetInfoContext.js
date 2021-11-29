import NetContext from '../services/net-info/context';
import { useContext } from 'react';

const useNetInfoContext = (props) => {
  return useContext(NetContext);
};

export default useNetInfoContext;
