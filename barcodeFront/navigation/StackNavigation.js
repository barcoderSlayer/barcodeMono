//stack Navigation
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 스크린 컴포넌트 임포트
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';


//----------page import----------

//=========== Home ============= 
import Home from '../screens/Home';
import HospitalTips from '../screens/HospitalTips'
import HospitalMap from '../screens/HospitalMap'
import PharmaceuticalTips from '../screens/PharmaceuticalTips'
import PharmarcyMap from '../screens/PharmarcyMap'
import ConvenienceTip from '../screens/ConvenienceTip'
import LanguageSelectionScreen from '../screens/LanguageSelectionScreen';
import Ranking from '../screens/Ranking';
import Search from '../screens/Search';



//========== Camera ==========
import Camera from '../screens/Camera';
import ProductInformation from '../screens/ProductInformation';
import ProductScan from '../screens/ProductScan';

//========== MyPage ==========
import MyPage from '../screens/MyPage';
import Contacting from '../screens/Contacting';
import AnswerCheck from '../screens/AnswerCheck';
import DetailedCheck from '../screens/DetailedCheck';
import LanguageModi from '../screens/LanguageModi';


// 모듈 변수 선언
const Stack = createStackNavigator();

const HomeStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen 
                name="HomeScreen" 
                component={Home} 
                options={{
                    title: '홈',
                    headerStyle: {
                        backgroundColor: '#ADA4A5', // 헤더의 배경색을 흰색으로 설정
                    },
                    headerTintColor: '#fff', // 헤더의 타이틀 색상을 흰색으로 설정
                    headerTitleStyle: {
                        fontWeight: 'bold', // 필요한 경우 타이틀의 글꼴 스타일 조정
                    },
                }}
            />  
            <Stack.Screen 
                name="HospitalTips" 
                component={HospitalTips}
                options={{
                    title: '병원팁',
                    headerStyle: {
                        backgroundColor: '#ADA4A5', // 헤더의 배경색을 흰색으로 설정
                    },
                    headerTintColor: '#fff', // 헤더의 타이틀 색상을 흰색으로 설정
                    headerTitleStyle: {
                        fontWeight: 'bold', // 필요한 경우 타이틀의 글꼴 스타일 조정
                    },
                }}
            />
            <Stack.Screen 
                name="HospitalMap" 
                component={HospitalMap}
                options={{
                    title: '병원',
                    headerStyle: {
                        backgroundColor: '#ADA4A5', // 헤더의 배경색을 흰색으로 설정
                    },
                    headerTintColor: '#fff', // 헤더의 타이틀 색상을 흰색으로 설정
                    headerTitleStyle: {
                        fontWeight: 'bold', // 필요한 경우 타이틀의 글꼴 스타일 조정
                    },
                }}
            />
            <Stack.Screen 
                name="PharmaceuticalTips" 
                component={PharmaceuticalTips}
                options={{
                    title: '의약품팁',
                    headerStyle: {
                        backgroundColor: '#ADA4A5', // 헤더의 배경색을 흰색으로 설정
                    },
                    headerTintColor: '#fff', // 헤더의 타이틀 색상을 흰색으로 설정
                    headerTitleStyle: {
                        fontWeight: 'bold', // 필요한 경우 타이틀의 글꼴 스타일 조정
                    },
                }}
            />
            <Stack.Screen 
                name="PharmarcyMap" 
                component={PharmarcyMap}
                options={{
                    title: '약국',
                    headerStyle: {
                        backgroundColor: '#ADA4A5', // 헤더의 배경색을 흰색으로 설정
                    },
                    headerTintColor: '#fff', // 헤더의 타이틀 색상을 흰색으로 설정
                    headerTitleStyle: {
                        fontWeight: 'bold', // 필요한 경우 타이틀의 글꼴 스타일 조정
                    },
                }}
            />
            <Stack.Screen 
                name="ConvenienceTip" 
                component={ConvenienceTip}
                options={{
                    title: '편의점팁',
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
            <Stack.Screen name="ProductInformationScreen" component={ProductInformation}
                options={{
                    headerShown: false,
                    headerTintColor:"green",
                }}
            />
        </Stack.Navigator>
        
    );
};


const CameraStackNavigator = () => { 
    return (
        <Stack.Navigator initialRouteName='ProductScanScreen'>
            <Stack.Screen name="CameraScreen" component={Camera} 
            options={{
                    headerShown: false,
                    headerTintColor:"green",
                }}/>
            <Stack.Screen name="ProductInformationScreen" component={ProductInformation}
                options={{
                    headerShown: false,
                    headerTintColor:"green",
                }}
            />
            <Stack.Screen name="ProductScanScreen" component={ProductScan} 
            options={{
                    headerShown: false,
                    headerTintColor:"green",
                }}/>
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
    // React.useLayoutEffect(() => {
    //     const routeName = getFocusedRouteNameFromRoute(route);
    //     if (routeName === 'MyPage') {
    //         navigation.setOptions({ tabBarStyle: { display: undefined } });
    //     } else {
    //         navigation.setOptions({ tabBarStyle: { display: 'none' } }, { screenOptions: { headerShown: false } });
    //     }
    // }, [navigation, route]);
    return (
        <Stack.Navigator initialRouteName='MyPage'>
            <Stack.Screen
                name="MyPageScreen"
                component={MyPage}
                options={{
                    title: 'MyPage',
                    headerStyle: {
                        backgroundColor: '#ADA4A5', 
                    },
                    headerTintColor: '#fff', 
                    headerTitleStyle: {
                        fontWeight: 'bold', 
                    },
                }}
            />
            <Stack.Screen
                name="Contacting"
                component={Contacting}
                options={{
                    title: 'Contacting',
                    headerStyle: {
                        backgroundColor: '#ADA4A5', 
                    },
                    headerTintColor: '#fff', 
                    headerTitleStyle: {
                        fontWeight: 'bold', 
                    },
                }}
            />
            <Stack.Screen
                name="AnswerCheck"
                component={AnswerCheck}
                options={{
                    title: 'AnswerCheck',
                    headerStyle: {
                        backgroundColor: '#ADA4A5', 
                    },
                    headerTintColor: '#fff', 
                    headerTitleStyle: {
                        fontWeight: 'bold', 
                    },
                }}
            />
            <Stack.Screen
                name="DetailedCheck"
                component={DetailedCheck}
                options={{
                    title: 'DetailedCheck',
                    headerStyle: {
                        backgroundColor: '#ADA4A5', 
                    },
                    headerTintColor: '#fff', 
                    headerTitleStyle: {
                        fontWeight: 'bold', 
                    },
                }}
            />
            <Stack.Screen
                name="LanguageModiScreen"
                component={LanguageModi}
                options={{
                    title: 'DetailedCheck',
                    headerStyle: {
                        backgroundColor: '#ADA4A5', 
                    },
                    headerTintColor: '#fff', 
                    headerTitleStyle: {
                        fontWeight: 'bold', 
                    },
                }}
            />
        </Stack.Navigator>
        
        
        
    );
    
    
};
export { HomeStackNavigator, RankingStackNavigator, CameraStackNavigator, SearchStackNavigator, MyPageStackNavigator };