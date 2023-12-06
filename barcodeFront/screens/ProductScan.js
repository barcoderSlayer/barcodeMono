import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width } = Dimensions.get('window');

export default function ProductScan() {
  // 상품 스캔 데이터 상태
  const [scannedProducts, setScannedProducts] = useState([]);

  useEffect(() => {
    // AsyncStorage에서 상품 기록 데이터를 불러오는 함수
    const fetchScannedProducts = async () => {
      try {
        const savedProducts = await AsyncStorage.getItem('scannedProducts');
        setScannedProducts(savedProducts ? JSON.parse(savedProducts) : []);
      } catch (e) {
        console.error('Failed to load data', e);
      }
    };

    fetchScannedProducts();
  }, []);

   // 카메라 모드로 이동하는 함수 (현재는 예시로 로그만 출력)
   const handleCameraMode = () => {
    console.log('카메라 모드로 이동');
    // 여기에 실제 카메라 스크린으로의 네비게이션 로직을 추가할 수 있습니다.
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity style={styles.cameraButton} onPress={handleCameraMode}>
          <Image
            source={require('../assets/image/camera.png')} // 이미지 파일 경로
            style={styles.cameraIcon}
          />
          <Text style={styles.cameraButtonText}>카메라 모드로 이동</Text>
        </TouchableOpacity>
        {/* 기타 컴포넌트들 */}
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>최근 스캔 기록</Text>
        <FlatList
          data={scannedProducts}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.barcodeText}>{item.barcode}</Text>
              <Text style={styles.productName}>{item.productName}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
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
  topContainer: {
    flex: 1,
    // backgroundColor: 'orange',
  },
  bottomContainer: {
    flex: 1,
    width: width, // 화면의 너비로 설정
    backgroundColor: 'black',
    padding: 10, // 패딩 추가
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
});


// import { StyleSheet, Text, View, Dimensions } from 'react-native';
// import React from 'react';

// const { width, height } = Dimensions.get('window');


// export default function ProductScan() {

// return (
//     <View style={styles.container}>
//       <View style={styles.topContainer}>

//       </View>
//       <View style={styles.bottomContainer}>
//         <Text>최근 스캔 기록</Text>
//       </View>
//     </View>
// );
// }

// const styles = StyleSheet.create({
// container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
    
// },
// topContainer:{
//     flex:1,
//     backgroundColor:'orange',
// },
// bottomContainer:{
//     flex:1,
//     width: 100,
//     backgroundColor:'black'
    
// }
// });
