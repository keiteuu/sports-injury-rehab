import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { Video } from "expo-av"; // 👈 for video thumbnails

const { width } = Dimensions.get("window");

// dummy data (use your actual video files)
const reels = [
  {
    id: "1",
    video: require("../assets/02_Videos/likeJennie.mp4"),
    title: "whooooo wanna rock with Jennie?",
  },
  {
    id: "2",
    video: require("../assets/02_Videos/isThisLove.mp4"),
    title: "is this love: easy version! come learn with us",
  },
  {
    id: "3",
    video: require("../assets/02_Videos/Famous.mp4"),
    title: "Learn #FAMOUS safely!",
  },
  {
    id: "4",
    video: require("../assets/02_Videos/Armageddon.mp4"),
    title: "imma get it DONE while taking care of knee strain!",
  },
];

export default function ReelOptions({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Video
        source={item.video}
        style={styles.thumbnail}
        resizeMode="cover"
        shouldPlay={false}   // 👈 don’t play
        isMuted              // 👈 no audio
      />
      <Text numberOfLines={1} style={styles.caption}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/01_Images/Icons/Direct/Back.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dis(Re)Covery</Text>
        <View style={{ width: 32 }} />
      </View>

      {/* GRID */}
      <FlatList
        data={reels}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#383B73",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#383B73",
    borderBottomWidth: 2,
    borderBottomColor: "#222345",
  },
  backIcon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
  headerTitle: {
    fontFamily: "RegestoGroteskBold",
    fontSize: 20,
    color: "#FFF94C",
  },
  listContent: {
    padding: 12,
  },
  row: {
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    marginBottom: 16,
    marginHorizontal: 4,
  },
  thumbnail: {
    width: (width / 2) - 24,
    height: (width / 2) - 24,
    borderRadius: 12,
    backgroundColor: "#222345",
  },
  caption: {
    marginTop: 6,
    fontSize: 13,
    fontFamily: "RegestoGroteskMedium",
    color: "white",
  },
});
