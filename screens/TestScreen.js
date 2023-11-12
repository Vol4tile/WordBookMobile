import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height
const TestScreen = () => {
  const [wordData, setWordData] = useState({
    turkishWord: "",
    correctTranslation: "",
    options: [],
    userAnswer: null,
  });
  const [score, setScore] = useState(0);

  const optionLetters = ["A", "B", "C", "D", "E"];

  useEffect(() => {
    getNextQuestion();
  }, []);

  const getNextQuestion = () => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("words");
        if (jsonValue !== null) {
          const words = JSON.parse(jsonValue);

          const randomWordIndex = Math.floor(Math.random() * words.length);
          const randomWord = words[randomWordIndex];

          const correctTranslation = randomWord.en;

          const options = [correctTranslation];
          while (options.length < 5) {
            const randomOptionIndex = Math.floor(Math.random() * words.length);
            const randomOption = words[randomOptionIndex].en;
            if (!options.includes(randomOption)) {
              options.push(randomOption);
            }
          }

          options.sort(() => Math.random() - 0.5);

          setWordData({
            turkishWord: randomWord.tr,
            correctTranslation: correctTranslation,
            options: options,
            userAnswer: null,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  };

  const handleOptionClick = (option) => {
    if (wordData.userAnswer === null) {
      setWordData((prevData) => ({ ...prevData, userAnswer: option }));

      if (option === wordData.correctTranslation) {
        setScore((prevScore) => prevScore + 1);
      } else {
        setScore((prevScore) => prevScore - 1);
      }
    }
  };

  const getOptionStyle = (option) => {
    if (wordData.userAnswer !== null) {
      if (option === wordData.correctTranslation) {
        return { backgroundColor: "#38ef7d" };
      } else if (option === wordData.userAnswer) {
        return { backgroundColor: "#f64f59" };
      }
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.word}>
        {wordData.turkishWord} kelimesinin ingilizcesi nedir?
      </Text>
      <View style={styles.optionsContainer}>
        {wordData.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleOptionClick(option)}
            style={[styles.option, getOptionStyle(option)]}
            disabled={wordData.userAnswer !== null}
          >
            <Text>
              {optionLetters[index]}) {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.bottom}>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Skor: {score}</Text>
        </View>
        <TouchableOpacity style={styles.nxBtn} onPress={getNextQuestion}>
          <LinearGradient
           style={styles.nxBtn}
            colors={["#56CCF2", "#2F80ED"]}
          
            onPress={getNextQuestion}
            start={{ x: 0, y: 0 }} // Specify the start position (left)
            end={{ x: 1, y: 0 }}
          >
            <Text style={{ color: "white" }}>Yeni Soru</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  word: {
    fontSize: 24,
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: "column",
  },
  bottom: {
    width: width * 0.8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nxBtn: {
    width: width * 0.3,

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    paddingVertical: 8,
  },
  option: {
    backgroundColor: "#eee",
    padding: 10,
    width: width * 0.8,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: "white",
  },
  scoreContainer: {},
  scoreText: {
    fontSize: 18,
  },
});

export default TestScreen;
