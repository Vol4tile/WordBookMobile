import * as React from "react";
import { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import AddWord from "../components/AddWord";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { LinearGradient } from "expo-linear-gradient";
import MainSVG from "../assets/mainpage.svg";
import Word from "../components/Word";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height
const WordsScreen = ({ navigation }) => {
  const [toggle, setToggle] = React.useState(false);
  const [wordList, setWordList] = React.useState([]);

  const handleAddWord = () => {
    setToggle(true);
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <LinearGradient
          colors={["#56CCF2", "#2F80ED"]}
          start={{ x: 0, y: 0 }} // Specify the start position (left)
          end={{ x: 1, y: 0 }}
          style={styles.addWordContainer}
        >
          <TouchableOpacity style={styles.full} onPress={handleAddWord}>
            <View style={styles.addWord}>
              <Text style={styles.colorWhite}>Kelime Ekle</Text>
              <AntDesign name="pluscircleo" size={20} color="white" />
            </View>
          </TouchableOpacity>
        </LinearGradient>
      ),
    });
  }, [navigation]);

  const getWordList = async () => {
    try {
      const value = await AsyncStorage.getItem("words");
      const valLen = JSON.parse(value).length;

      if (!value || valLen < 1) {
        const defaultWordList = [
          { tr: "ev", en: "house" },
          { tr: "ağaç", en: "tree" },
          { tr: "kitap", en: "book" },
          { tr: "bilgisayar", en: "computer" },
          { tr: "güneş", en: "sun" },
          { tr: "masa", en: "table" },
          { tr: "kapı", en: "door" },
          { tr: "araba", en: "car" },
          { tr: "kalem", en: "pen" },
          { tr: "kedi", en: "cat" },
          { tr: "kış", en: "winter" },
          { tr: "gökyüzü", en: "sky" },
          { tr: "deniz", en: "sea" },
          { tr: "gözlük", en: "glasses" },
          { tr: "gül", en: "rose" },
          { tr: "telefon", en: "phone" },
          { tr: "ay", en: "moon" },
          { tr: "yıldız", en: "star" },
          { tr: "renk", en: "color" },
          { tr: "gün", en: "day" },
          { tr: "gece", en: "night" },
          { tr: "su", en: "water" },
          { tr: "yemek", en: "food" },
          { tr: "yürüyüş", en: "walk" },
          { tr: "gülümseme", en: "smile" },
          { tr: "göz", en: "eye" },
          { tr: "kuş", en: "bird" },
          { tr: "hava", en: "weather" },
          { tr: "müzik", en: "music" },
          { tr: "film", en: "movie" },
          { tr: "yıllık", en: "annual" },
          { tr: "yabancı", en: "foreign" },
          { tr: "şehir", en: "city" },
          { tr: "orman", en: "forest" },
          { tr: "çiçek", en: "flower" },
          { tr: "saat", en: "clock" },
          { tr: "güzel", en: "beautiful" },
          { tr: "hızlı", en: "fast" },
          { tr: "yavaş", en: "slow" },
          { tr: "yukarı", en: "up" },
          { tr: "aşağı", en: "down" },
          { tr: "sol", en: "left" },
          { tr: "sağ", en: "right" },
          { tr: "genç", en: "young" },
          { tr: "yaşlı", en: "old" },
          { tr: "siyah", en: "black" },
          { tr: "beyaz", en: "white" },
          { tr: "kırmızı", en: "red" },
          { tr: "mavi", en: "blue" },
          { tr: "yeşil", en: "green" },
          { tr: "sarışın", en: "blond" },
          { tr: "esmer", en: "brunette" },
          { tr: "renkli", en: "colorful" },
          { tr: "ses", en: "sound" },
          { tr: "sessiz", en: "quiet" },
          // ... ve daha fazla kelime
        ];

        setWordList(defaultWordList);
        await AsyncStorage.setItem("words", JSON.stringify(defaultWordList));
      } else {
        setWordList(JSON.parse(value));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getWordList();
  }, []);

  return (
    <View style={styles.screen}>
      <TouchableWithoutFeedback onPress={() => setToggle(false)}>
        <View style={styles.container}>
          <LinearGradient
            colors={["#56CCF2", "#2F80ED"]}
            start={{ x: 0, y: 0 }} // Specify the start position (left)
            end={{ x: 1, y: 0 }} // Specify the end position (right)
            style={styles.linearGradient}
          >
            <View style={styles.top}>
              <MainSVG height={height / 5} width={"50%"} />
              <View style={styles.right}>
                <Text style={styles.text}>
                  Burada kelimelerini görebilirsin.
                </Text>
                <Text style={styles.text}>
                  {" "}
                  Yeni kelime eklemek için kelime ekle butonunu kullan
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.text}>Kendini sınamak mı istiyorsun </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Test")}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Teste başla</Text>
                </View>
              </TouchableOpacity>
            </View>
          </LinearGradient>
          {toggle && (
            <View style={styles.toggle} onPress={handleAddWord}>
              <AddWord
                wordList={wordList}
                setToggle={setToggle}
                setWordList={setWordList}
              />
            </View>
          )}

          <View style={styles.flatList}>
            <FlashList
              data={wordList}
              keyExtractor={(item, index) => index.toString()} // Assuming index can be used as a key
              renderItem={({ item, index }) => (
                <Word
                  item={item}
                  index={index}
                  wordList={wordList}
                  setWordList={setWordList}
                />
              )}
              estimatedItemSize={500}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    height: "100%",
  },
  safeAreaView: {
    width: "100%",
    height: "100%",
  },
  right: {
    width: "50%",
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    position: "relative",
    alignItems: "center",
    backgroundColor: "white",
  },
  linearGradient: {
    display: "flex",

    padding: 20,
    width: "90%",
    minHeight: "25%",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  top: {
    display: "flex",
    flexDirection: "row",
  },
  full: { width: "100%", height: "100%" },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
    backgroundColor: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonText: {
    color: "#2980B9",
    fontSize: 16,
    fontWeight: "600",
  },
  text: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "sans-serif-medium",
    marginBottom: 5,
  },
  addWordContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    left: "5%",
    zIndex: 99,

    borderRadius: 25,
  },
  addWord: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 15,
    gap: 5,
  },
  toggle: {
    position: "absolute",
    top: "50%",

    zIndex: 9999,
  },

  colorWhite: {
    color: "white",
  },
  flatList: {
   flex:1,
    width: (width * 8) / 10,
    zIndex: 98,
  },
});
export default WordsScreen;
