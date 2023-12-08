// AnswerCheck.js<어떤 문의가 있는지 확인할 수 있는 페이지 >

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
  
 const App = () => {
  // useNavigation 훅을 사용하여 네비게이션 객체에 접근합니다.
 
   const navigation = useNavigation();
 
   
  // 문의글 목록을 상태(state)로 관리하기 위한 useState 훅입니다.
  const [inquiries, setInquiries] = useState([]);

  // useEffect 훅을 사용하여 컴포넌트가 마운트될 때(화면에 처음 표시될 때) 문의글 목록을 서버로부터 가져옵니다.
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        // 서버로부터 문의글 목록을 가져오는 HTTP GET 요청을 비동기적으로 실행합니다.
        const response = await fetch('http://your_backend_ip:3000/api/inquiries');
        const data = await response.json(); // 응답으로 받은 데이터를 JSON 형태로 변환합니다.
        setInquiries(data); // 변환된 데이터를 inquiries 상태에 저장합니다.
      } catch (error) {
        // 요청 중 오류가 발생하면 콘솔에 오류를 출력합니다.
        console.error('Error fetching inquiries:', error);
      }
    };

    fetchInquiries(); // 정의된 함수를 실행하여 데이터를 가져옵니다.
  }, []);

  // renderItem 함수는 FlatList에 의해 렌더링 될 각 문의글 항목을 정의합니다.
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.inquiryItem}
      // 각 항목을 클릭했을 때 'DetailedCheck' 스크린으로 네비게이션하며, inquiryId를 파라미터로 전달합니다.
      onPress={() => navigation.navigate('DetailedCheck', { inquiryId: item.id })}
    >
      <Text style={styles.inquiryTitle}>{item.title}</Text>
      {/* 문의글의 제목을 표시합니다. */}
    </TouchableOpacity>
  );

  // 실제로 화면에 표시될 내용입니다.
  return (
    <>
    <View style={styles.header}>
      {/* <Text style={styles.headerText}>답변확인</Text> */}
    </View>
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>{"<"}</Text>
      </TouchableOpacity>
    <View style={[styles.container, { paddingTop: headerHeight }]}>
      <View style={styles.form}>
          <View style={styles.inputGroup}>
          </View>

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
            문의 내역
          </Text>
          <Text style={styles.danger}>
            답변 내용
          </Text>

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

    <View style={styles.container}>
      {/* FlatList 컴포넌트를 사용하여 문의글 목록을 렌더링합니다. */}
      <FlatList
        data={inquiries} // 렌더링할 데이터 배열입니다.
        renderItem={renderItem} // 각 항목을 어떻게 렌더링할지 정의합니다.
        keyExtractor={item => item.id.toString()} // 각 항목의 고유 키를 추출하는 함수입니다.
      />
    </View>
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