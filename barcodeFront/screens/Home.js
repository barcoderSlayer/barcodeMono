import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView,TouchableOpacity } from "react-native";
import { SliderBox } from "react-native-image-slider-box";


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        require('../assets/image/hospital.png'),
        require('../assets/image/pharmacy.png'),
        require('../assets/image/Toiletries.png'),
      ]
    };
  }

  render() { 
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <SliderBox
          images={this.state.images}
          sliderBoxHeight={300}
          onCurrentImagePressed={index => {
            // console.warn(`image ${index} pressed`);
            const screens = ['HospitalTips', 'PharmaceuticalTips', 'ConvenienceTip']; // 스크린 이름 배열
            const targetScreen = screens[index];
            if (targetScreen) {
              this.props.navigation.navigate(targetScreen); // 해당 스크린으로 이동
            }
          }}
          dotColor="#FFEE58"
          inactiveDotColor="#90A4AE"
          paginationBoxVerticalPadding={20}
          autoplay
          circleLoop
          resizeMethod={'resize'}
          resizeMode={'cover'}
          paginationBoxStyle={{
            position: "absolute",
            bottom: 0,
            padding: 0,
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            paddingVertical: 20
          }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            padding: 0,
            margin: 0,
            backgroundColor: "rgba(128, 128, 128, 0.92)"
          }}
          ImageComponentStyle={{
            borderRadius: 15,
            width: '70%',
            marginTop: 5,
            alignSelf: 'center',
          }}
          imageLoadingColor="#2196F3"
        />

       <ScrollView style={styles.textContainer}>
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>의약품</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("PharmaceuticalTips",{screen:'PharmaceuticalTips'})}>
            <View style={styles.tipTextContainer}>
              <Text style={styles.tipText}>
                <Text style={{ marginLeft: 40 }}>             의약품 팁 보러가기                     {'>'}</Text>
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>병원</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("HospitalTips",{screen:'HospitalTips'})}>
            <View style={styles.tipTextContainer}>
              <Text style={styles.tipText}>
                <Text style={{ marginLeft: 40 }}>             병원 팁 보러가기                         {'>'}</Text>
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>게시판</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("ConvenienceTip",{screen:'ConvenienceTip'})}>
            <View style={styles.tipTextContainer}>
              <Text style={styles.tipText}>
                <Text style={{ marginLeft: 40 }}>             게시판 보러가기                  {'>'}</Text> 
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // 배경을 흰색으로 설정
  },
  textContainer: {
    marginTop: 40,
    paddingHorizontal: 20,
    marginLeft: 20
  },
  categoryContainer: {
    marginBottom: 20,
  },
  tipTextContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  tipText: {
    fontSize: 20,
    color: 'gray',
  },
});
