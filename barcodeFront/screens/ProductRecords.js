import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductRecords = () => {
    const [records, setRecords] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 추가

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const savedRecords = await AsyncStorage.getItem('productRecords');
                setRecords(savedRecords ? JSON.parse(savedRecords) : []);
            } catch (e) {
                console.error('Failed to load data', e);
            }
        };

        fetchRecords();
    }, []);

    // 검색 기능 구현
    const filteredRecords = records.filter(record => {
        return record.productName.toLowerCase().includes(searchTerm.toLowerCase()) || 
               record.barcode.includes(searchTerm);
    });

    return (
        <View style={styles.container}>
            {/* 검색바에 텍스트 입력 처리 */}
            <TextInput 
                style={styles.searchBar} 
                placeholder="바코드 기록검색"
                onChangeText={text => setSearchTerm(text)}
            />
            <FlatList
                data={filteredRecords} // 필터링된 데이터 사용
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.barcode}>{item.barcode}</Text>
                        <Text style={styles.productName}>{item.productName}</Text>
                        <Text style={styles.date}>{item.date}</Text>
                    </View>
                )}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchBar: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 10,
        borderColor: '#CCC',
        borderRadius: 20,
        alignSelf: 'stretch',
        marginLeft: 20,
        marginRight: 20,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    barcode: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    productName: {
        fontSize: 16,
        color: '#000',
    },
    date: {
        fontSize: 14,
        color: '#666',
    },
});

export default ProductRecords;
