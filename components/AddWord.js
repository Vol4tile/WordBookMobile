import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  StyleSheet,
} from "react-native";
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
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeTr}
        placeholder="TR"
        value={tr}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeEn}
        value={en}
        placeholder="EN"
      />

      
      <TouchableOpacity
        style={styles.TouchableOpacity}
        onPress={() => onPress()}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>Kelime Ekle</Text>
        </View>
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
    width: 200,
   padding:20,
   backgroundColor:"#fff",
   borderRadius:20,
    flexWrap: "wrap",
  },
  input: {
    
    borderBottomColor:"black",
    borderBottomWidth:1,
    padding: 10,
    width: "100%",
  },
  TouchableOpacity: {
    width: "100%",
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: "#00B4DB",
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonText: {
    color: "white",
  },
});
export default AddWord;
