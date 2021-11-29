import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { Colors } from '@/themes';

export function StatusBarAll() {
    return (
        <StatusBar
            animated={true}
            backgroundColor={'#212529'}
            barStyle='light-content'
            showHideTransition={'fade'} />
    );
}
