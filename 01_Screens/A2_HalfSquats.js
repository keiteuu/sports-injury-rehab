import React, { useRef, useEffect, useState } from "react";
import { View, ImageBackground, StyleSheet, Animated, Image, Dimensions, TouchableOpacity, Text, Easing } from "react-native";
import { Video } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const A2_HalfSquats = ({ navigation }) => {
  const videoRef = useRef(null);
  const progress = useRef(new Animated.Value(0)).current;
  const spinValue = useRef(new Animated.Value(0)).current;
  const [isPlaying, setIsPlaying] = useState(true);
  const [expanded, setExpanded] = useState(false);

  const videoData = {
    src: require("../assets/02_Videos/ExerciseVid/HalfSquats_EtS_1.mp4"),
    icon: require("../assets/01_Images/SpinningRecord/riize.png"),
    title: "Ember to Solar",
    artist: "RIIZE · Odyssey",
    info: require("../assets/01_Images/ExerciseInfo/HalfSquats.png"),
  };

  // Spin loop
  useEffect(() => {
    if (isPlaying) {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 4000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      spinValue.stopAnimation();
    }
  }, [isPlaying]);

  const handlePlaybackStatus = (status) => {
    if (status.isLoaded) {
      if (status.didJustFinish) {
        navigation.replace("A3_WallSits"); // Go to next page
      } else {
        setIsPlaying(status.isPlaying);
      }
    }
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const slideAnim = useRef(new Animated.Value(0)).current;
  const toggleSlide = () => {
    Animated.timing(slideAnim, {
      toValue: expanded ? 0 : 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
    setExpanded(!expanded);
  };

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-280, 60],
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/01_Images/Backgrounds/RYR Bg.png")}
        style={styles.background}
      >
        {/* Video */}
        <View style={styles.videoWrapper}>
          <Video
            ref={videoRef}
            source={videoData.src}
            style={styles.video}
            resizeMode="cover"
            shouldPlay
            isLooping={false}
            isMuted={false}
            onPlaybackStatusUpdate={handlePlaybackStatus}
          />
        </View>

        {/* Info */}
        <View style={styles.exerciseInfoWrapper}>
          <Image
            source={videoData.info}
            style={styles.exerciseInfo}
            resizeMode="contain"
          />
        </View>

        {/* Record Player */}
        <View style={styles.recordWrapper}>
          <TouchableOpacity onPress={toggleSlide} activeOpacity={0.8} style={styles.recordContainer}>
            <Animated.Image
              source={videoData.icon}
              style={[
                styles.recordIcon,
                { transform: [{ rotate: spin }] },
              ]}
            />
          </TouchableOpacity>
          <Animated.View style={[styles.songInfo, { transform: [{ translateX }] }]}>
            <Text style={styles.songTitle}>{videoData.title}</Text>
            <Text style={styles.songArtist}>{videoData.artist}</Text>
          </Animated.View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1 },
  videoWrapper: {
    width: "100%",
    height: 600,
    borderRadius: 12,
    overflow: "hidden",
  },
  video: { width: "100%", height: "100%" },
  exerciseInfoWrapper: { marginTop: 20, alignItems: "center" },
  exerciseInfo: { width: "95%", height: 164 },
  recordWrapper: { position: "absolute", top: 48, left: 24, flexDirection: "row", alignItems: "center" },
  recordContainer: { width: 96, height: 96, justifyContent: "center", alignItems: "center", zIndex: 3, },
  recordIcon: { width: 96, height: 96 },
  songInfo: { position: "absolute", left: 0, backgroundColor: "#FDFDFD", paddingVertical: 8, paddingRight: 32, paddingLeft: 48, borderRadius: 8, borderWidth: 2, borderColor: "#131A3C" },
  songTitle: { color: "#383B73", fontSize: 18, fontFamily: 'BenzinMedium' },
  songArtist: { color: "#383B73", fontSize: 14, marginTop: -2, fontFamily:'RegestoGroteskRegular' },
});

export default A2_HalfSquats;
