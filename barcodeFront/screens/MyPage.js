import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // 추가

export default function MyPage({ route }) {
  const navigation = useNavigation();  // 추가


  return (
    <View style={styles.container}>
      {/* Header with "My Page" text */}
      <View style={styles.header}>
        {/* Adjusted text position for "My Page" */}
        <Text style={styles.headerText}>마이페이지</Text>
        {/* White rectangle with light shadow */}
        <View style={styles.WhiteContainer}></View>
      </View>
      {/* Menu items below */}
      <View style={styles.menuContainer}>
    <View style={styles.menuItem}>
      <Text style={[styles.menuItemText, { top: 10, left: 40 }]}>설정</Text>
      </View>
    <View style={styles.menuItem}>
      <Text style={[styles.menuItemText, { top: 80, left: 40 }]}>문의</Text>
      </View>
    <View style={styles.menuItem}>
      <Text style={[styles.menuItemText, { top: 200, left: 40 }]}>기록</Text>
      </View>
    </View>


      <View style={styles.InternalmenuContainer}>
        <TouchableOpacity style={styles.Language_menuItem} onPress={() => navigation.navigate("PharmaceuticalTips",{screen:'PharmaceuticalTips'})}>
          <Text style={[styles.Detail_menuItemText, { top: -55, left: 90 }]}>언어설정</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Inquiry_menuItem} onPress={() => navigation.navigate("Contacting",{screen:'Contacting'})}>
          <Text style={[styles.Detail_menuItemText, { top: 55, left: 90 }]}>문의하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Answer_menuItem} onPress={() => navigation.navigate("AnswerCheck",{screen:'AnswerCheck'})}>
          <Text style={[styles.Detail_menuItemText, { top: 105, left: 90 }]}>답변확인</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Barcoderecord_menuItem} onPress={() => navigation.navigate("Search",{screen:'Search'})}>
          <Text style={[styles.Detail_menuItemText, { top: 210, left: 90 }]}>바코드 기록</Text>
        </TouchableOpacity>  
      
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#fff',
  },
  WhiteContainer: { // 흰 직사각형
    backgroundColor: '#fff', // 직사각형 도형 색깔
    width: '90%', // 화면 넓이 조절
    height: '680%', // 화면 높이 조절
    borderRadius: 10, // 둥근 모서리 조절

    // Android용 입면도
    elevation: 5,
    // 헤더 내에서 흰색 컨테이너를 중앙에 배치합니다.
    position: 'absolute',
    top: 130, // 위아래 위치 조정
    alignSelf: 'center', // 흰 상자 중앙 설정
  },
  headerText: {   // 헤더 안 '마이페이지' 
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuContainer: {  
    marginTop: 10, // 상단바를 제외한 전체 글자를 아래로 이동하려면 이것으로 조정.
  },
  menuItem: { 
    paddingVertical: 20,    // 설정, 문의, 기록 세로 위치 조정 
    paddingHorizontal: 35,  // 설정, 문의, 기록 가로 위치 조정 
    // borderBottomWidth: 0, // 테두리 너비를 0으로 설정하여 구분선을 제거합니다.
  },
  menuItemText: {   // 설정, 문의, 기록의 설정
    fontSize: 25,
    textAlign: 'left',
    position: 'absolute', // 자유로운 위치 지정 가능
  },
  
  Language_menuItem: {
    paddingVertical: -220,    // 언어설정 세로 위치 조정 
    paddingHorizontal: 85,  // 언어설정 가로 위치 조정 
    // borderBottomWidth: 0, // 테두리 너비를 0으로 설정하여 구분선을 제거합니다.
  },
  Inquiry_menuItem: {
    paddingVertical: -210,    // 문의하기 세로 위치 조정 
    paddingHorizontal: 85,  // 문의하기 가로 위치 조정 
    // borderBottomWidth: 0, // 테두리 너비를 0으로 설정하여 구분선을 제거합니다.
  },
  Answer_menuItem: {
    paddingVertical: -210,    // 답변확인 세로 위치 조정 
    paddingHorizontal: 85,  // 답변확인 가로 위치 조정 
    // borderBottomWidth: 0, // 테두리 너비를 0으로 설정하여 구분선을 제거합니다.
  },
  Barcoderecord_menuItem: {
    paddingVertical: -210,    // 바코드 기록 세로 위치 조정 
    paddingHorizontal: 85,  // 바코드 기록 가로 위치 조정 
    // borderBottomWidth: 0, // 테두리 너비를 0으로 설정하여 구분선을 제거합니다.
  },
  Detail_menuItemText: {  // 언어설정, 문의하기, 답변확인, 바코드 기록 설정 
    fontSize: 21,
    color: '#7B6F72',
    position: 'absolute', // 자유로운 위치 지정 가능
    top: -200, // 초기 상단 위치, 필요에 따라 조정
    left: 70, // 초기 왼쪽 위치, 필요에 따라 조정
    // 필요한 경우 오른쪽 및 아래쪽 속성을 사용가능
    textAlign: 'left', // 텍스트 정렬 유지
  },

  textStyle: {
    fontSize: 33,
    fontWeight: 'bold',
  },

});