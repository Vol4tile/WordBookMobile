import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import logo from "../assets/bagisoftnobacklogo.png";
function HomeScreen({ navigation }) {
  return (
    <LinearGradient
      colors={["#56CCF2", "#2F80ED"]}
      style={styles.linearGradient}
    >
      <SafeAreaView style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <View style={styles.main}>
          <Text style={styles.welcomeText}>WordBook'a hoşgeldin</Text>
          <Text style={styles.infoText}>
            İstediğin kelimeyi kaydet ve kendini sına!
          </Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Words")}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Haydi Başlayalım!</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    position: "relative",
    alignItems: "center",
    justifyContent: "space-around",
  },
  logo: {
    height: 100,
    width: 100,
  },
  main: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
  },
  welcomeText: {
    fontSize: 25,
    color: "white",
    fontWeight: "900",
  },
  infoText: {
    fontSize: 18,
    color: "white",
  },

  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 40,
    paddingVertical: 20,

    borderRadius: 30,
    backgroundColor: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonText: {
    fontFamily: "monospace",
    color: "#2980B9",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default HomeScreen;
