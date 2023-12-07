import React, {useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView,Button , Image, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

// ====================Component====================
import BarcodeComponent from '../component/BarcodeComponent';

// 내가 검색했던 내용이 로컬에 남기때문에 최근 스캔 기록일수록 위쪽에 있어야한다
// 스캔성공시 asyncStoryge barcodeData리스트에 넣는다.
// search페이지가 포커싱될때마다 스토리지 시스트 불러와 순서데로 상품바코드 컴포넌트에 넣는다.
export default function Search({ navigation }) {
  const isFoucused = useIsFocused();

  const [productList, setProductList] = useState([]);



  useEffect(() => {
    console.log("Search 페이지로 들어오셨습니다.")

    console.log("스토리지 확인하겠습니다.")
    getProductList();
  },[isFoucused])

  //확인용
  useEffect(() => {
    console.log("productList State가 채워졌습니다.");
    
    console.log(productList);
  },[productList])

  // AsyncStorage에서 바코드 리스트 가져오기
  const getProductList = async ()=> {
    try{
      const storedProductList = await AsyncStorage.getItem('productData');

      if(storedProductList){
        const parsedProductList = JSON.parse(storedProductList);
        setProductList(parsedProductList);
        console.log(parsedProductList);
      }else{
        console.log("스토리지에 바코드 데이터가 없습니다.");
      }
    }catch(err){
      console.log("getProductList() => Error", err)
    }

  }

  // AsyncStorage productData모든 데이터 비우기
  const clearAsyncStorage = async () => {
    try {
      // AsyncStorage에서 바코드 데이터 삭제
      await AsyncStorage.removeItem('productData');
      // 바코드 리스트 상태 초기화
      setProductList([]);
      console.log("AsyncStorage가 성공적으로 비워졌습니다.");
    } catch (error) {
      console.error("AsyncStorage를 비우는 중 에러 발생:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title='전체 삭제' onPress={clearAsyncStorage}></Button>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <BarcodeComponent/>
        {
          productList?.map((item, index )=>{
            if (Object.keys(item).length !== 0 ) {
              return (
                <BarcodeComponent key={index} productData={item} />
              )
            }
          })
        }
      </ScrollView>
    </View>
  );
}

// styles 생략

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 10,
    overflow: 'hidden',
    marginLeft: 5,
  },
  roundedRectangle: {
    flexDirection: 'row',
    width: 400,
    height: 100,
    backgroundColor: '#F2F2F2',
    borderRadius: 15,
    margin: 10,
    alignItems: 'center',
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  textContainer: {
    marginLeft: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20, // 여기에서 상품명과 평점 사이의 간격을 늘림
  },
  rating: {
    fontSize: 14,
    color: 'gray',
  },
  topText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 1, // Adjust the margin-bottom as needed
  },   
});