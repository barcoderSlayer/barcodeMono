import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';

import BarcodeComponent from '../component/BarcodeComponent';

// 내가 검색했던 내용이 로컬에 남기때문에 최근 스캔 기록일수록 위쪽에 있어야한다
// 스캔성공시 asyncStoryge barcodeData리스트에 넣는다.
// search페이지가 포커싱될때마다 스토리지 시스트 불러와 순서데로 상품바코드 컴포넌트에 넣는다.
export default function Search({ navigation }) {



  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <BarcodeComponent productName="타이레놀" />
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