import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from "@react-navigation/native";


export default function ProductInformation({ route }) {

  const navigation = useNavigation();
  const {barcodeData} = route.params;

  console.log("barcodeData = ", barcodeData);

return (
    <View style={styles.container}>
      <Text>{barcodeData}</Text>

      
    </View>
);
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
},
});
