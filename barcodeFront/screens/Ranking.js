import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';

export default function Ranking({ navigation }) {
  // Generate 10 items
  const items = Array.from({ length: 10 }, (_, index) => (
    <TouchableOpacity
      key={index}
      onPress={() => navigation.navigate('ProductInformation', { /* 나중에 바코드 넣어야지 */ })}
      style={styles.roundedRectangle}
    >
      <View style={styles.imageContainer}>
        <Image  
          source={require('../assets/icon.png')}
          style={styles.imageStyle}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.topText}>TOP{index + 1}</Text>
        <Text style={styles.productName}>상품명</Text>
        <Text style={styles.rating}>10/10</Text>
      </View>
    </TouchableOpacity>
  ));

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {items}
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
    