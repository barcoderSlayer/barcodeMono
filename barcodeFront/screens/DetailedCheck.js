//DetailedCheck.js<답변을 넣을수 있는 문의하기 상세보기 페이지 >
import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, Button, StyleSheet, Dimensions, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import config from '../config'; // config 파일의 정확한 경로를 지정하세요.

const { width, height } = Dimensions.get('window');

export default function DetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { inquiryId } = route.params;
  const [inquiryDetail, setInquiryDetail] = useState({
    title: '',
    content: '',
    answer: '',
    created_at: '',
    updated_at: '',
  });
  const [newResponse, setNewResponse] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.LOCALHOST_IP}/api/inquiries/${inquiryId}`);
        const data = await response.json();
        if (response.ok) {
          setInquiryDetail(data);
        } else {
          Alert.alert('Error', 'Unable to fetch inquiry details.');
        }
      } catch (error) {
        console.error('Error fetching inquiry details:', error);
        Alert.alert('Error', 'An error occurred while fetching inquiry details.');
      }
    };

    fetchData();
  }, [inquiryId]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return isNaN(date) ? "Invalid date" : new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  };

  const handleSubmitResponse = async () => {
    try {
      const response = await fetch(`${config.LOCALHOST_IP}/api/inquiries/${inquiryId}/answer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answer: newResponse,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Response submitted successfully.');
        setInquiryDetail(prevState => ({
          ...prevState,
          answer: newResponse,
          updated_at: new Date().toISOString()
        }));
        setNewResponse('');
      } else {
        Alert.alert('Error', 'Failed to submit response.');
      }
    } catch (error) {
      console.error('Error submitting response:', error);
      Alert.alert('Error', 'An error occurred while submitting your response.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>{"<"}</Text>
      </TouchableOpacity>
      <Text style={styles.header}>상세 확인</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>문의 제목</Text>
        <Text>{inquiryDetail.title}</Text>
        <Text style={styles.title}>문의 내용</Text>
        <View style={styles.contentBox}>
          <Text>{inquiryDetail.content}</Text>
        </View>
        <Text style={styles.timestamp}>{formatTimestamp(inquiryDetail.created_at)}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>답변 내용</Text>
        <View style={styles.contentBox}>
          <Text>{inquiryDetail.answer}</Text>
        </View>
        {inquiryDetail.updated_at && (
          <Text style={styles.timestamp}>{formatTimestamp(inquiryDetail.updated_at)}</Text>
        )}
      </View>
      <View style={styles.contentContainer}>
        <TextInput
          style={styles.input}
          value={newResponse}
          onChangeText={setNewResponse}
          placeholder="Enter your response here..."
          multiline
        />
        <Button title="Submit Response" onPress={handleSubmitResponse} />
      </View>
    </ScrollView>
  );
}


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

