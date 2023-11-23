import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';

export default function HospitalTips({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.textContainer}>
        <View style={styles.maintextContainer}>
          <Text style={styles.categoryTitle}>병원의 팁</Text>
        </View>
         <View style={styles.border} />

        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>병원 위치보기</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Home2", { screen: 'Home2' })}>
          <View style={styles.tipTextContainer}>
            <Text style={styles.tipText}>
              <Text style={{ marginLeft: 40 }}>           ⦁ 병원 위치 보러가기                                {'>'}</Text>
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>팁</Text>
        </View>

          <View style={styles.tipTextContainer}>
            <Text style={styles.tipText}>
              <Text>여행중 몸이 아픈것 만큼 힘든일이 없다. 한국은 의료비가 저렴하기 
때문에 몸이 좋지않다면 빠르게 병원을 가보는것을 추천한다. 또한
보통 한국에서 병원을 구분지을때 ‘의원’과 ‘병원’으로 구분을 짓는
데 ‘병원’의 전문의가 하는곳 의원은 일반의가 하는곳으로 ‘병원’을
가는것을 추천한다. </Text>
            </Text>
          </View>
      
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // 배경을 흰색으로 설정
  },
  maintextContainer: {
    marginTop: 1,
    paddingHorizontal: 1
    ,
  },
  textContainer: {
    marginTop: 1,
    paddingHorizontal: 20,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  tipTextContainer: {
    marginBottom: 20,
  },
  border: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tipText: {
    fontSize: 15,
    lineHeight:25.0,
    fontWeight: 'bold',
  },
});
