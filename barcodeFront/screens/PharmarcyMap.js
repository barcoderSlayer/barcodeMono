import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const PharmacyMap = () => {
  const [currentRegion, setCurrentRegion] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      fetch(`${config.LOCALHOST_IP}/api/pharmacies`)
        .then(response => response.json())
        .then(data => {
          console.log('Pharmacies data:', data);
          setPharmacies(data); // 함수명을 올바르게 수정
        })
        .catch(error => {
          console.error('Error fetching pharmacies:', error);
          setErrorMsg('Error fetching pharmacies');
        });
    })();
  }, []);

  if (!currentRegion) {
    return (
      <View style={styles.container}>
        {errorMsg ? <Text>{errorMsg}</Text> : <ActivityIndicator size="large" />}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={currentRegion}
        showsUserLocation={true}
      >
        {pharmacies.slice(0, 100).map((pharmacy, index) => { // 변수명을 소문자로 수정
          const latitude = parseFloat(pharmacy.latitude);
          const longitude = parseFloat(pharmacy.longitude);
          if (!latitude || !longitude) {
            console.error('Invalid lat or lng:', pharmacy);
            return null;
          }

          return (
            <Marker
              key={pharmacy.pharmacyID.toString()} // 속성 이름을 소문자로 수정 (가정)
              coordinate={{ latitude, longitude }}
              title={pharmacy.name}
              description={pharmacy.address}
            />
          );
        })}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default PharmacyMap;
