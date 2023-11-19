//stack Navigation
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

//----------page import----------

import Home from '../screens/Home';
import Ranking from '../screens/Ranking';
import Camera from '../screens/Camera';
import Search from '../screens/Search';
import MyPage from '../screens/MyPage';
import Home2 from '../screens/Home2';
import HospitalTips from '../screens/HospitalTips';
import PharmaceuticalTips from '../screens/PharmaceuticalTips';
import ConvenienceTip from '../screens/ConvenienceTip';

// 모듈 변수 선언
const Stack = createStackNavigator();

const HomeStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name="HomeScreen" component={Home} />
            <Stack.Screen name="Home2" component={Home2}/>
            <Stack.Screen name="HospitalTips" component={HospitalTips} />
            <Stack.Screen name="PharmaceuticalTips" component={PharmaceuticalTips} />
            <Stack.Screen name="ConvenienceTip" component={ConvenienceTip} />
        </Stack.Navigator>
        
    );
};

const RankingStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='Ranking' > 
            <Stack.Screen name="RankingScreen" component={Ranking} />
        </Stack.Navigator>
    );
};

const CameraStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='Camera'>
            <Stack.Screen name="CameraScreen" component={Camera} />
        </Stack.Navigator>
    )
}

const SearchStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='Search'>
            <Stack.Screen name="SearchScreen" component={Search} />
        </Stack.Navigator>
    )
}

const MyPageStackNavigator = ({ navigation, route }) => {
    // 하단 탭바 제거
    React.useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === 'MyPage') {
            navigation.setOptions({ tabBarStyle: { display: undefined } });
        } else {
            navigation.setOptions({ tabBarStyle: { display: 'none' } }, { screenOptions: { headerShown: false } });
        }
    }, [navigation, route]);
    return (
        <Stack.Navigator initialRouteName='MyPage'>
            <Stack.Screen name="MyPageScreen" component={MyPage} />
        </Stack.Navigator>
    );
};
export { HomeStackNavigator, RankingStackNavigator, CameraStackNavigator, SearchStackNavigator, MyPageStackNavigator };