import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button,  } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import axios from 'axios';
import config from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

export default function Camera() {

    const [hasPermission, setHasPermission] = useState(null); // 카메라 접근 권한
    const [scanned, setScanned] = useState(false); //스캔여부
    const [notData, setNotData] = useState(false);
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    // barcode data
    const [barcodeNumData, setBarcodeNumdata] = useState("");

    const [productData, setProductData] = useState({}); //상품 정보
    const [productName, setProductName] = useState(""); //상품 이름
    const [productDivision, setProductDivision] = useState();
    const [imgUrl, setImgUrl] = useState(""); //상품 이미지 url





    //화면 초기에 들어왔을 시 Scanned false상태로바꾸기
    useEffect(() => {
        setScanned(false);
        console.disableYellowBox = true;

    }, [isFocused]);


    //다시 스캔하기 버튼 누를시 scanned상태 변경
    useEffect(() => {
        let cameraActive = true;

        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();

        return () => {
            //컴포넌트가 언마운트되면 카메라 중지
            cameraActive = false;
        }
    }, []);




    const handleBarCodeScanned = ({ type, data }) => {
        if (!scanned) {
            setScanned(true);

            console.log('data', data)
            // scan 한 바코드 넘버 set
            setBarcodeNumdata(data)

            // getdata 요청
            getData(data);

            // 바코드 데이터를 다음 페이지로 전달하면서 이동
            // navigation.navigate("ProductInformationScreen", { barcodeData: data });
        }

        //카메라 권한 요청 // 권한 확인
    };
    if (hasPermission === null) {
        return <Text>카메라 권한 요청 중</Text>;
    }
    if (hasPermission === false) {
        return <Text>카메라 접근 권한이 없습니다.</Text>;
    }



    // data get요청
    const getData = async (data) => {
        try {
            const response = await axios.get(`${config.LOCALHOST_IP}/barcodePage/?barcodeNumData=${data}`);
            console.log("요청 후 받아온 데이터", response.data);

            // 상품을 찾을 수 없을 때 
            if (response.data && response.data[0].productNameKr===null){
                console.log('response.data.productNameKr', response.data.productNameKr)
                setNotData(true)
            }

            // 서버 요청해서 값 받아옴
            if (response.data && response.data.length > 0 && response.data[0].productNameKr!==null) {
                const data = response.data;
                setProductData(data);
                setProductName(data.productNameKr);
                setProductDivision(data.division);
                setImgUrl(data.imageUrl);

                // asyncStorage 저장
                saveBarcodeToStorage(response.data)

            } else {
                console.log("데이터가 없습니다.");
            }
        } catch (error) {
            console.error("데이터 요청 중 에러 발생:", error);
        }
    }


    // AsyncStorage에 바코드 데이터 저장
    const saveBarcodeToStorage = async (data) => {
        try {
            console.log('saveBarcodeToStorage', data);
            // AsyncStorage에서 저장된 바코드 데이터 불러오기
            const existingData = await AsyncStorage.getItem('productData'); 
            console.log(typeof(existingData)) // string type

            //기존 데이터가 없을 경우
            if (!existingData) {
                // const newData = [productData];
                await AsyncStorage.setItem('productData', JSON.stringify(data));
                
            } else {
                //기존 데이터가 있을 경우 = JSON으로 변환
                let parsedData = JSON.parse(existingData);
                // check
                console.log('원래 async에 저장되어 있는 값 parsedData=======', parsedData)
                console.log('parsedData type ======= ', typeof(parsedData))
                console.log('이미 존재 여부 확인 =====', existingData.includes(data[0].barcodeNum)) 
 
                // 같은 값이 있다면 삭제하고 마지막 값으로 추가하기
                parsedData = parsedData.filter((obj) => {
                    if (data[0].barcodeNum == obj.barcodeNum) console.log('if')
                    return obj.barcodeNum != data[0].barcodeNum
                })
                parsedData.push(data[0]);

                await AsyncStorage.setItem('productData', JSON.stringify(parsedData));
         
            }

            // 바코드 데이터를 다음 페이지로 전달하면서 이동
            // navigation ProductInformationScreen
            navigation.navigate("ProductInformationScreen", { barcodeData: data[0] })


        } catch (error) {
            console.log("바코드 데이터 스토리지 저장 중 에러 ", error);
        }
    }

    // 구 버전 코드 ↓↓↓↓↓↓ 신버전 코드 ↑↑↑↑↑↑0차이점 공부하기



    /*
    // AsyncStorage에 바코드 데이터 저장
    const saveBarcodeToStorage = async (data) => {
        try {
            console.log('saveBarcodeToStorage', data);
            // AsyncStorage에서 저장된 바코드 데이터 불러오기
            const existingData = await AsyncStorage.getItem('productData');

            // 기존 데이터가 없을 경우
            if (!existingData) {
                const newData = data;
                await AsyncStorage.setItem('productData', JSON.stringify(newData));
                navigation.navigate("ProductInformationScreen", { barcodeData: data });
                return;
            } else {
                // 기존 데이터가 있을 경우
                const parsedData = JSON.parse(existingData);

                // 기존 데이터가 배열이 아닌 경우, 배열로 변환
                const dataArray = Array.isArray(parsedData) ? parsedData : [parsedData];

                // 중복된 데이터를 방지하기 위해 이미 존재하는지 확인
                if (!dataArray.some(item => item.barcodeNum === data.barcodeNum)) {
                    dataArray.push(data);

                    await AsyncStorage.setItem('productData', JSON.stringify(dataArray));
                    console.log('데이터를 저장했습니다.', JSON.stringify(dataArray));
                }
            }

            // 바코드 데이터를 다음 페이지로 전달하면서 이동
            navigation.navigate("ProductInformationScreen", { barcodeData: data[0] });
        } catch (error) {
            console.log("바코드 데이터 스토리지 저장 중 에러 ", error);
        }
    }
*/


    return (
        <View style={styles.container}>
            {isFocused && ( //활성화된 탭일 때만 카메라 실행
                <BarCodeScanner
                    onBarCodeScanned={handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            )}
            {scanned && (
                <>
                    <Button title={'다시 스캔하기'} onPress={() => setScanned(false)} />
                    {
                        notData &&
                        <Text onPress={() => navigation.navigate("HomeScreen")}>데이터가 존재하지 않습니다.</Text>
                    }
                </>
            )}
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});