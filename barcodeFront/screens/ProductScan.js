import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get('window');

export default function ProductScan() {
 
  const navigation = useNavigation();
  const [recentScan, setRecentScan] = useState(null);

  useEffect(() => {
 
    const fetchScannedProducts = async () => {
      try {
        const savedProductsJSON = await AsyncStorage.getItem('scannedProducts');
        const savedProducts = savedProductsJSON ? JSON.parse(savedProductsJSON) : [];
        if (savedProducts.length > 0) {
          setRecentScan(savedProducts[savedProducts.length - 1]);
        }
      } catch (e) {
        console.error('Failed to load data', e);
      }
    };

    fetchScannedProducts();
  }, []);


  const handleCameraMode = () => {
 
    navigation.navigate("CameraScreen");
 
  };


    // AsyncStorage productData모든 데이터 비우기
    const clearAsyncStorage = async () => {
      try {
        // AsyncStorage에서 바코드 데이터 삭제
        await AsyncStorage.removeItem('productData');
        // 바코드 리스트 상태 초기화
        // setProductList([]);
        console.log("AsyncStorage가 성공적으로 비워졌습니다.");
      } catch (error) {
        console.error("AsyncStorage를 비우는 중 에러 발생:", error);
      }
    };






  // 최근 스캔 기록 정보
  const productData = {
    imageUrl: '이미지 주소',  // 스캔한 바코드 상품 이미지로 불어오기 필요
    date: '2018. 3. 17.',
    productName: '불닭볶음면',
    barcode: '8801416812490',
  };


 
  return (
    <View style={styles.container}>
  
      <Text style={styles.recentSearchTitle}>최근 검색 기록</Text>
  
      <TouchableOpacity style={styles.cameraButton} onPress={handleCameraMode}>
        <Image
          source={require('../assets/image/camera.png')}
          style={styles.cameraIcon}
        />
        <Text style={styles.cameraButtonText}>카메라 모드로 이동</Text>
  
      </TouchableOpacity>

      {recentScan && (
        <View style={styles.productCard}>
          <Image source={{ uri: recentScan.imageUrl }} style={styles.productImage} />
          <View style={styles.productDetails}>
            <Text style={styles.productDate}>{recentScan.date}</Text>
            <Text style={styles.productName}>{recentScan.productName || '제품명 미정'}</Text>
            <Text style={styles.barcode}>{recentScan.barcode}</Text>
          </View>
        </View>
      </View>
      {/* <Button title='스토리지 삭제' onPress={clearAsyncStorage}></Button> */}
    </View>
  );
}

const styles = StyleSheet.create({  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start', // 상단에 내용이 붙도록 조정
    paddingTop: 100, // 상단 여백
  },
  topContainer: {
    flex: 1,
  },
  bottomContainer: {
    flex: 1,
    width: width, // 화면의 너비로 설정
    backgroundColor: 'black',
    padding: 10, // 패딩 추가
  },
  recentSearchTitle: {
    position: 'absolute',
    top: 460,
    left: 30,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  barcodeText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  listItem: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  productName: {
    fontSize: 16,
    color: '#000',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  cameraButton: {
    backgroundColor: 'blue',
    padding: 25, // 패딩 증가
    borderRadius: 10, // 모서리 둥글게
    width: 230,
    margin: 130,
    flexDirection: 'row', // 아이콘과 텍스트를 가로로 배치
    alignItems: 'center', // 세로 중앙 정렬
    justifyContent: 'center', // 가로 중앙 정렬
  },
  cameraIcon: {
    width: 30, // 아이콘 크기 설정
    height: 30, // 아이콘 크기 설정
    marginRight: 10, // 텍스트와의 간격 설정
  },
  cameraButtonText: {
    color: 'white',
    fontSize: 18, // 폰트 크기 증가
  },
  productCard: {
    backgroundColor: '#E4E4E4',
    borderRadius: 10,
    padding: 40,
    width: width - 32, // 좌우 여백을 주기 위해 width에서 32를 뺌
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center', // 세로 정렬
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
    bottom: -50,
  },
  productImage: {
    width: 60,
    height: 90, // 이미지 사이즈 조정
    resizeMode: 'contain', // 이미지 비율 유지
    marginRight: 16,
  },
  productDetails: {
    flex: 1, // 남은 공간 모두 사용
  },
  productDate: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 5,
    bottom: 10,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  barcode: {
    fontSize: 22,
    color: 'gray',
    top: 20
  },
});
