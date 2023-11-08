import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from "@react-navigation/native";


export default function Home() {

  const navigation = useNavigation();

return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button title='gogohome2' onPress={() => {
        navigation.navigate("Home2",{screen:'Home2'})
      }}></Button>
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
