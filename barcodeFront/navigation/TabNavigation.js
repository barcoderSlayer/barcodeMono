// 하단바 naviagtion
import React from 'react';
//navigation import
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//stack import
import {
    HomeStackNavigator,
    RankingStackNavigator,
    CameraStackNavigator,
    SearchStackNavigator,
    MyPageStackNavigator
} from './StackNavigation';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <>
            <NavigationContainer >
                <Tab.Navigator backBehavior='history' screenOptions={{ headerShown: false }}>
                    <Tab.Screen name="Home" component={HomeStackNavigator} />
                    <Tab.Screen name="Ranking" component={RankingStackNavigator} />
                    <Tab.Screen name="Camera" component={CameraStackNavigator} />
                    <Tab.Screen name="Search" component={SearchStackNavigator} />
                    <Tab.Screen name="MyPage" component={MyPageStackNavigator} />
                </Tab.Navigator>
            </NavigationContainer>
        </>
    );
};

export default TabNavigation;