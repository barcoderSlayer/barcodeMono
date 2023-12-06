// Contacting.js <문의하기 페이지>
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const App = () => {
  const navigation = useNavigation();
  const [inquiryTitle, setInquiryTitle] = useState('');
  const [inquiryContent, setInquiryContent] = useState('');

  const submitInquiry = async () => {
    try {
      const response = await fetch('http://your_backend_ip:3000/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: inquiryTitle,
          content: inquiryContent,
        }),
      });

      const data = await response.json();

      if (data) {
        console.log('문의가 성공적으로 저장되었습니다.');
        navigation.goBack();
      } else {
        console.error('서버로부터 응답이 올바르지 않습니다.');
      }
    } catch (error) {
      console.error('문의 저장 중 오류가 발생했습니다:', error);
    }
  };

  return (

    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>문의하기</Text>
      </View>



      <View style={styles.content}>

        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuButton}><Text>문의</Text></TouchableOpacity>
          <TouchableOpacity style={styles.menuButton}><Text>수정 요청</Text></TouchableOpacity>
          <TouchableOpacity style={styles.menuButton}><Text>오류/에러</Text></TouchableOpacity>
          <TouchableOpacity style={styles.menuButton}><Text>기타</Text></TouchableOpacity>
        </View>


        <View style={styles.inputArea}>
          <Text style={styles.inputLabel}>제목</Text>
          <TextInput
            style={styles.textInput}
            value={inquiryTitle}
            onChangeText={setInquiryTitle}
            placeholder="제목을 입력하세요"
          />
          <Text style={styles.inputLabel}>내용</Text>
          <TextInput
            style={styles.textInput}
            multiline
            numberOfLines={4}
            value={inquiryContent}
            onChangeText={setInquiryContent}
            placeholder="내용을 입력하세요"
          />
        </View>

        <Text style={[styles.adjustableText, { top: 550, left: 20 }]}>
          -접수된 문의는 개발자가 확인 후 답변드리겠습니다. 상세한 내용을 기재해주시면 빨리 답변 드릴 수 있습니다.
        </Text>
        <Text style={[styles.adjustableText, { top: 600, left: 20 }]}>
          -문의 처리 내역은 마이페이지 {'>'} 답변확인에서 확인하실 수 있습니다.
        </Text>


        <View style={styles.footer}>
          <TouchableOpacity style={styles.submitButton} onPress={submitInquiry}>
            <Text style={styles.submitButtonText}>확인</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate("Home", { screen: 'Home' })}>
            <Text style={styles.cancelButtonText}>취소</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
  menuButton: {   // 문의, 수정 요청, 오류/에러, 기타 버튼
    padding: 8,
    backgroundColor: '#ddd',
    borderRadius: 4,
    // 크기 조절이 가능하도록 너비와 높이를 추가하세요.
    width: 80, // 넓이 조절 가능
    height: 60, // 높이 조절 가능
    // 유용성 보장
    minWidth: 30,
    minHeight: 20,
    justifyContent: 'center', // 텍스트 세로 가운데 배치
    alignItems: 'center', // 텍스트 가로 가운데 배치
  },
  inputArea: {
    flex: 1,
  },
  imageUploadBox: { // 사진 업로드
    width: '30%',
    height: 100,
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'dashed',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  inputLabel: { 
    marginBottom: 8,
    fontWeight: 'bold',
  },
  textInput: {   // 텍스트 박스
    borderWidth: 2,
    borderColor: '#ddd',
    padding: 16,
    textAlignVertical: 'top',
    marginBottom: 16,
    position: 'absolute', 
    top: 180, 
    left: 0, 
    right: 0, 
    bottom: 100, 
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
  footer: {
    // ... other footer styles ...
    position: 'relative', // 절대 위치 지정 필요
    height: 45, // 절대 위치에 있는 버튼을 위한 공간이 확보되도록 고정 높이를 설정하세요.
  },
});

export default App;
