import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 스크린 컴포넌트 임포트
import LanguageSelectionScreen from './screens/LanguageSelectionScreen';
import Home from './screens/Home';
import Ranking from './screens/Ranking';
import Camera from './screens/Camera';
import Search from './screens/Search';
import MyPage from './screens/MyPage';
import Home2 from './screens/Home2';

const Stack = createStackNavigator();

function App() {
  const [isLanguageSelected, setIsLanguageSelected] = useState(false);

  useEffect(() => {
    const checkLanguageSetting = async () => {
      const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
      setIsLanguageSelected(!!savedLanguage);
    };

    checkLanguageSetting();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLanguageSelected ? (
          <Stack.Screen
            name="LanguageSelection"
            component={LanguageSelectionScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Home2" component={Home2} />
            <Stack.Screen name="Ranking" component={Ranking} />
            <Stack.Screen name="Camera" component={Camera} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="MyPage" component={MyPage} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
