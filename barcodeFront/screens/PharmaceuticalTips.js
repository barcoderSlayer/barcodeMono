import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';

export default function PharmaceuticalTips({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.textContainer}>
        <View style={styles.maintextContainer}>
          <Text style={styles.categoryTitle}>의약품의 팁</Text>
        </View>
         <View style={styles.border} />

        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>의약품을 파는곳 위치보기</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("PharmarcyMap", { screen: 'PharmarcyMap' })}>
          <View style={styles.tipTextContainer}>
            <Text style={styles.tipText}>
              <Text style={{ marginLeft: 40 }}>           ⦁ 약국 위치 보러가기                                {'>'}</Text>
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>팁</Text>
        </View>

          <View style={styles.tipTextContainer}>
            <Text style={styles.tipText}>
              <Text>한국에서 약을 구할 수 있는 곳은 약국과 편의점이 있다. 하지만 같은
약이 이라도 약국과 편의점의 성분이 다르다 약국의 약이 더 효과가 
좋음으로 약국이 닫았거나 급한일이 아니라면 약국에서 약으 받는것
이 좋다 또한 약국에서 받을 수 있는 약은 한정적이고 재대로 된 약처
방을 받으려면 병원에서 처방전을 때와야 함으로 증상이 심하면 약국
이 아닌 병원을 먼저 들리도록 하자.</Text>
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
