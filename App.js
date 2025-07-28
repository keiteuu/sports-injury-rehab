import { StatusBar } from "expo-status-bar";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import Tabs from "./00_Navigation/tab";
import { NavigationContainer } from "@react-navigation/native";
import loadResourcesAsync from "./02_Utility/loadResourcesAsync";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    async function prepare() {
      await loadResourcesAsync();
      setReady(true);
    }
    prepare();
  }, []);

  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
