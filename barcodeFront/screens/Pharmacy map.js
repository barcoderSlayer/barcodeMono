import React from 'react';
import { WebView } from 'react-native-webview';

const PharmacyMap = () => {
    return (
        <WebView
            source={{ uri: '.screens/Phmap.html' }}
            style={{ flex: 1 }}
        />
    );
};

export default PharmacyMap;