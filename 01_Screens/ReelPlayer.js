// 01_Screens/ReelPlayer.js
import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Text,
  FlatList,
} from "react-native";
import { Video } from "expo-av";

const { height, width } = Dimensions.get("window");

export default function ReelPlayer({ navigation }) {
  const videos = [
    { 
      src: require("../assets/02_Videos/Armageddon.mp4"), 
      title: "Armageddon", 
      subtitle: "aespa · Armageddon",
      username: "arinna_judy",
      caption: "imma get it DONE while taking care of knee strain! 👀#AESPALOKAL #ARMAGEDDON",
      likes: "2.3K",
      comments: "120",
      saves: "530"
    },
    { 
      src: require("../assets/02_Videos/Gnarly.mp4"), 
      title: "Like Jennie", 
      subtitle: "KATSEYE · Gnarly",
      username: "serafinna",
      caption: "whooooo wanna rock with GNARLY? 🦹‍♀️ but knee strain safe! a tip, don't do the jumps if you aren't ready for it,  just stay on the ground!!",
      likes: "2K",
      comments: "24",
      saves: "564"
    },
    { 
      src: require("../assets/02_Videos/dirtyWork.mp4"), 
      title: "Dirty Work", 
      subtitle: "aespa · Dirty Work",
      username: "Anita",
      caption: "Real bad business that’s healing knees.",
      likes: "3.1K",
      comments: "24",
      saves: "695"
     },
    { src: require("../assets/02_Videos/FlyUp.mp4"), 
      title: "Fly Up", 
      subtitle: "RIIZE · Odyssey",
      username: "*Moon",
      caption: "FLY UPPP!🔝🔝🔝 dance w/o injuring yourself with me! This dance is quite hard so please go easy on the knees 🔝",
      likes: "2K",
      comments: "24",
      saves: "564"
     },
    { src: require("../assets/02_Videos/isThisLove.mp4"), 
      title: "Is This Love?", 
      subtitle: "XG · AWE",
      username: "Rikuto",
      caption: "XG is fire 🕺🫶 this dance is super easy, not heavy on the knees, so go ahead learn it with me and my friends 😉",
      likes: "2K",
      comments: "24",
      saves: "564"
     },
  ];

  const videoRefs = useRef([]); // store refs for all videos
  const [currentIndex, setCurrentIndex] = useState(0);

  // Track visible item
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index;
      setCurrentIndex(newIndex);
    }
  }).current;

  const viewabilityConfig = { itemVisiblePercentThreshold: 80 };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.videoContainer}>
        <Video
          ref={(ref) => (videoRefs.current[index] = ref)}
          source={item.src}
          style={styles.video}
          resizeMode="cover"
          shouldPlay={index === currentIndex} // only play if current
          isLooping
          useNativeControls={false}
        />

        {/* Overlay UI */}
        <View style={styles.overlay}>
          {/* Right-side action buttons */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.iconBtn}>
              <Image
                source={require("../assets/01_Images/Icons/Reels/like.png")}
                style={styles.icon}
              />
              <Text style={styles.iconText}>{item.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Image
                source={require("../assets/01_Images/Icons/Reels/comment.png")}
                style={styles.icon}
              />
              <Text style={styles.iconText}>{item.comments}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Image
                source={require("../assets/01_Images/Icons/Reels/save.png")}
                style={styles.icon}
              />
              <Text style={styles.iconText}>{item.saves}</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom anchored user + caption block */}
          <View style={styles.bottom}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* Profile picture on the left */}
              <Image
                source={require("../assets/01_Images/Icons/PFP/Rikuto.png")}
                style={styles.profileIcon}
              />

              {/* Username + subtitle stacked vertically */}
              <View style={{ flexDirection: "column", marginLeft: 8 }}>
                <Text style={styles.username}>{item.username}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 2 }}>
                  <Image
                    source={require("../assets/01_Images/Icons/Diecut/Type=Genre.png")}
                    style={styles.captionIcon}
                  />
                  <Text style={styles.music}>{item.subtitle}</Text>
                </View>
              </View>
            </View>

            {/* Caption below everything */}
            <Text style={[styles.caption, { marginTop: 8 }]}>{item.caption}</Text>
          </View>

          {/* Bottom gradient */}
          <Image
            source={require("../assets/01_Images/BottomGradient.png")}
            style={styles.bottomGradient}
          />
        </View>
      </View>
    );
  };

return (
    <View style={styles.container}>

      {/* Scrollable Reels */}
      <FlatList
        data={videos}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        // style={{top: 2 }}
      />

      {/* Gradient overlay */}
      <Image
        source={require("../assets/01_Images/Top Gradient.png")}
        style={styles.gradient}
      />

      {/* Back button overlay */}
      <View style={{ position: "absolute", top: 40, left: 16, zIndex: 15 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/01_Images/Icons/Direct/Back.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000329" },

  videoContainer: {
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
  },

  video: {
    width: width,
    height: height,
  },

  backIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginLeft: 16,
    // top: 16,
    zIndex: 3,
  },

  captionIcon: {
    width: 10,
    height: 10,
    resizeMode: "contain",
    marginRight: 6,
  },

  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "25%",
    resizeMode: "cover",
    zIndex: 10,
  },

    overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginBottom: 156,
  },

  actions: {
    position: "absolute",
    right: 16,
    bottom: 56,
    alignItems: "center",
    zIndex: 5,
  },

  iconBtn: {
    marginBottom: 20,
    alignItems: "center",
  },

  icon: {
    width: 32,
    height: 32,
    tintColor: "#fdfdfd",
    marginBottom: 0,
  },

  iconText: {
    color: "#fdfdfd",
    fontFamily: 'RegestoGroteskRegular',
    fontSize: 14,
  },

  bottom: {
    position: "absolute",
    bottom: 28,   // anchored, adjust this to move block up/down
    left: 16,
    right: 108,
    zIndex: 5,
  },


  username: {
    color: "#fdfdfd",
    fontFamily: 'RegestoGroteskMedium',
    fontSize: 16,
    marginBottom: -2,
  },

  caption: {
    color: "#fdfdfd",
    fontSize: 14,
    fontFamily: 'RegestoGroteskRegular',
    marginBottom: 4,
  },

  music: {
    color: "#fdfdfd",
    fontSize: 12,
    fontFamily: 'RegestoGroteskRegular',
  },

  profileIcon: {
    width: 32,
    height: 32,
    borderRadius: 20,
    marginRight: 0, // add spacing between icon + username
  },

  bottomGradient: {
    position: "absolute",
    bottom: -96,
    left: 0,
    width: width,
    // height: "25%",
    resizeMode: "cover",
    zIndex: 0,
  },

});
