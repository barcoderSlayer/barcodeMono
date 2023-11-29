import React from 'react';
import { WebView } from 'react-native-webview';

const HospitalMapScreen = () => {
    return (
        <WebView
            source={{ uri: '.screens/map.html' }}
            style={{ flex: 1 }}
        />
    );
};

export default HospitalMapScreen;
