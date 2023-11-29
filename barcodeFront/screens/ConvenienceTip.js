import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';

export default function ConvenienceTip({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.textContainer}>
        <View style={styles.maintextContainer}>
          <Text style={styles.categoryTitle}>편의점의 팁</Text>
        </View>
         <View style={styles.border} />

        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>편의점 위치보기</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Home2", { screen: 'Home2' })}>
          <View style={styles.tipTextContainer}>
            <Text style={styles.tipText}>
              <Text style={{ marginLeft: 40 }}>           ⦁ 편의점 위치 보러가기                             {'>'}</Text>
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>팁</Text>
        </View>

          <View style={styles.tipTextContainer}>
            <Text style={styles.tipText}>
              <Text>여행에서 편의점은 빼먹을 수 없는 중요한 요소다. 낮선 다양한 음식들
과 다양한 물건들이 모여있고 급하게 필요한 약이나 생활도구를  편하
게 얻을 수 있는 편의점은 여행에서 보물상자와 같다. 한국에서는 다양
한 편의점이 있는데 7ELEVEN, GS25, CU와 같은  편의점 들이 대표
적이며 이 편의점을 3대 편의점이라고 한다. </Text>
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
