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
  Easing,
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
  const [finishedAll, setFinishedAll] = useState(false);

  const videoData = [
    {
      src: require("../assets/02_Videos/ExerciseVid/SLR_EtS_2.mp4"),
      icon: require("../assets/01_Images/SpinningRecord/riize.png"),
      title: "Ember to Solar",
      artist: "RIIZE · Odyssey",
      info: require("../assets/01_Images/ExerciseInfo/SingleLegRaise.png"),
    },
    {
      src: require("../assets/02_Videos/ExerciseVid/HalfSquats_EtS_1.mp4"),
      icon: require("../assets/01_Images/SpinningRecord/riize.png"),
      title: "Ember to Solar",
      artist: "RIIZE · Odyssey",
      info: require("../assets/01_Images/ExerciseInfo/HalfSquats.png"),
    },
    {
      src: require("../assets/02_Videos/ExerciseVid/WS_Whiplash_2.mp4"),
      icon: require("../assets/01_Images/SpinningRecord/aespa.png"),
      title: "Whiplash",
      artist: "aespa · Whiplash",
      info: require("../assets/01_Images/ExerciseInfo/WallSits.png"),
    },
  ];

  // 🔄 Spin loop
  useEffect(() => {
    if (isPlaying && !finishedAll) {
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
  }, [isPlaying, finishedAll]);

  const handlePlaybackStatus = (status) => {
    if (status.isLoaded) {
      if (status.didJustFinish) {
        if (videoIndex < videoData.length - 1) {
          setVideoIndex((prev) => prev + 1);
        } else {
          setFinishedAll(true);
          setIsPlaying(false);
        }
      } else {
        const fraction = status.durationMillis
          ? status.positionMillis / status.durationMillis
          : 0;
        const globalProgress = (videoIndex + fraction) / videoData.length;

        Animated.timing(progress, {
          toValue: globalProgress,
          duration: 100,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start();

        setIsPlaying(status.isPlaying);
      }
    }
  };

  const togglePlay = async () => {
    if (!videoRef.current || finishedAll) return;
    if (isPlaying) {
      await videoRef.current.pauseAsync();
    } else {
      await videoRef.current.playAsync();
    }
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  // Slide animation
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
    outputRange: [-20, 0],
  });

  // Seek bar
  const trackWidth = (width - 40) * 0.8;

  const barWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "80%"],
  });

  const dotTranslateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, trackWidth],
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
            isLooping={false}
            isMuted={false}
            useNativeControls={false}
            onPlaybackStatusUpdate={handlePlaybackStatus}
          />
        </View>

        {/* Seek Bar Row */}
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
          <View style={styles.seekBarContainer}>
            <View style={styles.track} />
            <Animated.View style={[styles.progressFill, { width: barWidth }]}>
              <LinearGradient
                colors={["#DBF208", "#0A78FF"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
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

          {/* END Button */}
          <View style={styles.endButton}>
            <Text style={styles.endText}> END </Text>
          </View>
        </View>

        {/* Exercise Info - changes with video */}
        <View style={styles.exerciseInfoWrapper}>
          <Image
            source={videoData[videoIndex].info}
            style={styles.exerciseInfo}
            resizeMode="contain"
          />
        </View>

        {/* Record Player Icon + Slide-out Info */}
        <View style={styles.recordWrapper}>
          
          <TouchableOpacity onPress={toggleSlide} activeOpacity={0.8} style={styles.recordContainer}>
            {/* <View style=> */}
              <Animated.Image
                source={videoData[videoIndex].icon}
                style={[
                  styles.recordIcon,
                  {
                    transform: [{ rotate: spin }],
                  },
                ]}
              />
            {/* </View> */}
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
    height: 600,
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
    marginLeft: 18,
    width: width - 40,
    alignSelf: "center",
    justifyContent: "center",
  },
  track: {
    height: 12,
    width: "80%",
    backgroundColor: "#909090",
    borderRadius: 8,
  },
  progressFill: {
    position: "absolute",
    height: 12,
    borderRadius: 8,
    overflow: "hidden",
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
  },
  dot: { position: "absolute", left: -4 },
  avatar: { width: 48, height: 48 },

  // 🔹 Exercise Info
  exerciseInfoWrapper: {
    marginTop: 20,
    alignItems: "center",
  },
  exerciseInfo: {
    width: "95%",
    height: 164,
  },

  recordWrapper: {
    position:"absolute",
    top: 40,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
   
  },
  recordContainer: {
    position: "absolute",
    width: 96,
    height: 96,
    justifyContent: "center",
    alignItems: "center",
     zIndex: 6,
    
  },
  recordIcon: { width: 96, height: 96 },

  songInfo: {
    position: "absolute",
    left: 0,
    backgroundColor: "#D9D9D9",
    paddingVertical: 8,
    paddingRight: 32,
    paddingLeft: 48,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#131A3C",
    zIndex: 1,
  },
  songTitle: { color: "#383B73", fontSize: 18, fontFamily: "BenzinMedium" },
  songArtist: {
    color: "#383B73",
    fontSize: 14,
    fontFamily: "RegestoLight",
    marginTop: -2,
  },

  endButton: {
    borderWidth: 2,
    borderColor: "#1C2443",
    backgroundColor: "#DBF208",
    marginLeft: -60,
    padding: 8,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
    width: 68,
    height: 38,
  },
  endText: { color: "#383B73", fontFamily: "BenzinSemibold", fontSize: 12 },
});

export default RediscoverYourRhythm;
