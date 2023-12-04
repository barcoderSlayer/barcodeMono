import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const App = () => {
  const navigation = useNavigation();
  const [text1Position, setText1Position] = useState({ top: 420, left: 20 });   // 텍스트 문장 첫번째
  const [text2Position, setText2Position] = useState({ top: 470, left: 20 });   // 텍스트 문장 두번째

  const moveText1 = () => {
    setText1Position({ top: text1Position.top + 10, left: text1Position.left + 10 });
  }

  const moveText2 = () => {
    setText2Position({ top: text2Position.top + 10, left: text2Position.left + 10 });
  };

  return ( 
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
  > 
    <View style={styles.container}>
      {/* Header or Navigation Bar */}
      <View style={styles.header}> 
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>                   문의하기</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Menu */}
        <View style={styles.menu}>
        </View>

        {/* Input Area */}
        <View style={styles.inputArea}>
          <Text style={styles.inputLabel}>제목</Text>
          {/* <View style={styles.imageUploadBox}></View> */}
                  {/* 새로운 텍스트 입력 필드 추가 */}
          <TextInput 
            style={styles.additionalTextInput} 
            multiline 
            numberOfLines={2} 
            placeholder="제목을 입력하세요" 
          />

        <Text style={styles.inputLabel}>내용</Text>
        <TextInput 
          style={styles.textInput}
          multiline 
          numberOfLines={10}  
          placeholder="내용을 입력하세요" 
        />
      </View>

        {/* Adjustable Text Components */}
        < Text style={[styles.adjustableText, { top: text1Position.top, left: text1Position.left }]}>
        -접수된 문의는 개발자가 확인 후 답변드리겠습니다. 상세한 내용을 기재해주시면 빨리 답변 드릴 수 있습니다.   
        </Text>
        <Text style={[styles.adjustableText, { top: text2Position.top, left: text2Position.left }]}>
        -문의 처리 내역은 마이페이지 {'>'} 답변확인에서 확인하실 수 있습니다.
        </Text>

        {/* Footer or Action Area */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>확인</Text>
          </TouchableOpacity>
        {/* Cancel Button */}
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate("Home",{screen:'Home'})}>
          <Text style={styles.cancelButtonText}>취소</Text>
        </TouchableOpacity>
        </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {  // 전체 배경
    flex: 1,
    backgroundColor: '#fff',
  },
  adjustableText: {   // 텍스트 문장 설정
    position: 'absolute',
    fontSize: 14,
    color: '#7B6F72',
  },
  backButton: { // 뒤로 가기 버튼 
    marginRight: 16,
    justifyContent: 'center',
  },
  backButtonText: { // 취소 버튼
    fontSize: 24,
    color: '#fff',
    marginTop: 10, // 아래로 조정
    marginBottom: -10, // 위로 조정 
  },
  headerTitle: {  // 상단 텍스트
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10, 
    marginBottom: -10, 
  },
  content: {
    flex: 1,
    padding: 16,
  },
  menu: {    
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  inputArea: {  // 제목, 제목입력, 내용, 내용입력 위치 조정
    flex: 1,
    bottom: 80,
  },
  additionalTextInput: {  // 제목 텍스트 박스
    borderWidth: 2,
    borderColor: '#ddd',
    padding: 8,
    textAlignVertical: 'top',
    marginBottom: 30,   // 내용 텍스트와의 거리
  },
  inputLabel: { 
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInput: {   // 내용 텍스트 박스
    borderWidth: 2,
    borderColor: '#ddd',
    padding: 16,
    textAlignVertical: 'top',
    marginBottom: 16,
    position: 'absolute', 
    top: 180, 
    left: 0, 
    right: 0, 
    bottom: 50, 
  },
  footer: {
    padding: 16,
  },
  submitButton: {   // 확인 버튼
    backgroundColor: '#ADA4A5',
    position: 'absolute', 
    padding: 20,
    width: 200, 
    height: 61, 
    borderRadius: 0,
    alignItems: 'center',
    top: 0, 
    left: 180, 
  },
  submitButtonText: { // 확인 텍스트
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  cancelButton: {   // 취소 버튼
    marginTop: 10, 
    backgroundColor: '#E4E4E4', 
    position: 'absolute', 
    width: 200, 
    height: 61, 
    borderRadius: 0,
    alignItems: 'center',
    bottom: -16,
    right: 172, 
  },
  cancelButtonText: { // 취소 텍스트
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    bottom: -20,
  },
  footer: {   // 취소 버튼 위치 조종
    // ... other footer styles ...
    position: 'relative', // 절대 위치 지정 필요
    height: 45, // 절대 위치에 있는 버튼을 위한 공간이 확보되도록 고정 높이를 설정하세요.
  },
});

export default App;