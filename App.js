import 'react-native-reanimated';
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import Tabs from "./00_Navigation/tab";
import { NavigationContainer } from "@react-navigation/native";
import loadResourcesAsync from "./02_Utility/loadResourcesAsync";
import { useEffect, useState } from "react";
import 'react-native-gesture-handler';
import * as Font from 'expo-font';

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
    return null; // or a loading screen component
  }

  return (
    <NavigationContainer>
      <Tabs />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
