//stack Navigation
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

//----------page import----------
import Home from '../screens/Home';
import Ranking from '../screens/Ranking';

import Search from '../screens/Search';
import MyPage from '../screens/MyPage';
import Home2 from '../screens/Home2';

//========== Camera ==========
import Camera from '../screens/Camera';
import ProductInformation from '../screens/ProductInformation';



// 모듈 변수 선언
const Stack = createStackNavigator();

const HomeStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name="HomeScreen" component={Home} /> 
            <Stack.Screen name="Home2" component={Home2}/>     
        </Stack.Navigator>
    );
};

const RankingStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='Ranking'>
            <Stack.Screen
                name="RankingScreen"
                component={Ranking}
                options={{
                    title: '랭킹',
                    headerStyle: {
                        backgroundColor: '#ADA4A5', // 헤더의 배경색을 흰색으로 설정
                    },
                    headerTintColor: '#fff', // 헤더의 타이틀 색상을 흰색으로 설정
                    headerTitleStyle: {
                        fontWeight: 'bold', // 필요한 경우 타이틀의 글꼴 스타일 조정
                    },
                }}
            />
        </Stack.Navigator>
    );
};


const CameraStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='Camera'>
            <Stack.Screen name="CameraScreen" component={Camera} />
            <Stack.Screen name="ProductInformationScreen" component={ProductInformation}
                options={{
                    headerShown: false,
                    headerTintColor:"green",
                }}
            />
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