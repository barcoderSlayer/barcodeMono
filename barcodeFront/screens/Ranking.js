import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, Image, Text, StyleSheet, View ,RefreshControl } from 'react-native';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import config from '../config';

export default function Ranking({ barcodeData, navigation }) {
  const [rankings, setRankings] = useState([]);
  const [refreshing, setRefreshing] = useState(false);



  useEffect(() => {
    fetchRankings();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchRankings();
    setRefreshing(false);
  };

  
  const fetchRankings = async () => {
    try {
      const response = await axios.get(`${config.LOCALHOST_IP}/api/rankings`);
      console.log('Rankings get () => Server Response:', response.data);
      setRankings(response.data);
    } catch (error) {
      console.error('Rankings fetching error:', error);
    }
  };

  const handleScroll = (event) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;

    // 스크롤이 최상단에서 일정 거리 이상 올라가면 새로고침
    const distanceToTop = contentOffset.y;
    const refreshDistance = -50; // 적절한 값을 설정해주세요

    if (distanceToTop <= refreshDistance) {
      fetchRankings();
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >

      <View style={styles.container}>
        {rankings.map((item, index) => (
          <TouchableOpacity
            key={item.barcodeNum}
            onPress={() => navigation.navigate('ProductInformationScreen', { barcodeData: item.barcodeNum })}
            style={styles.roundedRectangle}
          >
            <View style={styles.imageContainer}>
            {
              item.imageUrl ?
              <Image style={styles.imageStyle} resizeMode='contain' source={{uri:item.imageUrl}}/> :
              <Image style={styles.imageStyle} resizeMode='contain' source={require('../assets/imgless.jpeg')}/>
            }
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.topText}>TOP{index + 1}</Text>
              <Text style={styles.productName}>{item.productNameKr}</Text>
              <Text style={styles.count}>{item.scanCnt}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
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
  count: {
    fontSize: 14,
    color: 'gray',
  },
  topText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 1, // Adjust the margin-bottom as needed
  },   
});
    