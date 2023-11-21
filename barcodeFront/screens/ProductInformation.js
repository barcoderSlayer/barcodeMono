import { StatusBar } from 'expo-status-bar';

import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View,Image ,Dimensions} from 'react-native';

import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import axios from 'axios';


const { width, height } = Dimensions.get('window');


export default function ProductInformation({ route }) {


    const [imgUrl,setImgUrl]= useState({}); //상품 이미지 url
    const [productData, setProductData]= useState({k:1}); //상품 정보
    const [loading, setLoading]=useState(); //로딩 => 데이터 불러올때 사용
    const [productName,setProductName] = useState(); //상품 이름

    

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


    //tite Name 
    const titleName = productData === null
    ?   <Text style={{color:'white', fontSize:height/40}}>결과가 없습니다.</Text>
    : <Text>검색결과 입니다.</Text>

    // imageView
    
    //starView => starView 갯수에 따라 별 갯수 출력
    function starView(){
        var starView = 5; // 표시할 별 갯수
        let stars = [];
        
        for(let i = 0; i<starView; i++){
            stars.push(<Image key={i} style={styles.starImg} resizeMode='contain' source={require('../assets/star.png')}/>);
        }
        return (
            <View style={styles.starContainer}>
                {stars}
            </View>
        )
    }



    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                {titleName}
            </View>
            <View style={styles.imageContainer}>
                <Image style={styles.image} resizeMode='contain' source={require('../assets/imgless.jpeg')}/>
            </View>
            <View style={styles.topInfoContainer}>
                {/* 별갯수 확인 */}
                {starView()} 
                <View style={styles.topInfo}>
                    <Text style={{fontWeight:'bold'}}>상품명</Text>
                    <Text>{productName}</Text>
                </View>
                <View style={styles.topInfo}>
                    <Text style={{fontWeight:'bold'}}>분류군</Text>
                    <Text> 분류군입니다</Text>
                </View>
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
        
    },
    titleContainer: {
        backgroundColor:'#ada4a5',
        height:height/10,
        width:width,
        justifyContent:'center',
        alignItems:'center',
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
        width:width/3,
        height:height,
        
    },

    topInfoContainer:{
        height:height/10,
        backgroundColor:'#e4e4e4',
        paddingLeft:40
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
});
