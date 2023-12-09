import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const HospitalMap = () => {
  const [currentRegion, setCurrentRegion] = useState(null);
  const [hospitals, setHospitals] = useState([]);
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

      fetch('http://172.30.1.55:4000/api/hospitals')
        .then(response => response.json())
        .then(data => {
          console.log('Hospitals data:', data);
          setHospitals(data);
        })
        .catch(error => {
          console.error('Error fetching hospitals:', error);
          setErrorMsg('Error fetching hospitals');
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
        {hospitals.slice(0, 100).map((hospital, index) => {
          const latitude = parseFloat(hospital.latitude);
          const longitude = parseFloat(hospital.longitude);
          if (!latitude || !longitude) {
            console.error('Invalid lat or lng:', hospital);
            return null;
          }

          return (
            <Marker
              key={hospital.hospitalID.toString()}
              coordinate={{ latitude, longitude }}
              title={hospital.name}
              description={hospital.address}
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

export default HospitalMap;
