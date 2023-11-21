import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import Geolocation from 'react-native-geolocation-service';

const HospitalMap = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  const mapUrl = location
    ? `https://map.naver.com/v5/api/instant/search?lang=ko&caller=pcweb&types=place,address,bus&coords=${location.latitude},${location.longitude}&key=hjyyov2t3t`
    : '';

  return (
    <View style={styles.container}>
      {location ? (
        <View style={styles.mapContainer}>
          <WebView style={styles.map} source={{ uri: mapUrl }} />
          <View style={styles.markerFixed}>
            <Image style={styles.marker} source={require('path/to/marker-icon.png')} />
          </View>
        </View>
      ) : (
        <Text>위치 정보를 가져오는 중...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%'
  },
  marker: {
    height: 48,
    width: 48
  }
});

export default HospitalMap;
