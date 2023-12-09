import { StatusBar } from 'expo-status-bar';

import React, { useState, useEffect } from 'react';
import { 
    Button, StyleSheet, Text, View, Image, 
    Dimensions, ScrollView, Modal, Pressable,
    ActivityIndicator,
} from 'react-native';

import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import axios from 'axios';
import { TouchableHighlight } from 'react-native-gesture-handler';
// import {LOCALHOST_IP_NUMBER} from '@env'; // 실행이 안됨...
// .env에 환경변수로 EXPO_PUBLIC_API_KEY= 123 ... 을입력해서 사용
import Constants from 'expo-constants';
import config from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';




const { width, height } = Dimensions.get('window');


export default function ProductInformation({ route }) {
    const [productData, setProductData] = useState({}); //상품 정보 여부 확인
    const [productNumber, setProductNumber] = useState("");
    const [imgUrl, setImgUrl] = useState(""); //상품 이미지 url
    const [productName, setProductName] = useState(""); //상품 이름

    const [loading, setLoading] = useState(false); // 로딩 => 데이터 불러올때 사용
    const [modalVisible, setModalVisible] = useState(false); //모달창 보기
    const [gptText, setGptText] = useState(""); //gpt 설명 요청시 채워짐

    const navigation = useNavigation();

    useEffect(() => {
        console.log("barcodeData = ", route.params.barcodeData);
        
        setProductData(route.params.barcodeData);
        setProductNumber(route.params.barcodeData.barcodeNum);
        setImgUrl(route.params.barcodeData.imageUrl);
        setProductName(route.params.barcodeData.productNameKr);
    }, [route.params]);



    //이미지 확대해서 보기 모달창
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    //모달창 클릭해서 모달창 닫기
    const closeModal = () => {
        setModalVisible(false);
    }

  


    //productName이 존재할 시 뜨는 gpt요청 버튼 클릭시 데이터 받아오기 => state에 데이터 넣고 클라이언트에게 보여주기
    const gptRequest = async () => {
        try {
            console.log("gptRequest() 실행합니다")

            setLoading(true) // gpt 실행하면 loading 실행

            const postData = {
                key1: `${productName}`
            }
            // console.log(postData) 
            const response = await axios.post(`${config.LOCALHOST_IP}/chat`, postData)
            console.log('gptRequest()  => ', response.data);
            setGptText(response.data)

            setLoading(false) // gpt 실행하면 loading 끄기
        } catch (error) {
            console.error('gptRequest 요청 중 error발생 : ', error)
        }
    }


    //tite Name 
    const titleName = productData === null
        ? <Text style={{ color: 'white', fontSize: height / 40 }}>결과가 없습니다.</Text>
        : <></>

    // imageView

    //starView => starView 갯수에 따라 별 갯수 출력
    // 평점 별 표시 기능
    // function starView(){
    //     var starView = 5; // 표시할 별 갯수
    //     let stars = [];

    //     for(let i = 0; i<starView; i++){
    //         stars.push(<Image key={i} style={styles.starImg} resizeMode='contain' source={require('../assets/star.png')}/>);
    //     }
    //     return (
    //         <View style={styles.starContainer}>
    //             {stars}
    //         </View>
    //     )
    // }

  


    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                {
                    productNumber?
                        <Text style={{ fontWeight: 'bold', fontSize: width / 18 }}>{productNumber}</Text>
                        :
                        <Text>....</Text>
                }
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TouchableHighlight onPress={toggleModal}>
                    <View style={styles.imageContainer}>
                        {
                            imgUrl ?
                                <Image style={styles.image} resizeMode='contain' source={{ uri: imgUrl }} /> :
                                <Image style={styles.image} resizeMode='contain' source={require('../assets/imgless.jpeg')} />
                        }
                    </View>
                </TouchableHighlight>
                <View style={styles.topInfoContainer}>
                    {/* 별갯수 확인 */}
                    {/* {starView()}  */}
                    <View style={styles.topInfo}>
                        <Text style={{ fontWeight: 'bold' }}>상품명</Text>
                        {
                            productName ?
                                <Text>{productName}</Text> :
                                <Text>상품을 찾지 못했습니다.</Text>
                        }
                    </View>
                    
                </View>
                <View style={styles.bottomInfoContainer}>
                    <View style={styles.bottomInfoBox}>
                        <Text style={{ fontWeight: 'bold' }}>상품설명</Text>
                        {/* productName이 있고 gptText가 없다면 버튼 만들기 */}
                        {
                            productName ?
                                gptText ?
                                    <Text>{gptText}</Text>
                                    :
                                    <>
                                        {
                                            loading ?
                                                <ActivityIndicator size="large" color="#0000ff" />
                                                :
                                                <Button title="gpt에게 물어보기" onPress={gptRequest} />
                                        }
                                    </>
                                :
                                <Text> 데이터를 찾지 못했습니다.</Text>
                        }
                    </View>
                    {/* <View style={styles.bottomInfoBox}>
                    <Text style={{fontWeight:'bold'}}>구성성분</Text>
                    <Text style={{marginLeft:width/5}}>구성성분text</Text>
                </View> */}
                </View>
                {titleName}
                {/* <Button title="로딩" onPress={loadingCheckFunc} />
                {
                    loading ?
                        <ActivityIndicator size="large" color="#0000ff" /> :
                        <Text>check</Text>
                } */}

            </ScrollView>
            {/* 모달창 세팅 */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                {/* <TouchableHighlight onPress={closeModal}> */}
                <View style={styles.modalContainer}>
                    <Pressable onPress={toggleModal}>
                        <Image style={styles.modalImage} resizeMode='contain' source={{ uri: imgUrl }} />
                    </Pressable>
                </View>
                {/* </TouchableHighlight> */}
            </Modal>
            {/* 모달 끝 */}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        alignItems: 'center',

    },
    titleContainer: {
        backgroundColor: '#ada4a5',
        height: 100,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },

    scrollContainer: {
        // flex:1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    imageContainer: {
        // flex:1,
        borderBottomWidth: 1,
        borderBottomColor: '#ada4a5',
        width: width,
        height: height / 4,
        alignItems: 'center',
        justifyContent: 'center',

    },

    image: {
        width: width,
        height: height / 5,

    },

    topInfoContainer: {
        height: 80,
        width: width,
        backgroundColor: '#e4e4e4',
        paddingLeft: 40,
        paddingTop: height / 60
    },

    starContainer: {
        width: width,
        height: height / 40,
        flexDirection: 'row',
        flex: 1,
    },
    starImg: {
        width: width / 20,
        height: height / 40,

    },
    topInfo: {
        flexDirection: 'row',
        gap: width / 100,

    },
    bottomInfoContainer: {
        flexDirection: 'column',
        width: width / 1.2,
        gap: 50,
        marginTop: 30,
        marginLeft: 20,
    },
    bottomInfoBox: {
        flexDirection: 'column',

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
        height: height / 2,
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