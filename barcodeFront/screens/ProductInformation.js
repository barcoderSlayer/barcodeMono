import React, { useState, useEffect } from 'react';

import { Button, StyleSheet, Text, View, Image, Dimensions, ScrollView, Modal, Pressable, TouchableHighlight } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import Constants from 'expo-constants';

const { width, height } = Dimensions.get('window');

export default function ProductInformation({ route }) {
    const [imgUrl, setImgUrl] = useState("");
    const [productData, setProductData] = useState({});

    const [productName, setProductName] = useState();
    const [productDivision, setProductDivision] = useState();
    const [modalVisible, setModalVisible] = useState(false);

    const navigation = useNavigation();
    const { barcodeData } = route.params;

    useEffect(() => {
        setImgUrl({ url: "https://reactnative.dev/img/tiny_logo.png" });
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await axios.get(`http://192.168.0.41:3000/barcodePage/?barcodeData=${barcodeData}`);
            setProductData(response.data);
            setProductName(response.data[0].productNameKr);
            setProductDivision(response.data[0].division);
            setImgUrl(response.data[0].imageUrl);

            saveDataToStorage(response.data[0]);
        } catch (error) {
            console.log(error);
        }
    };

    const saveDataToStorage = async (data) => {
        try {
            const existingRecords = await AsyncStorage.getItem('productRecords');
            let newRecords = existingRecords ? JSON.parse(existingRecords) : [];
            newRecords.push({
                id: Date.now().toString(),
                barcode: barcodeData,
                productName: data.productNameKr,
                productDivision: data.division,
                date: new Date().toISOString(),
                imageUrl: data.imageUrl,

            });
            await AsyncStorage.setItem('productRecords', JSON.stringify(newRecords));
        } catch (e) {
            console.error('Failed to save data', e);
        }
    };

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={{ fontWeight: 'bold', fontSize: width / 18 }}>{barcodeData}</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TouchableHighlight onPress={toggleModal}>
                    <View style={styles.imageContainer}>
                        {imgUrl ? <Image style={styles.image} resizeMode='contain' source={{ uri: imgUrl }} /> : null}
                    </View>
                </TouchableHighlight>
                <View style={styles.topInfoContainer}>
                    <View style={styles.topInfo}>
                        <Text style={{ fontWeight: 'bold' }}>상품명</Text>
                        <Text>{productName || '상품을 찾지 못했습니다.'}</Text>
                    </View>
                    <View style={styles.topInfo}>
                        <Text style={{ fontWeight: 'bold' }}>분류군</Text>
                        <Text>{productDivision || ''}</Text>
                    </View>
                </View>
                {/* 추가 정보 표시 영역 */}
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <Pressable onPress={toggleModal}>
                        <Image style={styles.modalImage} resizeMode='contain' source={{ uri: imgUrl }} />
                    </Pressable>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow:1,
        backgroundColor: '#fff',
        alignItems: 'center',
        
    },
    titleContainer: {
        backgroundColor:'#ada4a5',
        height:100,
        width:width,
        justifyContent:'center',
        alignItems:'center',
    },

    scrollContainer:{
        // flex:1,
        backgroundColor:'#fff',
        alignItems:'center'
    },
    imageContainer:{
        // flex:1,
        borderBottomWidth:1,
        borderBottomColor:'#ada4a5',
        width:width,
        height:height/4,
        alignItems:'center',
        justifyContent:'center',

    },

    image:{
        width:width,
        height:height/5,
        
    },

    topInfoContainer:{
        height:80,
        width:width,
        backgroundColor:'#e4e4e4',
        paddingLeft:40,
        paddingTop:height/60
    },
    
    starContainer:{
        width:width,
        height:height/40,
        flexDirection:'row',
        flex:1,
    },
    starImg:{
        width:width/20,
        height:height/40,

    },
    topInfo:{
        flexDirection:'row',
        gap:width/100,
        
    },
    bottomInfoContainer:{
        flexDirection:'column',
        width:width/1.2,
        gap:50,
        marginTop:30,
        marginLeft:20,
    },
    bottomInfoBox:{
        flexDirection:'column',
        
    },
    //모달창 스타일
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.9)',
    },
    modalImage: {
        width: width,
        height: height/2,
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        padding: 10,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 5,
    },
});
