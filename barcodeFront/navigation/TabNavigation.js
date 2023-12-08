// 하단바 naviagtion
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Ionicons 임포트

// stack import
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
        <NavigationContainer>
            <Tab.Navigator 
                backBehavior='history' 
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === 'Home') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Ranking') {
                            iconName = focused ? 'podium' : 'podium-outline';
                        } else if (route.name === 'Camera') {
                            iconName = focused ? 'camera' : 'camera-outline';
                        } else if (route.name === 'Search') {
                            iconName = focused ? 'search' : 'search-outline';
                        } else if (route.name === 'MyPage') {
                            iconName = focused ? 'person' : 'person-outline';
                        }
                        // Ionicons 아이콘 반환
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    headerShown: false
                })}
            >
                <Tab.Screen name="Home" component={HomeStackNavigator} />
                <Tab.Screen name="Ranking" component={RankingStackNavigator} />
                <Tab.Screen name="Camera" component={CameraStackNavigator} />
                <Tab.Screen name="Search" component={SearchStackNavigator} />
                <Tab.Screen name="MyPage" component={MyPageStackNavigator} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default TabNavigation;
