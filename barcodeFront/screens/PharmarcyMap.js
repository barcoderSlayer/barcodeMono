import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Permissions from 'expo-permissions';

const PharmacyMap = () => {
  const [currentRegion, setCurrentRegion] = useState(null);
  const [pharmacies, setPharmacies] = useState([]); // 약국 정보를 담을 상태
  const [permission, setPermission] = useState(null); // 위치 정보 접근 권한 상태

  useEffect(() => {
    // 위치 정보 접근 권한 요청
    const requestLocationPermission = async () => {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      setPermission(status);
    };

    requestLocationPermission();

    // 위치 정보 접근 권한이 허용되었을 때
    if (permission === 'granted') {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setCurrentRegion({
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });

          // 서버에서 약국 정보를 가져옴
          fetch(`http://172.30.1.42:5000/api/pharmacies?lat=${latitude}&lng=${longitude}`)
            .then(response => response.json())
            .then(data => setPharmacies(data))
            .catch(error => console.error(error));
        },
        error => console.log(error),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }
  }, [permission]);

  // 현재 위치 정보가 로딩 중일 때
  if (!currentRegion) {
    return (
      <View style={styles.container}>
        {permission === 'denied' && <Text>Location permission denied</Text>}
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // 지도와 약국 마커를 표시
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={currentRegion}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        {pharmacies.map(pharmacy => (
          <Marker
            key={pharmacy.id}
            coordinate={{
              latitude: parseFloat(pharmacy.latitude),
              longitude: parseFloat(pharmacy.longitude),
            }}
            title={pharmacy.name}
          />
        ))}
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
