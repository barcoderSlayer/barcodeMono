// stack Navigation
import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';

//----------page import----------
import LanguageSelectionScreen from '../screens/LanguageSelectionScreen'; // 언어 선택 화면
import Home from '../screens/Home';
import Ranking from '../screens/Ranking';
import Camera from '../screens/Camera';
import Search from '../screens/Search';
import MyPage from '../screens/MyPage';
import Home2 from '../screens/Home2';

// 모듈 변수 선언
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="LanguageSelection" 
        component={LanguageSelectionScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Home2" component={Home2} />
      <Stack.Screen name="Ranking" component={Ranking} />
      <Stack.Screen name="Camera" component={Camera} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="MyPage" component={MyPage} />
    </Stack.Navigator>
  );
};

export default function App() {
  useEffect(() => {
    // AsyncStorage에서 저장된 언어를 확인합니다.
    const checkLanguageSetting = async () => {
      const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
      // 저장된 언어 설정이 있다면, LanguageSelectionScreen을 건너뛰고 Home 화면으로 이동합니다.
      if (savedLanguage) {
        navigationRef.current?.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      }
    };

    checkLanguageSetting();
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}