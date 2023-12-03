import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HospitalDetails = ({ route }) => {
  // route.params를 통해 병원에 대한 정보를 받아올 수 있습니다.
  const { hospitalData } = route.params;

  return (
    <View style={styles.container}>
      <Text>{hospitalData.name}</Text>
      {/* 병원에 대한 세부 정보 */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HospitalDetails;
