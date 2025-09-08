import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Image,
  Dimensions,
  Pressable,
  Animated,
  TextInput,
  feedback, setFeedback
} from "react-native";
import { CommonActions } from "@react-navigation/native"; // 👈 import this

const { width } = Dimensions.get("window");

export default function WellDone({ navigation }) {
  const scaleStart = useRef(new Animated.Value(1)).current;

  return (
    <ImageBackground
      source={require("../assets/01_Images/Backgrounds/Complete RYR.png")}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={require("../assets/01_Images/Stars.png")}
          style={styles.stars}
        />
        
        {/* Title Image */}
        <Image
          source={require("../assets/01_Images/WellDone.png")}
          style={styles.wellDonePic}
        />

        {/* List Image */}
        <Image
          source={require("../assets/01_Images/WellDoneList.png")}
          style={styles.list}
        />

        {/* START BUTTON (directly below list) */}
        <View style={{ alignItems: "center", marginTop: -350 }}>
          <Pressable
            onPress={() =>
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    {
                      name: "Tabs",
                      state: { routes: [{ name: "Home" }] },
                    },
                  ],
                })
              )
            }
            onPressIn={() => {
              Animated.spring(scaleStart, {
                toValue: 1.1,
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
                <Text style={styles.startText}>RETURN HOME</Text>
              </ImageBackground>
            </Animated.View>
          </Pressable>
        </View>

        <ImageBackground
          source={require('../assets/01_Images/Textures/GrungeHalftone.jpg')}
                          style={styles.innerBar}
                          imageStyle={{ opacity: 0.04, borderRadius: 10 }}
        >
          <TextInput
            style={styles.input}
            placeholder="Add notes..."
            placeholderTextColor="#383B73"
            value={feedback}
            onChangeText={setFeedback}
            multiline
          />
        </ImageBackground>

        {/* Dancing Boy BELOW the button */}
        <Image
          source={require("../assets/01_Images/Dancing Boy.png")}
          style={styles.dancingBoyPic}
        />
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
    resizeMode: "contain",
    marginTop: -12,
  },

  stars: {
    width: '100%',
    resizeMode: "contain",
    position: "absolute",
    top: 120},

  list: {
    width: width - 40,
    resizeMode: "contain",
    marginTop: -240,
  },
  dancingBoyPic: {
    width: 350,
    resizeMode: "contain",
    marginTop: -15,
    alignSelf: "center",
    position: "absolute",
  },
  startButton: {
    width: width - 40,
    height: 64,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#42485D",
    backgroundColor: "#DBF208",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  startText: {
    fontFamily: "BenzinSemibold",
    fontSize: 18,
    color: "#2D2F5B",
    textAlign: "center",
  },
  input: {
    width: width - 40,
    height: 100,
    fontFamily: 'RegestoGroteskRegular',
    fontSize: 14,
    padding: 12,
  },
  innerBar: {
    height: 57,
    backgroundColor: '#FDFDFD',
    width: 330,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#42485D',
    alignContent: 'center',
    justifyContent: 'center', 
    position: 'absolute',
    top: 1000-15,
  }
});
