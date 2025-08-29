import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Animated,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const VIDEO_ITEM_WIDTH = width * 0.5;
const IMAGE_ITEM_WIDTH = 320;
const SPACING = 8;

export default function Disrecovery() {
  const navigation = useNavigation();

  const scrollXVideos = useRef(new Animated.Value(0)).current;
  const scrollXImages = useRef(new Animated.Value(0)).current;

  // Videos
  const videos = [
    { src: require("../assets/02_Videos/Armageddon.mp4"), title: "Armageddon", subtitle: "aespa · Armageddon" },
    { src: require("../assets/02_Videos/likeJennie.mp4"), title: "Like Jennie", subtitle: "JENNIE · Ruby" },
    { src: require("../assets/02_Videos/dirtyWork.mp4"), title: "Dirty Work", subtitle: "aespa · Dirty Work" },
    { src: require("../assets/02_Videos/FlyUp.mp4"), title: "Fly Up", subtitle: "RIIZE · Odyssey" },
    { src: require("../assets/02_Videos/isThisLove.mp4"), title: "Is This Love?", subtitle: "XG · AWE" },
  ];

  const players = videos.map((v) =>
    useVideoPlayer(v.src, (player) => {
      player.loop = true;
      player.pause();
    })
  );

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    players.forEach((p, idx) => {
      if (viewableItems.some((vi) => vi.index === idx && vi.isViewable)) {
        p.play();
      } else {
        p.pause();
      }
    });
  }).current;

  // Images
  const images = [
    require("../assets/01_Images/Exercise Carousel/Rehab Exercise Options.png"),
    require("../assets/01_Images/Exercise Carousel/Rehab Exercise Options-1.png"),
    require("../assets/01_Images/Exercise Carousel/Rehab Exercise Options-2.png"),
    require("../assets/01_Images/Exercise Carousel/Rehab Exercise Options-3.png"),
    require("../assets/01_Images/Exercise Carousel/Rehab Exercise Options-4.png"),
  ];

  return (
    <ImageBackground
      source={require("../assets/01_Images/Backgrounds/DisrecoveryBg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Image
              source={require('../assets/01_Images/Top Gradient.png')}
              style={{position: 'absolute',  }}/>
        {/* Top Button */}
        <TouchableOpacity style={styles.button}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../assets/01_Images/Icons/Diecut/Type=Knee Strain.png")}
              style={{ width: 36, height: 36, marginLeft: 16, marginRight: 12 }}
            />
            <Text style={styles.buttonText}>Knee Strain</Text>
            <Image
              source={require("../assets/01_Images/Icons/Direct/Type=Next Circle.png")}
              style={{ width: 36, height: 36, marginLeft: "auto", marginRight: 16 }}
            />
          </View>
        </TouchableOpacity>

        <View style={{ height: 20 }} />

        {/* ===== VIDEO SECTION ===== */}
        <View style={styles.titleAndButton}>
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>DANCES</Text>
            <Text style={styles.sectionSubtitle}>Find dances you CAN do!</Text>
          </View>
          <TouchableOpacity
            style={styles.moreButton}
            onPress={() => navigation.navigate("ReelOptions")}
          >
            <Text style={styles.moreText}>MORE</Text>
          </TouchableOpacity>
        </View>

        <Animated.FlatList
          data={players}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={VIDEO_ITEM_WIDTH + SPACING}
          decelerationRate="fast"
          keyExtractor={(_, i) => i.toString()}
          contentContainerStyle={{
            paddingHorizontal: (width - VIDEO_ITEM_WIDTH) / 2,
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollXVideos } } }],
            { useNativeDriver: true }
          )}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{ itemVisiblePercentThreshold: 80 }}
          renderItem={({ item: player, index }) => {
            const videoData = videos[index];
            const inputRange = [
              (index - 1) * (VIDEO_ITEM_WIDTH + SPACING),
              index * (VIDEO_ITEM_WIDTH + SPACING),
              (index + 1) * (VIDEO_ITEM_WIDTH + SPACING),
            ];

            const scale = scrollXVideos.interpolate({
              inputRange,
              outputRange: [0.7, 1, 0.7],
              extrapolate: "clamp",
            });

            const overlayOpacity = scrollXVideos.interpolate({
              inputRange,
              outputRange: [0.4, 0, 0.4],
              extrapolate: "clamp",
            });

            return (
              <View style={{ width: VIDEO_ITEM_WIDTH, marginRight: SPACING }}>
                <Animated.View style={[styles.videoContainer, { transform: [{ scale }] }]}>
                  <VideoView
                    style={styles.video}
                    player={player}
                    allowsFullscreen={false}
                    allowsPictureInPicture={false}
                    nativeControls={false}
                    resizeMode="cover"
                  />

                  <LinearGradient
                    colors={["transparent", "rgba(45,47,91,0.9)"]}
                    style={styles.gradient}
                  >
                    <Text style={styles.videoTitle}>{videoData.title}</Text>
                    <Text style={styles.videoSubtitle}>{videoData.subtitle}</Text>
                  </LinearGradient>

                  <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]} />
                </Animated.View>
              </View>
            );
          }}
        />

        <View style={{ height: 48 }} />

        {/* ===== IMAGE SECTION ===== */}
        <View style={styles.titleAndButton}>
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>REHAB EXERCISES</Text>
            <Text style={styles.sectionSubtitle}>More options for a quicker recovery!</Text>
          </View>
          <TouchableOpacity
            style={styles.moreButton}
            onPress={() => navigation.navigate("ReelOptions")}
          >
            <Text style={styles.moreText}>MORE</Text>
          </TouchableOpacity>
        </View>

        <Animated.FlatList
          data={images}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={IMAGE_ITEM_WIDTH + SPACING}
          decelerationRate="fast"
          keyExtractor={(_, i) => i.toString()}
          contentContainerStyle={{
            paddingHorizontal: (width - IMAGE_ITEM_WIDTH) / 2,
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollXImages } } }],
            { useNativeDriver: true }
          )}
          renderItem={({ item, index }) => {
            const inputRange = [
              (index - 1) * (IMAGE_ITEM_WIDTH + SPACING),
              index * (IMAGE_ITEM_WIDTH + SPACING),
              (index + 1) * (IMAGE_ITEM_WIDTH + SPACING),
            ];

            const scale = scrollXImages.interpolate({
              inputRange,
              outputRange: [0.85, 1, 0.85],
              extrapolate: "clamp",
            });

            return (
              <View style={{ width: IMAGE_ITEM_WIDTH, marginRight: SPACING }}>
                <Animated.View style={[styles.imageContainer, { transform: [{ scale }] }]}>
                  <Image source={item} style={styles.image} resizeMode="cover" />
                  <LinearGradient
                    colors={["transparent", "rgba(45,47,91,0.9)"]}
                    style={styles.gradient}
                  />
                </Animated.View>
              </View>
            );
          }}
        />

        <View style={{ height: 150 }} />
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1 },
  button: {
    backgroundColor: "#DBF208",
    marginHorizontal: 16,
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#3B472C",
    flexDirection: "row",
  },
  buttonText: {
    color: "#2D2F5C",
    fontSize: 20,
    fontFamily: "RegestoGroteskBold",
  },
  sectionTitle: {
    color: "#FDFDFD",
    fontFamily: "BenzinSemibold",
    fontSize: 18,
    marginLeft: 16,
    marginVertical: 12,
    marginBottom: 16,
  },
  sectionSubtitle: {
    color: "#FDFDFD",
    fontFamily: "RegestoGroteskRegular",
    fontSize: 14,
    marginLeft: 16,
    marginTop: -16,
    marginBottom: 20,
  },
  videoContainer: {
    borderRadius: 16,
    overflow: "hidden",
  },
  video: {
    width: "100%",
    aspectRatio: 9 / 16,
  },
  imageContainer: {
    borderRadius: 16,
    overflow: "hidden",
    height: 198,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 12,
  },
  videoTitle: {
    color: "#FDFDFD",
    fontFamily: "RegestoGroteskMedium",
    fontSize: 18,
  },
  videoSubtitle: {
    color: "#FDFDFD",
    fontFamily: "RegestoGroteskRegular",
    fontSize: 16,
    opacity: 0.7,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#0C0C26",
  },
  titleContainer: {
    flexDirection: "column",
  },
  titleAndButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between'    
  },
  moreButton: {
    borderWidth: 2,
    borderColor: "#1C2443",
    backgroundColor: "#383B73",
    marginHorizontal: 20,
    padding: 8,
    paddingRight: 10,
    paddingLeft: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  moreText: { color: "#fdfdfd", fontFamily: "BenzinMedium", fontSize: 12 },
});
