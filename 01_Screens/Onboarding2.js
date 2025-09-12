import React, { useEffect, useRef } from "react";
import { View, Image, StyleSheet, Dimensions, Animated, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {Onboarding3} from "./Onboarding3";

const { width, height } = Dimensions.get("window");

export default function Onboarding1() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current; // start invisible

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,        // fully visible
        duration: 600,     // fade in duration
        useNativeDriver: true,
      }).start();
    }, 1000); // wait 2 seconds before fading in

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/01_Images/Onboarding/rhythm.png")}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Bottom-right icon */}
      <Animated.View style={[styles.iconWrapper, { opacity: fadeAnim }]}>
        <Pressable onPress={() => navigation.navigate("Onboarding3")}>
          <Image
            source={require("../assets/01_Images/Icons/Direct/Type=Next Circle.png")}
            style={styles.icon}
            resizeMode="contain"
          />
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width,
    height: height,
  },
  iconWrapper: {
    position: "absolute",
    bottom: 64, // push up a bit from bottom
    right: 16,  // align near right edge
  },
  icon: {
    width: 48,
    height: 48,
  },
});
