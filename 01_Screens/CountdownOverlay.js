// CountdownOverlay.js
import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { Audio } from "expo-av";

const CountdownOverlay = ({ mode = "countdown", onFinish }) => {
  const [index, setIndex] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const beep = useRef(new Audio.Sound());

  const countdownValues = ["3", "2", "1", "GO"];

  useEffect(() => {
    if (mode === "countdown") {
      loadBeep();
      setIndex(0);
      runCountdown(0);
    } else if (mode === "rest") {
      runRest();
    }

    return () => {
      beep.current.unloadAsync();
    };
  }, [mode]);

  // Load beep sound
  const loadBeep = async () => {
    try {
      await beep.current.loadAsync(require("../assets/sounds/beep.mp3"));
    } catch (e) {
      console.log("Beep load error:", e);
    }
  };

  // Countdown animation
  const runCountdown = (i) => {
    if (i >= countdownValues.length) {
      onFinish?.();
      return;
    }

    slideAnim.setValue(300); // start below
    opacity.setValue(0);

    Animated.sequence([
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(100), // ensure visibility
      Animated.call([], async () => {
        try {
          await beep.current.replayAsync();
        } catch {}
      }),
      Animated.delay(400),
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -300, // slide out up
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      setIndex(i + 1);
      setTimeout(() => runCountdown(i + 1), 200);
    });
  };

  // Rest animation
  const runRest = () => {
    opacity.setValue(0);
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(3000), // "REST" stays for 3 sec
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => onFinish?.());
  };

  return (
    <View style={styles.overlay}>
      {mode === "countdown" && index < countdownValues.length && (
        <Animated.Text
          style={[
            styles.countdownText,
            { opacity, transform: [{ translateY: slideAnim }] },
          ]}
        >
          {countdownValues[index]}
        </Animated.Text>
      )}
      {mode === "rest" && (
        <Animated.Text style={[styles.countdownText, { opacity }]}>
          REST
        </Animated.Text>
      )}
    </View>
  );
};

export default CountdownOverlay;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)", // dark overlay
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99,
  },
  countdownText: {
    fontSize: 72,
    fontWeight: "bold",
    color: "#FFF94C",
    textAlign: "center",
  },
});
