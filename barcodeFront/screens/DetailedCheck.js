import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const DetailScreen = () => {
  const navigation = useNavigation();

  const [titleContent, setTitleContent] = useState('');
  const [inquiryContent, setInquiryContent] = useState('');
  const [responseContent, setResponseContent] = useState('');
  const [inquiryTimestamp, setInquiryTimestamp] = useState('');
  const [responseTimestamp, setResponseTimestamp] = useState('');

  // 예시 데이터  함수
  useEffect(() => {
    // 서버로부터 데이터를 받아오는거 구현해야함.
    //  예시
    setTitleContent('문의 제목은 여기에 들어갑니다.');
    setInquiryContent('문의한 내용이 여기에 들어갑니다.');
    setInquiryTimestamp('2023-10-19T10:00:00Z');
    setResponseTimestamp('2023-10-20T15:30:00Z');
  }, []);

  // 타임스탬프 포맷
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    if (isNaN(date)) {
      // Handle invalid date, perhaps return a default string or error message
      return "Invalid date";
    }
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  };


  const handleSubmit = () => {  
    // 답변 게시 처리 로직
    // 예시: 서버에 데이터를 보내는 로직을 여기에 추가
    alert('답변이 게시되었습니다.');
    // 필요한 경우 상태 업데이트 또는 네비게이션 조정
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>    
        <Text style={styles.title}>제목</Text>
        <View style={styles.titleBox}>
          <Text>{titleContent}</Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>문의 내용</Text>
        <View style={styles.contentBox}>
          <Text>{inquiryContent}</Text>
        </View>
        <Text style={styles.timestamp}>{formatTimestamp(inquiryTimestamp)}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>답변 내용</Text>
            <TextInput // 답변 내용 텍스트 입력
              style={styles.contentInput}
              multiline={true}  // 여러 줄 입력 가능
              onChangeText={setResponseContent}  // 입력 내용을 responseContent 상태에 저장
              value={responseContent}
              placeholder="답변을 입력하세요"
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
              <Text style={styles.buttonText}>완료</Text>
            </TouchableOpacity>
        <Text style={styles.timestamp}>{formatTimestamp(responseTimestamp)}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 30,
  },
  // 제목
  titleContainer: {   
    marginBottom: height * 0.02,
    paddingHorizontal: width * 0.04,
  },
  titleBox: {
    minHeight: height * 0.05,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: width * 0.04,
    marginBottom: height * 0.02,
    backgroundColor: '#f9f9f9',
  },
  // 문의내용
  contentContainer: {
    marginBottom: height * 0.02,
    paddingHorizontal: width * 0.04,
  },
  title: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginBottom: height * 0.01,
  },
  contentInput: {   // 답변 내용 
    minHeight: 100, // 입력 영역의 최소 높이
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    textAlignVertical: 'top', // 안드로이드에서의 텍스트 정렬
  },
  submitButton: {   // 답변 내용 - 답변내용 작성 후 완료 버튼  
    backgroundColor: 'green', // 완료 버튼 색상
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  contentBox: {   // 문의내용 - 텍스트 상자
    minHeight: height * 0.1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: width * 0.04,
    marginBottom: height * 0.02,
    backgroundColor: '#f9f9f9',
  },
  timestamp: {
    fontSize: width * 0.035,
    color: '#999',
    textAlign: 'right',
  },
  passwordInput: {    // 답변내용 비밀번호 입력창
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {     
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
  },
});

export default DetailScreen;