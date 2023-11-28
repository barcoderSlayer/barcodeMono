import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, Image, Text, StyleSheet, View } from 'react-native';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";

export default function Ranking({ barcodeData, navigation }) {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await axios.get('http://172.30.1.13:3000/api/rankings');
        console.log('Server Response:', response.data);
        setRankings(response.data);
      } catch (error) {
        console.error('Rankings fetching error:', error);
      }
    };

    fetchRankings();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {rankings.map((item, index) => (
          <TouchableOpacity
            key={item.barcodeNum}
            onPress={() => navigation.navigate('ProductInformationScreen', { barcodeData: item.barcodeNum })}
            style={styles.roundedRectangle}
          >
            <View style={styles.imageContainer}>
              <Image  
                source={require('../assets/icon.png')} // 실제 이미지 경로에 맞게 수정하세요
                style={styles.imageStyle}
              />
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
    