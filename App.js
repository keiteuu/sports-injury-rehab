import 'react-native-reanimated';
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import Tabs from "./00_Navigation/tab";
import { NavigationContainer } from "@react-navigation/native";
import loadResourcesAsync from "./02_Utility/loadResourcesAsync";
import { useEffect, useState } from "react";
import 'react-native-gesture-handler';

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      await loadResourcesAsync();
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
