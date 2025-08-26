import React, { useRef, useEffect, useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { Video } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const RediscoverYourRhythm = () => {
  const videoRef = useRef(null);
  const progress = useRef(new Animated.Value(0)).current;
  const spinValue = useRef(new Animated.Value(0)).current;
  const [isPlaying, setIsPlaying] = useState(true);
  const [expanded, setExpanded] = useState(false);

  const [videoIndex, setVideoIndex] = useState(0);
  const videoData = [
    {
      src: require("../assets/02_Videos/ExerciseVid/SLR_EtS_2.mp4"),
      icon: require("../assets/01_Images/Icons/record1.png"),
      title: "Ember to Solar",
      artist: "RIIZE · Odyssey",
    },
    {
      src: require("../assets/02_Videos/ExerciseVid/HalfSquats_EtS_1.mp4"),
      icon: require("../assets/01_Images/Icons/record2.png"),
      title: "Ember to Solar",
      artist: "RIIZE · Odyssey",
    },
    {
      src: require("../assets/02_Videos/ExerciseVid/SLR_EtS_4.mp4"),
      icon: require("../assets/02_Videos/ExerciseVid/WS_Whiplash_2.mp4"),
      title: "Whiplash",
      artist: "aespa · Whiplash",
    },
  ];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playAsync();
    }

    Animated.timing(progress, {
      toValue: 1 / 3,
      duration: 10000,
      useNativeDriver: false,
    }).start();

    // Start spinning loop
    startSpinning();
  }, []);

  const startSpinning = () => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      })
    ).start();
  };

  const togglePlay = async () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      await videoRef.current.pauseAsync();
    } else {
      await videoRef.current.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const slideAnim = useRef(new Animated.Value(0)).current; // 0 = hidden, 1 = expanded
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
    outputRange: [0, 150], // how much the rectangle slides out
  });

  const barWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  const dotTranslateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width - 40],
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/01_Images/Backgrounds/RYR Bg.png")}
        style={styles.background}
      >
        {/* Video sticks to the top */}
        <View style={styles.videoWrapper}>
          <Video
            ref={videoRef}
            source={videoData[videoIndex].src}
            style={styles.video}
            resizeMode="cover"
            shouldPlay
            isLooping
            isMuted={false}
            useNativeControls={false}
            onPlaybackStatusUpdate={(status) => {
              if (status.didJustFinish) {
                // go to next video
                setVideoIndex((prev) => (prev + 1) % videoData.length);
              }
            }}
          />
        </View>

        {/* Seek Bar */}
        <View style={styles.seekBarContainer}>
          <View style={styles.track} />
          <Animated.View style={[styles.progressFill, { width: barWidth }]}>
            <LinearGradient
              colors={["#DBF208", "#0A78FF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>
          <Animated.View
            style={[styles.dot, { transform: [{ translateX: dotTranslateX }] }]}
          >
            <Image
              source={require("../assets/01_Images/Person Icon.png")}
              style={styles.avatar}
            />
          </Animated.View>
        </View>

        {/* Record Player Icon + Slide-out Info */}
        <View style={styles.recordWrapper}>
          <TouchableOpacity onPress={toggleSlide} activeOpacity={0.8}>
            <Animated.Image
              source={videoData[videoIndex].icon}
              style={[
                styles.recordIcon,
                {
                  transform: [{ rotate: isPlaying ? spin : "0deg" }],
                },
              ]}
            />
          </TouchableOpacity>

          <Animated.View
            style={[
              styles.songInfo,
              {
                transform: [{ translateX }],
              },
            ]}
          >
            <Text style={styles.songTitle}>{videoData[videoIndex].title}</Text>
            <Text style={styles.songArtist}>{videoData[videoIndex].artist}</Text>
          </Animated.View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1, resizeMode: "cover" },
  videoWrapper: {
    width: "100%",
    height: 620,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000329",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.65,
    shadowRadius: 8,
    elevation: 8,
  },
  video: { width: "100%", height: "100%" },
  seekBarContainer: {
    height: 40,
    marginTop: 20,
    width: width - 40,
    alignSelf: "center",
    justifyContent: "center",
  },
  track: {
    height: 12,
    width: "100%",
    backgroundColor: "#909090",
    borderRadius: 8,
  },
  progressFill: {
    position: "absolute",
    height: 12,
    borderRadius: 8,
  },
  dot: { position: "absolute", left: -4 },
  avatar: { width: 48, height: 48 },

  // new styles
  recordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginLeft: 20,
  },
  recordIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  songInfo: {
    position: "absolute",
    left: 50,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 8,
    borderRadius: 8,
  },
  songTitle: { color: "#fff", fontWeight: "bold" },
  songArtist: { color: "#ccc", fontSize: 12 },
});

export default RediscoverYourRhythm;
