import 'react-native-reanimated';
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import Tabs from "./00_Navigation/tab";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import loadResourcesAsync from "./02_Utility/loadResourcesAsync";
import { useEffect, useState } from "react";
import 'react-native-gesture-handler';
import * as Font from 'expo-font';


// Import your extra screen(s)
import ReelOptions from "./01_Screens/ReelOptions"; 

const Stack = createNativeStackNavigator();

export default function App() {
  const [ready, setReady] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function prepare() {
      await loadResourcesAsync();
      await Font.loadAsync({
        RegestoGroteskBlack: require("./assets/03_Fonts/Regesto/RegestoGrotesk-Black.ttf"),
        RegestoGroteskBold: require("./assets/03_Fonts/Regesto/RegestoGrotesk-Bold.ttf"),
        RegestoGroteskMedium: require("./assets/03_Fonts/Regesto/RegestoGrotesk-Medium.ttf"),
        RegestoGroteskRegular: require("./assets/03_Fonts/Regesto/RegestoGrotesk-Regular.ttf"),
        RegestoGroteskLight: require("./assets/03_Fonts/Regesto/RegestoGrotesk-Light.ttf"),

        BenzinBold: require("./assets/03_Fonts/Benzin/Benzin-Bold.ttf"),
        BenzinExtrabold: require("./assets/03_Fonts/Benzin/Benzin-ExtraBold.ttf"),
        BenzinMedium: require("./assets/03_Fonts/Benzin/Benzin-Medium.ttf"),
        BenzinRegular: require("./assets/03_Fonts/Benzin/Benzin-Regular.ttf"),
        BenzinSemibold: require("./assets/03_Fonts/Benzin/Benzin-Semibold.ttf"),
      });
      setFontsLoaded(true);
      setReady(true);
    }
    prepare();
  }, []);

  if (!ready) {
    return null; // or a loading screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Tabs stay as your main navigation */}
        <Stack.Screen name="Tabs" component={Tabs} />

        {/* Extra screens go here */}
        <Stack.Screen name="ReelOptions" component={ReelOptions} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
