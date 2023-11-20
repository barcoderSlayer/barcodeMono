import { StatusBar } from 'expo-status-bar';

import React, { useState, useEffect } from 'react';

import { Button, StyleSheet, Text, View,Image } from 'react-native';

import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";

import axios from 'axios';



export default function ProductInformation({ route }) {


    const [imgUrl,setImgUrl]= useState({});
    const [productData, setProductData]= useState({}); //영어 상품이름
    

    const navigation = useNavigation();
    const {barcodeData} = route.params;



    useEffect(()=>{
        setImgUrl({url:"https://reactnative.dev/img/tiny_logo.png"}); //이미지 url 세팅
        console.log("barcodeData = ", barcodeData);
        getData();

    },[]);

    // data get요청
    const getData = async() =>{
        const response = await axios.get('http://localhost:3000/')
        .then(function (response) {
            console.log(response.data);

        })
        .catch(function (error){
            console.log(error);
        });
    }

    const handlePress = () => {
        console.log("버튼 클릭 했네요 요청하겠습니다.")
        getData();
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri:"https://reactnative.dev/img/tiny_logo.png"}}/>
            </View>
            <Text>{barcodeData}</Text>
            <Button title="click get object start" onPress={handlePress}/>
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
    imageContainer:{
        // flex:1,
        borderBottomWidth:1,
        borderBottomColor:'red',
    },

    image:{
        width:100,
        height:100,
    }
});
