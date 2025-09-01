// CountdownOverlay.js
import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native";
import { Audio } from "expo-av";

const { height, width } = Dimensions.get("window");

const CountdownOverlay = ({ onFinish, mode = "countdown" }) => {
  const [count, setCount] = useState(mode === "countdown" ? 3 : "REST");
  const slideAnim = useRef(new Animated.Value(height)).current;

  // beep only during countdown
  const playBeep = async () => {
    if (mode !== "countdown") return;
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/04_Audio/Beep_mixdown2.wav")
    );
    await sound.playAsync();
  };

  const animateSlide = () => {
    slideAnim.setValue(height);
    Animated.timing(slideAnim, {
      toValue: height / 2 - 500, // slide to middle
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(slideAnim, {
          toValue: height /2  - 1500, // slide out
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          if (mode === "countdown") {
            if (count > 1) {
              setCount((prev) => prev - 1);
            } else if (count === 1) {
              setCount("GO");
            } else {
              onFinish?.();
            }
          } else {
            // REST mode, finish after showing once
            onFinish?.();
          }
        });
      }, 400);
    });
  };


  useEffect(() => {
    playBeep();
    animateSlide();
  }, [count]);

  return (
    <View style={styles.overlay}>
      <Animated.Text
        style={[
          styles.countText,
          { transform: [{ translateY: slideAnim }] },
        ]}
      >
        {count}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#00032980",

    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  countText: {
    fontSize: 108,
    color: "#DBF208",
    fontFamily: "BenzinSemibold",
    textAlign: "center",
    
  },
});

export default CountdownOverlay;
