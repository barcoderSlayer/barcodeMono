import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity ,Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";

const { width } = Dimensions.get('window');

export default function BarcodeComponent(props) {

    const [productData, setProductData] = useState(props.productData||{});
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    // props가 변경될 때마다 productData 업데이트
    useEffect(() => {
      if(props.productData){

        setProductData(props.productData);
      }
  }, [props.productData]);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductInformationScreen',{ barcodeData: productData.barcodeNum })}
      style={styles.roundedRectangle}
    >
      <View style={styles.imageContainer}>
        {
          productData.imageUrl ?
          <Image style={styles.imageStyle} resizeMode='contain' source={{uri:productData.imageUrl}}/> :
          <Image style={styles.imageStyle} resizeMode='contain' source={require('../assets/imgless.jpeg')}/>
        }
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.topText}>{productData.barcodeNum}</Text>
        <Text style={styles.productName}>{productData.productNameKr}</Text>
        <Text style={styles.rating}>120</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 10,
    overflow: 'hidden',
    marginLeft: 5,
  },
  roundedRectangle: {
    flexDirection: 'row',
    width: 400,
    height: 100,
    backgroundColor: '#F2F2F2',
    borderRadius: 15,
    margin: 10,
    alignItems: 'center',
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  textContainer: {
    marginLeft: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  rating: {
    fontSize: 14,
    color: 'gray',
  },
  topText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 1,
  },   
});
