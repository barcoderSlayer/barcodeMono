import { StatusBar } from 'expo-status-bar';

import React, { useState, useEffect } from 'react';

import { Button, StyleSheet, Text, View,Image } from 'react-native';

import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";

import axios from 'axios';



export default function ProductInformation({ route }) {

    const [imgUrl,setImgUrl]= useState({});
    const [productNameEn,setProductNameEn]= useState({}); //영어 상품이름

    const navigation = useNavigation();
    const {barcodeData} = route.params;




    useEffect(()=>{
        setImgUrl({url:"https://reactnative.dev/img/tiny_logo.png"}); //이미지 url 세팅

        //get요청
        const fetchData = async () => {
            try {
                const respose = await axios.get('http://localhost:3000');
                setProductNameEn(respose.data);
            }catch(error){
                console.error('Error fetching data, error');
            }
        }
        fetchData();
    },[]);

    console.log("barcodeData = ", barcodeData);









return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri:"https://reactnative.dev/img/tiny_logo.png"}}/>
        </View>
        <Text>{barcodeData}</Text>
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
    flex:1,
    borderBottomWidth:1,
    borderBottomColor:'red',
},

image:{
    width:100,
    height:100,
}

});
