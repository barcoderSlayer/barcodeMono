import React from 'react';
import { StyleSheet, View, Text, Image, FlatList, TextInput } from 'react-native';

const ProductRecords = () => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="바코드 기록검색"
      />
      <FlatList
        data={[]} // 스캔한 바코드 데이터
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.barcode}>{item.barcode}</Text> {/* 바코드 번호를 표시합니다 */}
            <Text style={styles.date}>{item.date}</Text> {/* 스캔 날짜를 표시합니다 */}
          </View>
        )}
        

        keyExtractor={item => item.id} // 각 항목의 고유 ID를 키로 사용합니다
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
  date: {
    fontSize: 14,
    color: '#666',
  },
});

export default ProductRecords;
