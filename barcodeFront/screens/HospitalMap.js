// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import * as Permissions from 'expo-permissions';

// const HospitalMap = () => {
//   const [currentRegion, setCurrentRegion] = useState(null);
//   const [hospitals, setHospitals] = useState([]);
//   const [permission, setPermission] = useState(null);

//   useEffect(() => {
//     // 위치 정보 접근 권한 요청
//     const requestLocationPermission = async () => {
//       const { status } = await Permissions.askAsync(Permissions.LOCATION);
//       setPermission(status);
//     };

//     requestLocationPermission();

//     if (permission === 'granted') {
//       navigator.geolocation.getCurrentPosition(
//         position => {
//           const { latitude, longitude } = position.coords;
//           setCurrentRegion({
//             latitude,
//             longitude,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           });

//           fetch(`http://172.30.1.41:4000/api/hospitals?lat=${latitude}&lng=${longitude}`)
//   .then(response => response.json())
//   .then(data => setHospitals(data))
//   .catch(error => console.error(error));
//         },
//         error => console.log(error),
//         { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//       );
//     }
//   }, [permission]);

//   if (!currentRegion) {
//     return (
//       <View style={styles.container}>
//         {permission === 'denied' && <Text>Location permission denied</Text>}
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         region={currentRegion}
//         showsUserLocation={true}
//         followsUserLocation={true}
//       >
//         {hospitals.map(hospital => (
//           <Marker
//             key={hospital.id}
//             coordinate={{
//               latitude: parseFloat(hospital.latitude),
//               longitude: parseFloat(hospital.longitude),
//             }}
//             title={hospital.name}
//           />
//         ))}
//       </MapView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   map: {
//     width: '100%',
//     height: '100%',
//   },
// });

// export default HospitalMap;

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

      fetch(`http://172.30.1.42:4000/api/hospitals?lat=${location.coords.latitude}&lng=${location.coords.longitude}`)
        .then(response => response.json())
        .then(data => setHospitals(data))
        .catch(error => console.error(error));
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
        region={currentRegion}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        {hospitals.map(hospital => (
          <Marker
            key={hospital.id}
            coordinate={{
              latitude: parseFloat(hospital.latitude),
              longitude: parseFloat(hospital.longitude),
            }}
            title={hospital.name}
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

export default HospitalMap;
