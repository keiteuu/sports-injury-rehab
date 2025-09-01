import React, { useRef, useEffect, useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Animated as RNAnimated, // 👈 React Native Animated
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
  Easing as RNEasing, // 👈 React Native Easing
} from "react-native";
import { Video } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import CountdownOverlay from "../01_Screens/CountdownOverlay"; // overlay component
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

const A_SingleLegRaise = ({ navigation }) => {
  const videoRef = useRef(null);

  const spinValue = useRef(new RNAnimated.Value(0)).current;
  const progress = useRef(new RNAnimated.Value(0)).current;

  const [isPlaying, setIsPlaying] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true); // 👈 overlay state
  const [overlayMode, setOverlayMode] = useState("countdown");

  const videoData = {
    src: require("../assets/02_Videos/ExerciseVid/SLR_EtS_2.mp4"),
    icon: require("../assets/01_Images/SpinningRecord/riize.png"),
    title: "Ember to Solar",
    artist: "RIIZE · Odyssey",
    info: require("../assets/01_Images/ExerciseInfo/SingleLegRaise.png"),
  };

  const [showBurst, setShowBurst] = useState(false);

  // Reanimated values for floating icons
  const icon1Y = useSharedValue(0);
  const icon2Y = useSharedValue(0);
  const icon3Y = useSharedValue(0);
  const icon4Y = useSharedValue(0);

  const offsets = [icon1Y, icon2Y, icon3Y, icon4Y];

  const triggerBurst = () => {
    setShowBurst(true);
    offsets.forEach((offset, index) => {
      offset.value = withSpring(-100 - index * 20, { damping: 8 });
    });

    setTimeout(() => {
      offsets.forEach((offset) => {
        offset.value = withSpring(0, { damping: 8 });
      });
      setShowBurst(false);
    }, 1500);
  };

  const fabRef = useRef(null);

  // Floating icons styles (Reanimated)
  const iconStyle1 = useAnimatedStyle(() => ({
    transform: [{ translateY: icon1Y.value }],
  }));
  const iconStyle2 = useAnimatedStyle(() => ({
    transform: [{ translateY: icon2Y.value }],
  }));
  const iconStyle3 = useAnimatedStyle(() => ({
    transform: [{ translateY: icon3Y.value }],
  }));
  const iconStyle4 = useAnimatedStyle(() => ({
    transform: [{ translateY: icon4Y.value }],
  }));

  const triggerIcons = (expand) => {
    if (expand) {
      // expand
      icon1Y.value = withTiming(-260, { duration: 300 });
      setTimeout(() => {
        icon2Y.value = withTiming(-200, { duration: 300 });
      }, 100);
      setTimeout(() => {
        icon3Y.value = withTiming(-140, { duration: 300 });
      }, 200);
      setTimeout(() => {
        icon4Y.value = withTiming(-80, { duration: 300 });
      }, 300);
    } else {
      // collapse
      icon1Y.value = withTiming(0, { duration: 300 });
      icon2Y.value = withTiming(0, { duration: 300 });
      icon3Y.value = withTiming(0, { duration: 300 });
      icon4Y.value = withTiming(0, { duration: 300 });
    }
  };

  // Seek bar
  const trackWidth = (width - 40) * 0.8;

  const animValue = useRef(new RNAnimated.Value(0)).current;

  const startSeekBar = () => {
    animValue.setValue(0);
    RNAnimated.timing(animValue, {
      toValue: 1,
      duration: 10000,
      easing: RNEasing.linear,
      useNativeDriver: false,
    }).start();
  };

  // gradient width grows up to 1/3 of track
  const barWidth = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, trackWidth / 3],
  });

  // dot moves up to 1/3 of track
  const dotTranslateX = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, trackWidth / 3],
  });

  // Second dot moves across 3/8 of the track
  const secondDotTranslateX = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, (trackWidth * 4) / 8],
  });

  // Animate spin (React Native Animated)
  useEffect(() => {
    RNAnimated.loop(
      RNAnimated.timing(spinValue, {
        toValue: 1,
        duration: 4000,
        easing: RNEasing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);

  const handlePlaybackStatus = (status) => {
    if (status.isLoaded) {
      if (status.didJustFinish) {
        setOverlayMode("rest");
        setShowOverlay(true);
      } else {
        setIsPlaying(status.isPlaying);
      }
    }
  };

  const handleCountdownFinish = () => {
    if (overlayMode === "countdown") {
      setShowOverlay(false);
      videoRef.current?.playAsync();
      startSeekBar();
    } else {
      // REST finished → go to next page
      setShowOverlay(false);
      navigation.navigate("A2_HalfSquats");
    }
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const slideAnim = useRef(new RNAnimated.Value(0)).current;
  const toggleSlide = () => {
    RNAnimated.timing(slideAnim, {
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

  //toggleSpin
  const spinAnim = useRef(new RNAnimated.Value(0)).current;
  const [toggled, setToggled] = useState(false);

  const toggleSpin = () => {
    RNAnimated.timing(spinAnim, {
      toValue: toggled ? 0 : 1,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();

    setToggled(!toggled);

    // Pass expand or collapse state
    triggerIcons(!toggled);
  };

  const rotateInterpolate = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });

  const [flyingReactions, setFlyingReactions] = useState([]);

  const triggerReaction = (iconSource, startX, startY) => {
    const id = Date.now();
    const animatedY = new RNAnimated.Value(0);
    const animatedOpacity = new RNAnimated.Value(1);
    const animatedX = new RNAnimated.Value(0); // 👈 new for horizontal drift

    setFlyingReactions((prev) => [
      ...prev,
      { id, source: iconSource, y: animatedY, xDrift: animatedX, opacity: animatedOpacity, x: startX, yStart: startY },
    ]);

    RNAnimated.parallel([
      RNAnimated.timing(animatedY, {
        toValue: -height, // fly up
        duration: 2000,
        useNativeDriver: true,
      }),
      RNAnimated.timing(animatedOpacity, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setFlyingReactions((prev) => prev.filter((item) => item.id !== id));
    });
  };

  const iconRefs = useRef([]); // 👈 this will hold references to your icons

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/01_Images/Backgrounds/RYR Bg.png")}
        style={styles.background}
      >
        <View style={styles.videoWrapper}>
          {/* Gradient background */}
          <LinearGradient
            colors={["#000329", "rgba(22,37,255,1)"]}
            style={StyleSheet.absoluteFill}
          />

          {/* Video */}
          <Video
            ref={videoRef}
            source={videoData.src}
            style={styles.video}
            resizeMode="cover"
            shouldPlay={false}
            isLooping={false}
            isMuted={false}
            onPlaybackStatusUpdate={handlePlaybackStatus}
          />
        </View>

        {/* Floating Action Button + Icons */}
        <View style={styles.fabContainer}>
          <TouchableOpacity ref={fabRef} onPress={toggleSpin} style={styles.fab} activeOpacity={1}>
            {/* Your custom FAB background/icon */}
            <Image
              source={require("../assets/01_Images/Icons/Direct/Type=Add Reaction.png")}
              style={styles.fabIcon}
            />

            {/* Plus sign overlay that spins */}
            <RNAnimated.Image
              source={require("../assets/01_Images/Icons/Direct/AddReactionPlus.png")}
              style={[styles.plusIcon, { transform: [{ rotate: rotateInterpolate }] }]}
            />
          </TouchableOpacity>

          {/* Floating icons */}
            <TouchableOpacity
              onPress={() => {
                fabRef.current?.measure((fx, fy, w, h, px, py) => {
                  // FAB center
                  const fabX = px + w / 2;
                  const fabY = py + h / 2;

                  // add this icon’s offset (same as in triggerIcons)
                  const offsetY = -260; // 👈 match iconStyle1 open offset
                  const offsetX = 0;    // if you also animate sideways, include that

                  const centerX = fabX - 24 + offsetX;
                  const centerY = fabY - 24 + offsetY;

                  triggerReaction(require("../assets/01_Images/Icons/Direct/Floating/Hearts.png"), centerX, centerY );
                });
              }}
            >
              <Animated.View style={[styles.icon, iconStyle1]}>
              <Image
                source={require("../assets/01_Images/Icons/Direct/Type=Hearts.png")}
                style={styles.iconImage}
              />
            </Animated.View>
          </TouchableOpacity>

          <TouchableOpacity
             onPress={() => {
                fabRef.current?.measure((fx, fy, w, h, px, py) => {
                  // FAB center
                  const fabX = px + w / 2;
                  const fabY = py + h / 2;

                  // add this icon’s offset (same as in triggerIcons)
                  const offsetY = -200; // 👈 match iconStyle1 open offset
                  const offsetX = 0;    // if you also animate sideways, include that

                  const centerX = fabX - 24 + offsetX;
                  const centerY = fabY - 24 + offsetY;
                  triggerReaction(require("../assets/01_Images/Icons/Direct/Floating/Balloon.png"), centerX, centerY);
                });
              }}
            >
            <Animated.View style={[styles.icon, iconStyle2]}>
              <Image
                source={require("../assets/01_Images/Icons/Direct/Type=Ballloons.png")}
                style={styles.iconImage}
              />
            </Animated.View>
          </TouchableOpacity>

          <TouchableOpacity
              onPress={() => {
                fabRef.current?.measure((fx, fy, w, h, px, py) => {
                  // FAB center
                  const fabX = px + w / 2;
                  const fabY = py + h / 2;

                  // add this icon’s offset (same as in triggerIcons)
                  const offsetY = -140; // 👈 match iconStyle1 open offset
                  const offsetX = 0;    // if you also animate sideways, include that

                  const centerX = fabX - 24 + offsetX;
                  const centerY = fabY - 24 + offsetY;
                  triggerReaction(require("../assets/01_Images/Icons/Direct/Floating/Cheer.png"), centerX, centerY);
                });
              }}
            >
            <Animated.View style={[styles.icon, iconStyle3]}>
              <Image
                source={require("../assets/01_Images/Icons/Direct/Type=Cheer.png")}
                style={styles.iconImage}
              />
            </Animated.View>
          </TouchableOpacity>

          <TouchableOpacity
              onPress={() => {
                fabRef.current?.measure((fx, fy, w, h, px, py) => {
                  // FAB center
                  const fabX = px + w / 2;
                  const fabY = py + h / 2;

                  // add this icon’s offset (same as in triggerIcons)
                  const offsetY = -80; // 👈 match iconStyle1 open offset
                  const offsetX = 0;    // if you also animate sideways, include that

                  const centerX = fabX - 24 + offsetX;
                  const centerY = fabY - 24 + offsetY;
                  triggerReaction(require("../assets/01_Images/Icons/Direct/Floating/Clap.png"), centerX, centerY);
                });
              }}
            >
            <Animated.View style={[styles.icon, iconStyle4]}>
              <Image
                source={require("../assets/01_Images/Icons/Direct/Type=Clap.png")}
                style={styles.iconImage}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>

        {/* Floating reactions on top of everything */}
        {flyingReactions.map((reaction) => (
          <RNAnimated.Image
            key={reaction.id}
            source={reaction.source}
            style={{
              position: "absolute",
              left: reaction.x,
              top: reaction.yStart,
              width: 48,
              height: 48,
              transform: [
                { translateY: reaction.y },
                { translateX: reaction.xDrift },
              ],
              opacity: reaction.opacity,
            }}
          />
        ))}



        {/* Seek Bar Row */}
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
          <View style={styles.seekBarContainer}>
            <View style={styles.track} />
            {/* Gradient Fill */}
            <RNAnimated.View style={[styles.progressFill, { width: barWidth }]}>
              <LinearGradient
                colors={["#DBF208", "#0A78FF"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
              />
            </RNAnimated.View>
            <RNAnimated.View
              style={[styles.dot, { zIndex: 2, transform: [{ translateX: dotTranslateX }] }]}
            >
              <Image
                source={require("../assets/01_Images/Person Icon.png")}
                style={styles.avatar}
              />
            </RNAnimated.View>

            {/* Second Dot */}
            <RNAnimated.View
              style={[styles.dot, { transform: [{ translateX: secondDotTranslateX }] }]}
            >
              <Image
                source={require("../assets/01_Images/HUIJOHN.png")}
                style={{ width: 36, height: 36 }}
              />
            </RNAnimated.View>
          </View>

          {/* end button has a navigation to welldone */}
          {/* END Button */}
          <TouchableOpacity onPress={() => navigation.navigate('WellDone')} activeOpacity={1}>
          <View style={styles.endButton}>
            <Text style={styles.endText}> END </Text>
            
          </View>
          </TouchableOpacity>
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
          <TouchableOpacity onPress={toggleSlide} activeOpacity={1} style={styles.recordContainer}>
            <RNAnimated.Image
              source={videoData.icon}
              style={[styles.recordIcon, { transform: [{ rotate: spin }] }]}
            />
          </TouchableOpacity>
          <RNAnimated.View style={[styles.songInfo, { transform: [{ translateX }] }]}>
            <Text style={styles.songTitle}>{videoData.title}</Text>
            <Text style={styles.songArtist}>{videoData.artist}</Text>
          </RNAnimated.View>
        </View>

        {/* Overlay 👇 */}
        {showOverlay && (
          <CountdownOverlay mode={overlayMode} onFinish={handleCountdownFinish} />
        )}
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
  recordWrapper: { position: "absolute", top: 40, left: 20, flexDirection: "row", alignItems: "center" },
  recordContainer: { width: 96, height: 96, justifyContent: "center", alignItems: "center", zIndex: 3 },
  recordIcon: { width: 96, height: 96 },
  songInfo: { position: "absolute", left: 0, backgroundColor: "#FDFDFD", paddingVertical: 8, paddingRight: 32, paddingLeft: 48, borderRadius: 8, borderWidth: 2, borderColor: "#131A3C" },
  songTitle: { color: "#383B73", fontSize: 18, fontFamily: "BenzinMedium" },
  songArtist: { color: "#383B73", fontSize: 14, marginTop: -2, fontFamily: "RegestoGroteskRegular" },
  endButton: {
    borderWidth: 2,
    borderColor: "#222345",
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
    mixBlendMode: 'color-dodge'
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

  fabContainer: {
    position: "absolute",
    bottom: 340,
    right: 28,
    alignItems: "center",
    zIndex: 8,
  },

  fab: {
    backgroundColor: "#FFF94C",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    zIndex: 3,
  },
  fabIcon: {
    width: 64,
    height: 64,
    resizeMode: "contain",
    
  },
  plusIcon: {
    position: "absolute",
    width: 20,
    height: 20,
    right: 8,
    bottom: 12,
  },

  icon: {
    position: "absolute",
    bottom: 0,
    right: -24,
    alignItems: "center",
    justifyContent: "center",
    
  },

  iconImage: {
    width: 48,
    height: 48,
    resizeMode: "contain",
  },
});

export default A_SingleLegRaise;
