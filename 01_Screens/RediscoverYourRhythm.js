import React, { useRef, useEffect } from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import { Video } from "expo-av";

const RediscoverYourRhythm = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playAsync(); // autoplay
    }
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/01_Images/Backgrounds/RYR Bg.png")}
        style={styles.background}
      >
        <Video
          ref={videoRef}
          source={require("../assets/02_Videos/ExerciseVid/SLR_EtS_2.mp4")}
          style={styles.video}
          resizeMode="cover"
          shouldPlay
          isLooping
          isMuted={false}
          useNativeControls={false} // no controls
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  video: {
    width: "100%",
    height: 640, // top video banner height
    alignSelf: "flex-start",
    borderRadius: 12,
  },
});

export default RediscoverYourRhythm;
