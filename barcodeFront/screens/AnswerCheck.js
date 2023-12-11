// AnswerCheck.js<어떤 문의가 있는지 확인할 수 있는 페이지 >

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import config from '../config'; // config 파일의 정확한 경로를 지정하세요.

const App = () => {
 const navigation = useNavigation();
 
 
 const [inquiries, setInquiries] = useState([]);


  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await fetch(`${config.LOCALHOST_IP}/api/inquiries`);
        const data = await response.json();
        setInquiries(data);
      } catch (error) {
   
        console.error('Error fetching inquiries:', error);
      }
    };

    fetchInquiries();
  }, []);

  
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.inquiryItem}
  
      onPress={() => navigation.navigate('DetailedCheck', { inquiryId: item.id })}
    >
      <Text style={styles.inquiryTitle}>{item.title}</Text>
 
    </TouchableOpacity>
  );


  return (
    <>
      <View style={styles.header}>
        {/* Header 내용이 필요하다면 여기에 작성하세요. */}
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>{"<"}</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.form}>
          <Image
            style={styles.stretch1}
            source={require('../assets/image/question.png')} // 이미지 경로 확인 필요
           />
          <Image
            style={styles.stretch2}
            source={require('../assets/image/danger.png')} // 이미지 경로 확인 필요
          />
          <Text style={styles.question}>문의 내역</Text>
          <Text style={styles.danger}>답변 내용</Text>

          {/* 문의글 목록을 표시하는 FlatList */}
          <FlatList
            data={inquiries}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </View>
    </>
  );
};

  //   <View style={styles.container}>
  //     {/* FlatList 컴포넌트를 사용하여 문의글 목록을 렌더링합니다. */}
  //     <FlatList
  //       data={inquiries} // 렌더링할 데이터 배열입니다.
  //       renderItem={renderItem} // 각 항목을 어떻게 렌더링할지 정의합니다.
  //       keyExtractor={item => item.id.toString()} // 각 항목의 고유 키를 추출하는 함수입니다.
  //     />
  //   </View>
  //  );
 
 
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
    marginBottom: 70,
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

  buttonQuestion: {  // 물음표 - 상세확인
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
    padding: 10,
    width: 315,
    alignItems: 'center',
    borderRadius: 0,
    marginBottom: 20,
    bottom: 195,
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

    bottom: 100,
    left: 20, 
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