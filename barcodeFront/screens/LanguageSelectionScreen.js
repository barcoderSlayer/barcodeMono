// LanguageSelectionScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LanguageButton = ({ language, onPress, isSelected }) => {
  const backgroundColor = isSelected ? 'grey' : 'black';
  const textColor = isSelected ? 'white' : 'white';

  return (
    <TouchableOpacity
      style={[styles.languageButton, { backgroundColor }]}
      onPress={onPress}
    >
      <Text style={[styles.languageText, { color: textColor }]}>
        {language}
      </Text>
    </TouchableOpacity>
  );
};

export default function LanguageSelectionScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const navigation = useNavigation();

  // 컴포넌트가 마운트될 때 저장된 언어 설정을 확인합니다.
  useEffect(() => {
    const checkLanguageSetting = async () => {
      const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
      // 저장된 언어 설정이 있다면, LanguageSelectionScreen을 건너뛰고 Home 화면으로 이동합니다.
      if (savedLanguage) {
        navigation.navigate('HomeScreen');
      }
    };

    checkLanguageSetting();
  }, [navigation]);

  const handleLanguageSelect = async (language) => {
    setSelectedLanguage(language);
    await AsyncStorage.setItem('selectedLanguage', language);
  };

  const handleConfirm = async () => {
    if (selectedLanguage) {
      await AsyncStorage.setItem('selectedLanguage', selectedLanguage);
      navigation.navigate('HomeScreen'); // 'HomeScreen'으로 이동합니다.
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Language</Text>
      <LanguageButton
        language="한국어"
        onPress={() => handleLanguageSelect('ko')}
        isSelected={selectedLanguage === 'ko'}
      />
      <LanguageButton
        language="English"
        onPress={() => handleLanguageSelect('en')}
        isSelected={selectedLanguage === 'en'}
      />
      <LanguageButton
        language="日本語"
        onPress={() => handleLanguageSelect('ja')}
        isSelected={selectedLanguage === 'ja'}
      />
      <LanguageButton
        language="中文"
        onPress={() => handleLanguageSelect('zh')}
        isSelected={selectedLanguage === 'zh'}
      />
      <Button title="Confirm" onPress={handleConfirm} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  languageButton: {
    width: '80%',
    padding: 15,
    margin: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});