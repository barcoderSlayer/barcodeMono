    import React, { useState, useEffect } from 'react';
    import { Text, View, StyleSheet, Button } from 'react-native';
    import { BarCodeScanner } from 'expo-barcode-scanner';
    import { useFocusEffect, useNavigation } from "@react-navigation/native";
    import { useIsFocused } from "@react-navigation/native";



    export default function Camera(){
        
        const [hasPermission, setHasPermission] = useState(null);
        const [scanned, setScanned] = useState(false);
        const navigation = useNavigation();
        const isFocused = useIsFocused();


        //다시 스캔하기 버튼 누를시 scanned상태 변경
        useEffect(() => {
            (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
            })();
        }, [scanned, useIsFocused]);


        const handleBarCodeScanned = ({ type, data }) => {
            setScanned(true);
    
            // 바코드 데이터를 다음 페이지로 전달하면서 이동
            navigation.navigate("ProductInformationScreen", { barcodeData: data });
        };

        useEffect(() => {
            if (isFocused) {
                setScanned(false);
            }
        }, [isFocused])

        //카메라 권한 요청 // 권한 확인
        if (hasPermission === null) {
            return <Text>카메라 권한 요청 중</Text>;
        }
        if (hasPermission === false) {
            return <Text>카메라 접근 권한이 없습니다.</Text>;
        }








        return (
            <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && (
                <Button title={'다시 스캔하기'} onPress={() => setScanned(false)} />
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
