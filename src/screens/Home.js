import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Switch,
  Button,
  Alert,
  Picker,
} from "react-native";
import { Clipboard } from "react-native-web";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Home() {
  const [password, setPassword] = useState("");
  const [characterCount, setCharacterCount] = useState(8);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [includeUpperCase, setIncludeUpperCase] = useState(true);
  const [includeLowerCase, setIncludeLowerCase] = useState(true);
  const [includeCamelCase, setIncludeCamelCase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [lettersOnly, setLettersOnly] = useState(false);
  const [numbersOnly, setNumbersOnly] = useState(false);
  const [prefixOrSuffix, setPrefixOrSuffix] = useState("");
  const [specificCharacter, setSpecificCharacter] = useState("");

  const generatePassword = () => {
    let charset = "";

    // Include selected character sets
    if (includeUpperCase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowerCase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (includeNumbers) charset += "0123456789";
    if (includeCamelCase)
      charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbersOnly) charset = "0123456789";
    if (lettersOnly)
      charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (!charset) {
      Alert.alert("Please select at least one character set.");
      return;
    }

    let newPassword = "";
    for (let i = 0; i < characterCount; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }

    // Add prefix or suffix if specified
    if (prefixOrSuffix === "prefix")
      newPassword = specificCharacter + newPassword;
    else if (prefixOrSuffix === "suffix") newPassword += specificCharacter;

    setPassword(newPassword);
  };
  const copyToClipboard = () => {
    Clipboard.setString(password);
    Alert.alert("Password copied to clipboard");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.passwordText}>{password}</Text>

      <Button title="Copy to Clipboard" onPress={copyToClipboard} />
      <Icon
        name="copy" // Specify the icon name
        size={24} // Adjust the size of the icon
        color="#000" // Adjust the color of the icon
        onPress={copyToClipboard} // Attach onPress event handler
      />

      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          if (!isNaN(parseInt(text))) {
            setCharacterCount(parseInt(text));
          } else if (text === "") {
            setCharacterCount(0); // Or any default value you prefer
          }
        }}
        value={characterCount === 0 ? "" : String(characterCount)}
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
        <Text>Digits</Text>
        <Switch value={includeNumbers} onValueChange={setIncludeNumbers} />
      </View>
      {/* <View style={styles.switchContainer}>
        <Text>Camel Case</Text>
        <Switch value={includeCamelCase} onValueChange={setIncludeCamelCase} />
      </View> */}
      <View style={styles.switchContainer}>
        <Text>Letters Only</Text>
        <Switch value={lettersOnly} onValueChange={setLettersOnly} />
      </View>
      <View style={styles.switchContainer}>
        <Text>Numbers Only</Text>
        <Switch value={numbersOnly} onValueChange={setNumbersOnly} />
      </View>
      <Picker
        style={styles.input}
        selectedValue={prefixOrSuffix}
        onValueChange={(itemValue) => setPrefixOrSuffix(itemValue)}
      >
        <Picker.Item label="None" value="" />
        <Picker.Item label="Prefix" value="prefix" />
        <Picker.Item label="Suffix" value="suffix" />
      </Picker>

      <TextInput
        style={styles.input}
        onChangeText={(text) => setSpecificCharacter(text)}
        value={specificCharacter}
        placeholder={prefixOrSuffix}
      />
      <Button title="Generate Password" onPress={generatePassword} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 50,
    width: "80%",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    color: "#333",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  passwordText: {
    fontSize: 24, // Adjust the font size as needed
    textAlign: "center", // Center the text horizontally
    marginTop: 20, // Add some top margin for spacing
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    width: "80%",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
