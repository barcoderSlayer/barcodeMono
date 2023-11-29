import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const window = Dimensions.get('window');

const LanguageButton = ({ language, onPress, isSelected }) => {
  const backgroundColor = isSelected ? 'grey' : 'black';
  return (
    <TouchableOpacity
      style={[styles.languageButton, { backgroundColor, width: window.width * 0.8 }]}
      onPress={() => onPress(language)}
    >
      <Text style={[styles.languageText, { color: isSelected ? 'white' : 'white' }]}>
        {language}
      </Text>
    </TouchableOpacity>
  );
};

export default function LanguageModi() {
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  useEffect(() => {
    const getLanguageSetting = async () => {
      const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
      setSelectedLanguage(savedLanguage);
    };

    getLanguageSetting();
  }, []);

  const handleLanguageSelect = async (language) => {
    setSelectedLanguage(language);
    await AsyncStorage.setItem('selectedLanguage', language);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Language</Text>
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
