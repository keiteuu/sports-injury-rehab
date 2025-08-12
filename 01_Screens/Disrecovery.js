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

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.5; // main video width
const SPACING = 16;
const VIDEO_ASPECT_RATIO = 9 / 16; // adjust to your videos

export default function Disrecovery() {
  const scrollX = useRef(new Animated.Value(0)).current;

  const videos = [
    require("../assets/02_Videos/Armageddon.mp4"),
    require("../assets/02_Videos/likeJennie.mp4"),
    require("../assets/02_Videos/dirtyWork.mp4"),
    require("../assets/02_Videos/FlyUp.mp4"),
    require("../assets/02_Videos/isThisLove.mp4"),
  ];

  // Create players
  const players = videos.map((src) =>
    useVideoPlayer(src, (player) => {
      player.loop = true;
      player.pause(); // start paused
    })
  );

  // Play/pause when snapping to center
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
            outputRange: [0.8, 1, 0.8],
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
                <VideoView
                  style={styles.video}
                  player={player}
                  // Removed fullscreen & PIP to avoid overlays
                />
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
  container: {
    flex: 1,
    backgroundColor: "skyblue",
    paddingTop: 40,
  },
  button: {
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: "brown",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  videoContainer: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "transparent", // no black frame
  },
  video: {
    width: "100%",
    aspectRatio: VIDEO_ASPECT_RATIO,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
  },
});
