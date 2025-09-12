import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  ImageBackground,
} from "react-native";
import { Video } from "expo-av";

const { width } = Dimensions.get("window");

// dummy data (replace with your actual video files)
const reels = [
  {
    id: "1",
    video: require("../assets/01_Images/VideoThumbnails/likeJennie.png"),
    title: "whooooo wanna rock with Jennie?",
  },
  {
    id: "2",
    video: require("../assets/01_Images/VideoThumbnails/isThisLove.png"),
    title: "is this love: easy version! come learn with us",
  },
  {
    id: "3",
    video: require("../assets/01_Images/VideoThumbnails/Famous.png"),
    title: "Learn #FAMOUS safely!",
  },
  {
    id: "4",
    video: require("../assets/01_Images/VideoThumbnails/Armaggedon.png"),
    title: "imma get it DONE while taking care of knee strain!",
  },
];

export default function ReelOptions({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("ReelPlayer")} // 👈 navigate
    >
      <Image
        source={item.video}
        style={styles.thumbnail}
        resizeMode="cover"
        shouldPlay={false} // thumbnail only
        isMuted
      />
      <Text numberOfLines={1} style={styles.caption}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require("../assets/01_Images/Backgrounds/DisrecoveryBg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require("../assets/01_Images/Icons/Direct/Back.png")}
                style={styles.backIcon}
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Dis(Re)Covery</Text>
          </View>
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
          style={{ marginTop: 12, marginBottom: 108,  zIndex: 10 }}
        />
        
        {/* GRADIENT BELOW HEADER */}
        <Image
          source={require("../assets/01_Images/Top Gradient.png")}
          style={styles.gradient}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },

  container: { flex: 1 },

  backIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginLeft: 16,
  },

  listContent: { padding: 12 },
  row: { justifyContent: "space-between" },
  card: { flex: 1, marginBottom: 16, marginHorizontal: 4 },

  thumbnail: {
    width: width / 2 - 24,
    height: ((width / 2 - 24) * 16) / 9, // 9:16 portrait aspect
    borderRadius: 12,
    backgroundColor: "#000",
    borderWidth: 2,
    borderColor: "#222345",
  },
  caption: {
    marginTop: 6,
    fontSize: 13,
    fontFamily: "RegestoGroteskMedium",
    color: "white",
  },

  header: {
    height: 93, // match Profile/Home
    backgroundColor: "#383B73",
    borderBottomWidth: 2,
    borderBottomColor: "#222345",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingBottom: 12,
    zIndex: 3,
  },

  headerTitle: {
    fontFamily: "RegestoGroteskBold",
    fontSize: 20,
    color: "#FFF94C",
    paddingLeft: 12,
    marginTop: 4,
  },

  // ✅ fixed so gradient sits below header & doesn’t cover list
  gradient: {
    position: "absolute",
    top: 93, // directly below header
    left: 0,
    width: "100%",
    height: 60, // adjust to your gradient image height
    resizeMode: "cover",
    zIndex: 1,
  },
});
