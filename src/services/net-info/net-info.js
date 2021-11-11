import React, { useEffect, useState } from 'react';

import NetInfo from '@react-native-community/netinfo';

const inititalState = {
    type: null,
    effectiveType: null,
}

const useNetInfo = () => {
    const [netInfo, setNetInfo] = useState(inititalState);
    const onChange = (newSate) => {
        setNetInfo(newSate);
    }

    useEffect(() => {
        NetInfo.fetch().then((connectionInfo) => {
            setNetInfo(connectionInfo);
        });
    }, []);

    useEffect(() => {
        const unsubscriber = NetInfo.addEventListener(onChange);
        return () => {
            unsubscriber();
        }
    });

    return netInfo;
}

export default useNetInfo;