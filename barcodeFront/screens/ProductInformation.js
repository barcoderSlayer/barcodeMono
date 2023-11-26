import { StatusBar } from 'expo-status-bar';

import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View,Image ,Dimensions, ScrollView, Modal} from 'react-native';

import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import axios from 'axios';
import { TouchableHighlight } from 'react-native-gesture-handler';


const { width, height } = Dimensions.get('window');


export default function ProductInformation({ route }) {


    const [imgUrl,setImgUrl]= useState(""); //상품 이미지 url
    const [productData, setProductData]= useState({}); //상품 정보
    const [loading, setLoading]=useState(); //로딩 => 데이터 불러올때 사용
    const [productName,setProductName] = useState(); //상품 이름
    const [productDivision, setProductDivision]=useState();
    const [modalVisible, setModalVisible] = useState(false); //모달창 보기


    //이미지 확대해서 보기 모달창
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

      //모달창 클릭해서 모달창 닫기
    const closeModal=() => {
        setModalVisible(false);
    }
    

    const navigation = useNavigation();
    const {barcodeData} = route.params;

    useEffect(()=>{
        setImgUrl({url:"https://reactnative.dev/img/tiny_logo.png"}); //이미지 url 세팅
        console.log("barcodeData = ", barcodeData);
        getData();
    },[]);

    // data get요청
    const getData = async() =>{
        const response = await axios.get(`http://192.168.0.41:3000/barcodePage/?barcodeData=${barcodeData}`)
        .then(function (response) {
            console.log("요청 후 받아온 데이터",response.data);
            setProductData(response.data)
            setProductName(response.data[0].productNameKr);
            setProductDivision(response.data[0].division);
            setImgUrl(response.data[0].imageUrl)
            console.log(response.data[0].imageUrl)
        })
        .catch(function (error){
            console.log(error);
        });
    }

    const handlePress = () => {
        console.log("버튼 클릭 했네요 요청하겠습니다.")
        getData();
    }


    //tite Name 
    const titleName = productData === null
    ?   <Text style={{color:'white', fontSize:height/40}}>결과가 없습니다.</Text>
    : <Text>검색결과 입니다.</Text>

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
                <Text style={{fontWeight:'bold', fontSize:width/18}}>{barcodeData}</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TouchableHighlight onPress={toggleModal}>
            <View style={styles.imageContainer}>
                {
                    imgUrl&&
                    imgUrl ?
                    <Image style={styles.image} resizeMode='contain' source={{uri:imgUrl}}/> :
                    <Image style={styles.image} resizeMode='contain' source={require('../assets/imgless.jpeg')}/>
                }
            </View>
            </TouchableHighlight>
            <View style={styles.topInfoContainer}>
                {/* 별갯수 확인 */}
                {/* {starView()}  */}
                <View style={styles.topInfo}>
                    <Text style={{fontWeight:'bold'}}>상품명</Text>
                    {
                        productName ?
                        <Text>{productName}</Text> :
                        <Text>상품을 찾지 못했습니다.</Text>
                    }
                    
                </View>
                <View style={styles.topInfo}>
                    <Text style={{fontWeight:'bold'}}>분류군</Text>
                    {
                        productName ?
                        <Text>{productDivision}</Text> :
                        null
                    }
                </View>
            </View>
            <View style={styles.bottomInfoContainer}>
                <View style={styles.bottomInfoBox}>
                    <Text style={{fontWeight:'bold'}}>상품설명</Text>
                    <Text style={{marginLeft:width/5}}>gptText</Text>
                </View>
                <View style={styles.bottomInfoBox}>
                    <Text style={{fontWeight:'bold'}}>구성성분</Text>
                    <Text style={{marginLeft:width/5}}>구성성분text</Text>
                </View>
            </View>
            {titleName}
            <Button title="click get object start" onPress={handlePress}/>
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
                <TouchableHighlight onPress={toggleModal}>
                    <Image style={styles.modalImage} resizeMode='contain' source={{ uri: imgUrl }} />
                </TouchableHighlight>
            </View>
            {/* </TouchableHighlight> */}
            </Modal>
        {/* 모달 끝 */}
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
