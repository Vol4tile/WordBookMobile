import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
const AddWord = ({ wordList, setWordList }) => {
  const [tr, onChangeTr] = React.useState("");
  const [en, onChangeEn] = React.useState("");
  const onPress = async () => {
    try {
      var addedList = wordList;

      addedList.push({ tr, en });

      // Step 3: Güncellenmiş diziyi AsyncStorage'e kaydedin
      await AsyncStorage.setItem("words", JSON.stringify(addedList));
      setWordList(addedList);
    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <View style={styles.container}  >
      <TextInput
        style={styles.inputTr}
        onChangeText={onChangeTr}
        placeholder="TR"
        value={tr}
      />
      <TextInput
        style={styles.inputEn}
        onChangeText={onChangeEn}
        value={en}
        placeholder="EN"
      />

      <TouchableOpacity style={styles.TouchableOpacity} onPress={onPress}>
        <LinearGradient
          style={styles.button}
          colors={["#56CCF2", "#2F80ED"]}
          start={{ x: 0, y: 0 }} // Specify the start position (left)
          end={{ x: 1, y: 0 }}
        >
          <Text style={{ color: "white" }}>Ekle</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    gap: 5,
    alignItems: "center",
    width: 250,
    padding: 10,
    backgroundColor: "#fff",

    borderRadius: 20,
    flexWrap: "wrap",
  
  },
  inputTr: {
    borderBottomColor: "#c471ed",
    borderBottomWidth: 1,
    padding: 10,
    width: "100%",
  },
  inputEn: {
    borderBottomColor: "#12c2e9",
    borderBottomWidth: 1,
    padding: 10,
    width: "100%",
  },
  TouchableOpacity: {
    width: "100%",
  },
  button: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,

    textAlign: "center",
    fontWeight: "bold",
  },
  buttonText: {
    color: "white",
  },
});
export default AddWord;
