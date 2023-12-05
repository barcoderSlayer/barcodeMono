import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';

const { width, height } = Dimensions.get('window');


export default function ProductScan() {

return (
    <View style={styles.container}>
      <View style={styles.topContainer}>

      </View>
      <View style={styles.bottomContainer}>
        <Text>최근 스캔 기록</Text>
      </View>
    </View>
);
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
},
topContainer:{
    flex:1,
    backgroundColor:'orange',
},
bottomContainer:{
    flex:1,
    backgroundColor:'black'
    
}
});
