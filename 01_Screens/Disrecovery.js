import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Animated,
} from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.5; // width for center video
const SPACING = 8;
const VIDEO_ASPECT_RATIO = 9 / 16;

export default function Disrecovery() {
  const scrollX = useRef(new Animated.Value(0)).current;

  const videos = [
    require("../assets/02_Videos/Armageddon.mp4"),
    require("../assets/02_Videos/likeJennie.mp4"),
    require("../assets/02_Videos/dirtyWork.mp4"),
    require("../assets/02_Videos/FlyUp.mp4"),
    require("../assets/02_Videos/isThisLove.mp4"),
  ];

  // Create players without showing default controls
  const players = videos.map((src) =>
    useVideoPlayer(src, (player) => {
      player.loop = true;
      player.pause(); // start paused
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

  return (
    <View style={styles.container}>
      {/* Top Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => alert("Button Pressed!")}
      >
        <Text style={styles.buttonText}>Knee Strain</Text>
      </TouchableOpacity>

      <Animated.FlatList
        data={players}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH + SPACING}
        decelerationRate="fast"
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={{
          paddingHorizontal: (width - ITEM_WIDTH) / 2,
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 80 }}
        renderItem={({ item: player, index }) => {
          const inputRange = [
            (index - 1) * (ITEM_WIDTH + SPACING),
            index * (ITEM_WIDTH + SPACING),
            (index + 1) * (ITEM_WIDTH + SPACING),
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.7, 1, 0.7],
            extrapolate: "clamp",
          });

          const overlayOpacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.4, 0, 0.4],
            extrapolate: "clamp",
          });

          return (
            <View style={{ width: ITEM_WIDTH, marginRight: SPACING }}>
              <Animated.View
                style={[
                  styles.videoContainer,
                  { transform: [{ scale }] },
                ]}
              >
                {/* Video */}
                <VideoView
                  style={styles.video}
                  player={player}
                  allowsFullscreen={false}
                  allowsPictureInPicture={false}
                  nativeControls={false} // ensure UI doesn't appear
                  resizeMode="cover"
                />

                {/* Overlay gradient and text */}
                <LinearGradient
                  colors={["transparent", "rgba(45,47,91,0.9)"]}
                  style={styles.gradient}
                >
                  <Text style={styles.videoTitle}>Video Title {index + 1}</Text>
                  <Text style={styles.videoSubtitle}>
                    Subtitle text goes here
                  </Text>
                </LinearGradient>

                {/* Side fade overlay */}
                <Animated.View
                  style={[
                    styles.overlay,
                    { opacity: overlayOpacity },
                  ]}
                />
              </Animated.View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0C0C26" },
  
  button: {
    backgroundColor: "#DBF208",
    marginHorizontal: 16, // 16px margin on left and right
    marginTop: 24,
    paddingVertical: 12,
  
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: { 
    color: "#2D2F5B", 
    fontSize: 20,
    fontWeight: "bold",
    
  },

  videoContainer: {
    borderRadius: 16,
    overflow: "hidden",
  },
  video: {
    width: "100%",
    aspectRatio: 9 / 16,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 12,
  },
  videoTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  videoSubtitle: { color: "#fff", fontSize: 14, opacity: 0.8 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#0C0C26",
  },
});
