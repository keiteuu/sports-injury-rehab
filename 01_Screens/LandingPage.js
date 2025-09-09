import React, { useEffect } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default function LandingPage({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Onboarding1"); // replace so user can't go back
    }, 2000); // 3 seconds

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/01_Images/Backgrounds/Landing Page.png")} // change to your image path
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // fallback background
  },
  image: {
    width: width,
    height: height,
  },
});
