import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const window = Dimensions.get('window');

const LanguageButton = ({ language, onPress, isSelected }) => {
  const backgroundColor = isSelected ? 'grey' : 'black';
  return (
    <TouchableOpacity
      style={[styles.languageButton, { backgroundColor }]}
      onPress={onPress}
    >
      <Text style={[styles.languageText, { color: isSelected ? 'white' : 'white' }]}>
        {language}
      </Text>
    </TouchableOpacity>
  );
};

export default function LanguageSelectionScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const checkLanguageSetting = async () => {
      const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
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
      navigation.navigate('HomeScreen');
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
    width: window.width * 0.8,
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
