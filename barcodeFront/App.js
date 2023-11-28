import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import TabNavigation from './navigation/TabNavigation';
import HospitalMap from './screens/HospitalMap';

export default function App() {
  return (
    <>
        <HospitalMap/>
        {/* <TabNavigation /> */}
    </>
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

