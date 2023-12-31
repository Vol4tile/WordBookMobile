import * as React from "react";
import { memo } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Word = ({ item, index, wordList, setWordList }) => {
  const removeWord = async (index) => {

    const updatedWordList = [...wordList];
 
    updatedWordList.splice(index, 1);
 
    try {
      await AsyncStorage.setItem("words", JSON.stringify(updatedWordList));
      setWordList(updatedWordList);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.listItem}>
      <View style={styles.word}>
        <Text style={styles.tr}>{item.tr}</Text>
        <Text style={styles.en}>{item.en}</Text>
      </View>
      <TouchableOpacity onPress={() => removeWord(index)}>
        <MaterialIcons name="delete" size={20} color="#F51F1E" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f0f0f0",
    marginTop: 10,
    borderRadius: 20,
  },
  word: {
    fontFamily: "sans-serif-medium",
    width: "80%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tr: {
    color: "#c471ed",
    fontSize: 16,
  },
  en: {
    color: "#12c2e9",
    fontSize: 16,
  },
});
export default memo(Word);
