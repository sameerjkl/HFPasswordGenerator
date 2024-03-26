import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Switch, Button, Alert } from 'react-native';

export default function Home() {
  const [password, setPassword] = useState('');
  const [characterCount, setCharacterCount] = useState(8);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [includeUpperCase, setIncludeUpperCase] = useState(true);
  const [includeLowerCase, setIncludeLowerCase] = useState(true);
  const [includeCamelCase, setIncludeCamelCase] = useState(false);
  const [lettersOnly, setLettersOnly] = useState(false);
  const [numbersOnly, setNumbersOnly] = useState(false);
  const [prefixOrSuffix, setPrefixOrSuffix] = useState('');
  const [specificCharacter, setSpecificCharacter] = useState('');

  const generatePassword = () => {
    let charset = '';
    if (includeUpperCase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowerCase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    if (includeCamelCase) charset += 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numbersOnly) charset += '0123456789';
    if (lettersOnly) charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    let newPassword = '';
    for (let i = 0; i < characterCount; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }

    if (prefixOrSuffix === 'prefix') newPassword = specificCharacter + newPassword;
    if (prefixOrSuffix === 'suffix') newPassword += specificCharacter;

    setPassword(newPassword);
  };

  return (
    <View style={styles.container}>
      <Text>Password: {password}</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setCharacterCount(parseInt(text))}
        value={String(characterCount)}
        keyboardType="numeric"
        placeholder="Character Count"
      />
      <View style={styles.switchContainer}>
        <Text>Special Characters</Text>
        <Switch value={includeSymbols} onValueChange={setIncludeSymbols} />
      </View>
      <View style={styles.switchContainer}>
        <Text>Upper Case</Text>
        <Switch value={includeUpperCase} onValueChange={setIncludeUpperCase} />
      </View>
      <View style={styles.switchContainer}>
        <Text>Lower Case</Text>
        <Switch value={includeLowerCase} onValueChange={setIncludeLowerCase} />
      </View>
      <View style={styles.switchContainer}>
        <Text>Camel Case</Text>
        <Switch value={includeCamelCase} onValueChange={setIncludeCamelCase} />
      </View>
      <View style={styles.switchContainer}>
        <Text>Letters Only</Text>
        <Switch value={lettersOnly} onValueChange={setLettersOnly} />
      </View>
      <View style={styles.switchContainer}>
        <Text>Numbers Only</Text>
        <Switch value={numbersOnly} onValueChange={setNumbersOnly} />
      </View>
      <TextInput
        style={styles.input}
        onChangeText={text => setPrefixOrSuffix(text.toLowerCase())}
        value={prefixOrSuffix}
        placeholder="Prefix or Suffix?"
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setSpecificCharacter(text)}
        value={specificCharacter}
        placeholder="Specific Character"
      />
      <Button title="Generate Password" onPress={generatePassword} />
      <StatusBar style="auto" />
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
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    width: '80%',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
  ,
});
