import React, { useRef } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Image,
  Dimensions,
  Pressable,
  Animated,
} from "react-native";

const { width } = Dimensions.get("window");

export default function WellDone({ navigation }) {
  // Animated value for scaling the button
  const scaleStart = useRef(new Animated.Value(1)).current;

  return (
    <ImageBackground
      source={require("../assets/01_Images/Backgrounds/Complete RYR.png")}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={require("../assets/01_Images/WellDone.png")}
          style={styles.wellDonePic}
        />
        <View>
          <Image
            source={require("../assets/01_Images/WellDoneList.png")}
            style={styles.list}
          />
          {/* START BUTTON */}
          <View style={{ alignItems: "center", marginTop: 16 }}>
            <Pressable
              onPress={() => navigation.navigate("A_SingleLegRaise")}
              onPressIn={() => {
                Animated.spring(scaleStart, {
                  toValue: 1.2,
                  useNativeDriver: true,
                }).start();
              }}
              onPressOut={() => {
                Animated.spring(scaleStart, {
                  toValue: 1,
                  friction: 3,
                  tension: 40,
                  useNativeDriver: true,
                }).start();
              }}
            >
              <Animated.View style={{ transform: [{ scale: scaleStart }] }}>
                <ImageBackground
                  source={require("../assets/01_Images/Textures/GrungeHalftone.jpg")}
                  style={styles.startButton}
                  imageStyle={{ opacity: 0.04, borderRadius: 8 }}
                >
                  <Text style={styles.startText}>START</Text>
                </ImageBackground>
              </Animated.View>
            </Pressable>
          </View>
        </View>
        <Image
          source={require("../assets/01_Images/Dancing Boy.png")}
          style={styles.dancingBoyPic}
        />
        <Button title="Go Back" onPress={() => navigation.goBack()} />

        
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
  },
  wellDonePic: {
    width: 370,
    height: "20%",
    resizeMode: "contain",
    marginTop: -12,
  },
  dancingBoyPic: {
    width: 340,
    top: -38,
    resizeMode: "contain",
    marginTop: 20,
    position: "absolute",
  },
  list: {
    width: width - 40,
    resizeMode: "contain",
    marginTop: -228,
  },
  startButton: {
    width: 180,
    height: 60,
    backgroundColor: "#fcd34d",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  startText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
});
