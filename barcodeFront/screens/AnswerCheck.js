import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const headerHeight = 54;

const App = () => {
  
  const navigation = useNavigation();
  const [buttonWidth, setButtonWidth] = useState(100); // 버튼의 초기 너비

  // 헤더, 버튼, 텍스트  
  return (
    <>
    <View style={styles.header}>
      <Text style={styles.headerText}>답변확인</Text>
    </View>
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>{"<"}</Text>
      </TouchableOpacity>
    <View style={[styles.container, { paddingTop: headerHeight }]}>
      <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>시기</Text>
          </View>

          <TouchableOpacity style={styles.buttonAll}>
            <Text style={styles.buttonText}>전체</Text>
          </TouchableOpacity>

           {/* Image component */}
           <Image
            style={styles.stretch1}
            source={require('../assets/image/question.png')}  // 물음표 이미지
          />
            {/* Image component */}
            <Image
            style={styles.stretch2}
            source={require('../assets/image/danger.png')}  // 느낌표 이미지
          />

          <Text style={styles.question}>
            답변 완료
          </Text>
          <Text style={styles.danger}>
            답변 완료
          </Text>
          
          <TouchableOpacity style={styles.buttonDay}> 
            <Text style={styles.interactiveButtonText} // 
            >1일</Text> 
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonWeek}>
            <Text style={styles.interactiveButtonText}>1주</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonMonth}>
            <Text style={styles.interactiveButtonText}>1달</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonQuestion} onPress={() => navigation.navigate("DetailedCheck",{screen:'DetailedCheck'})}>
            <Text style={styles.interactiveButtonText}>상세확인</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonDanger} onPress={() => navigation.navigate("DetailedCheck",{screen:'DetailedCheck'})}>
            <Text style={styles.interactiveButtonText}>상세확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    top: 10,
  },
  backButton: {
    bottom: 55,
    marginLeft: 15,
    marginBottom: 0,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 35,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 50, // from the second component
  },
  stretch: {
    width: 50,
    height: 200,
    resizeMode: 'stretch',
  },
  form: {
    padding: 20,
    backgroundColor: '#fff',
    paddingBottom: 100,
  },
  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    bottom: 50,
  },
  label: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    bottom:50,
  },
  buttonAll: {  // 전체
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
    padding: 10,
    width: 345,
    alignItems: 'center',
    borderRadius: 0,
    marginBottom: 20,
    bottom: 130,
  },
  buttonText: { // 전체
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  question: {     // 물음표 - 답변완료
    color: '#0066FF',
    fontSize: 24,
    marginBottom: 20,
    bottom: 145,
    left: 75,
  },
  danger: {     // 느낌표 - 답변완료
    color: '#0066FF',
    fontSize: 24,
    marginBottom: 20,
    bottom: 50,
    left: 75,
  },
  buttonDay: {  // 1일
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
    padding: 10,
    width: 115,
    alignItems: 'center',
    borderRadius: 0,
    marginBottom: 20,
    bottom: 369,
  },
  buttonWeek: {  // 1주 
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
    padding: 10,
    width: 115,
    alignItems: 'center',
    borderRadius: 0,
    marginBottom: 20,
    bottom: 435,
    left: 115,
  },
  buttonMonth: {  // 1달 
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
    padding: 10,
    width: 115,
    alignItems: 'center',
    borderRadius: 0,
    marginBottom: 20,
    bottom: 501,
    left: 230, 
  },
  buttonQuestion: {  // 물음표 - 상세확인
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
    padding: 10,
    width: 315,
    alignItems: 'center',
    borderRadius: 0,
    marginBottom: 20,
    bottom: 395,
    left: 20, 
  },
  buttonDanger: {  // 느낌표 - 상세확인
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
    padding: 10,
    width: 315,
    alignItems: 'center',
    borderRadius: 0,
    marginBottom: 20,
    bottom: 306,
    left: 20, 
  },
  interactiveButtonText: { // 1일, 1주, 1달
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stretch1: {     // 물음표 이미지
    width: 50,
    height: 50,
    resizeMode: "stretch",
    bottom: 50,
  },
  stretch2: {     // 느낌표 이미지
    width: 55,
    height: 55,
    resizeMode: "stretch",
    bottom: -50, 
  },
});

export default App;