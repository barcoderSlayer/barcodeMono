import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

// 디바이스 화면의 크기를 얻습니다(반응형 으로 코드짜려고 )
const { width, height } = Dimensions.get('window');

const DetailScreen = ({ navigation }) => {
  // 문의 내용과 답변 내용, 타임스탬프를  관리합니다.
  const [inquiryContent, setInquiryContent] = useState('');
  const [responseContent, setResponseContent] = useState('');
  const [inquiryTimestamp, setInquiryTimestamp] = useState('');
  const [responseTimestamp, setResponseTimestamp] = useState('');

  // 예시 데이터  함수
  useEffect(() => {
    // 서버로부터 데이터를 받아오는거 구현해야함.
    //  예시
    setInquiryContent('문의한 내용이 여기에 들어갑니다.');
    setResponseContent('사용자 누구나 답변이 가능합니다.'); // 관리자 답변이 아닌 커뮤니티 방식으로 사용자, 관리자 답변 가능
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

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>{"<"}</Text>
      </TouchableOpacity>
      <Text style={styles.header}>상세확인</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>문의 내용</Text>
        <View style={styles.contentBox}>
          <Text>{inquiryContent}</Text>
        </View>
        <Text style={styles.timestamp}>{formatTimestamp(inquiryTimestamp)}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>답변 내용</Text>
        <View style={styles.contentBox}>
          <Text>{responseContent}</Text>
        </View>
        <Text style={styles.timestamp}>{formatTimestamp(responseTimestamp)}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    marginTop: height * 0.02,
    marginLeft: width * 0.05,
    marginBottom: height * 0.01,
  },
  backButtonText: {
    fontSize: width * 0.07,
    bottom: -30,
  },
  header: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: height * 0.02,
  },
  contentContainer: {
    marginBottom: height * 0.02,
    paddingHorizontal: width * 0.04,
  },
  title: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginBottom: height * 0.01,
  },
  contentBox: {
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
});

export default DetailScreen;