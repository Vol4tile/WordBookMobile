import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import TestScreen from "./screens/TestScreen";
import WordsScreen from "./screens/WordsScreen";
import { FontAwesome } from '@expo/vector-icons';
import { View,Text } from "react-native";
const Stack = createNativeStackNavigator();

function App() {
  return (
   
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Anasayfa">
        <Stack.Screen
          name="Anasayfa"
          options={{
            headerShown: false,
          }}
          component={HomeScreen}
        />
        <Stack.Screen name="Test" options={() => ({
    headerTitle: (props) => (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesome name="pencil-square-o" size={24} color="black" />
        <Text style={{ marginLeft: 10, fontSize: 18 }}>Test</Text>
      </View>
    ),
  })} component={TestScreen} />
        <Stack.Screen name="Words"  component={WordsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
