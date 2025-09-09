import React, { useEffect, useRef } from "react";
import { View, Image, StyleSheet, Dimensions, Animated, Pressable } from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function Onboarding1() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const goHome = () => {
    // Reset stack so user can’t go back to onboarding
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Tabs", params: { screen: "Home" } }],
      })
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/01_Images/Onboarding/discover.png")}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Bottom-right icon */}
      <Animated.View style={[styles.iconWrapper, { opacity: fadeAnim }]}>
        <Pressable onPress={goHome}>
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
    bottom: 64,
    right: 16,
  },
  icon: {
    width: 48,
    height: 48,
  },
});
