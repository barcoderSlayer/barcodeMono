//DetailedCheck.js<답변을 넣을수 있는 문의하기 상세보기 페이지 >
import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
  Alert
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const DetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { inquiryId } = route.params;

  const [inquiryDetail, setInquiryDetail] = useState({
    title: '',
    content: '',
    answer: '',
    created_at: ''
  });
  const [newResponse, setNewResponse] = useState('');


   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://your_backend_ip:3000/api/contact_answer/${inquiryId}`);
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
      const response = await fetch(`http://your_backend_ip:3000/api/contact_answer/${inquiryId}`, {
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
          answer: newResponse
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
        {/* 기존 답변의 타임스탬프는 데이터에 따라 추가될 수 있음 */}
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