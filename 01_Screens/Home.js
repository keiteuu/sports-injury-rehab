import React, { useRef, useState } from 'react';
import { BlurView } from 'expo-blur';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  Pressable,
  Animated,
  Modal,
  ImageBackground,
} from 'react-native';

const Home = () => {
  // --- Animations for D5 ---
  const scaleD5 = useRef(new Animated.Value(1)).current;
  const modalTranslateXD5 = useRef(new Animated.Value(Dimensions.get('window').width)).current;
  const [isModalVisibleD5, setIsModalVisibleD5] = useState(false);

  // --- Animations for D4 ---
  const scaleD4 = useRef(new Animated.Value(1)).current;
  const modalTranslateXD4 = useRef(new Animated.Value(Dimensions.get('window').width)).current;
  const [isModalVisibleD4, setIsModalVisibleD4] = useState(false);

  // --- Close button animation (shared) ---
  const scaleClose = useRef(new Animated.Value(1)).current;

  return (
    <ImageBackground
      source={require('../assets/01_Images/Backgrounds/HomeBg.png')}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageWrapper}>
          <Image
            source={require('../assets/01_Images/Recovery Roadmap.png')}
            style={styles.roadmap}
            resizeMode="contain"
          />

          {/* --- Tile D5 --- */}
          <Pressable
            onPress={() => {
              console.log('Tile D5 pressed');
              setIsModalVisibleD5(true);
              Animated.timing(modalTranslateXD5, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
              }).start();
            }}
            onPressIn={() => {
              Animated.spring(scaleD5, { toValue: 1.05, useNativeDriver: true }).start();
            }}
            onPressOut={() => {
              Animated.spring(scaleD5, { toValue: 1, friction: 3, tension: 40, useNativeDriver: true }).start();
            }}
            style={styles.tileTouchableD5}
          >
            <Animated.Image
              source={require('../assets/01_Images/TileD5.png')}
              style={[styles.tile, { transform: [{ scale: scaleD5 }] }]}
            />
          </Pressable>

          {/* --- Modal for D5 --- */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={isModalVisibleD5}
            onRequestClose={() => setIsModalVisibleD5(false)}
          >
            <View style={styles.modalOverlay}>
              <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFill} />

              <Animated.View
                style={[
                  styles.modalContentWrapper,
                  { transform: [{ translateX: modalTranslateXD5 }] },
                ]}
              >
                <Image
                  source={require('../assets/01_Images/D5Menu.png')}
                  style={styles.modalImage}
                  resizeMode="contain"
                />

                {/* X Button */}
                <Pressable
                  onPress={() => {
                    console.log('Close D5');
                    Animated.timing(modalTranslateXD5, {
                      toValue: Dimensions.get('window').width,
                      duration: 500,
                      useNativeDriver: true,
                    }).start(() => {
                      setIsModalVisibleD5(false);
                    });
                  }}
                  onPressIn={() => {
                    Animated.spring(scaleClose, { toValue: 1.5, useNativeDriver: true }).start();
                  }}
                  onPressOut={() => {
                    Animated.spring(scaleClose, { toValue: 1, friction: 3, tension: 40, useNativeDriver: true }).start();
                  }}
                  style={styles.closeTileD5Touchable}
                >
                  <Animated.Image
                    source={require('../assets/01_Images/CloseIcon.png')}
                    style={[styles.closeButton, { transform: [{ scale: scaleClose }] }]}
                  />
                </Pressable>

                {/* Inner Bar */}
                <View style={styles.d5Container}>
                  <ImageBackground
                    source={require('../assets/01_Images/Textures/GrungeHalftone.jpg')}
                    style={styles.innerBar}
                    imageStyle={{ opacity: 0.04, borderRadius: 10 }} // <= texture at 3%
                  >
                    <View style={{flex: 1, flexDirection: 'row',  alignItems:"center"}}>
                      <Image
                      source={require("../assets/01_Images/Icons/Diecut/Type=Tasks.png")}
                      style={{ width: 36, height: 36, marginLeft: 12, marginRight: 12,  }}
                      />
                      <View style={{flex: 1, flexDirection: 'row',  alignItems:"center", justifyContent:"flex-end",}}>
                        <Text style={styles.innerText}>Task List</Text>
                        <Image
                        source={require("../assets/01_Images/Icons/Direct/Type=Next Circle.png")}
                        style={{ width: 36, height: 36, marginLeft: 12, marginRight: 12 }}
                        />
                      </View>
                    </View>
                    
                  </ImageBackground>

                  <ImageBackground
                    source={require('../assets/01_Images/Textures/GrungeHalftone.jpg')}
                    style={styles.innerBarTempo}
                    imageStyle={{ opacity: 0.04, borderRadius: 10 }} // <= texture at 3%
                  >
                    <View style={{flex: 1, flexDirection: 'row',  alignItems:"center"}}>
                      <Image
                      source={require("../assets/01_Images/Icons/Diecut/Type=Metronome.png")}
                      style={{ width: 36, height: 36, marginLeft: 12, marginRight: 12,  }}
                      />
                      <View style={{flex: 1, flexDirection: "row", justifyContent: "flex-end"}}>
                        <ImageBackground
                        source={require('../assets/01_Images/Textures/GrungeHalftone.jpg')}
                        style={styles.scrollSnap}
                        imageStyle={{ opacity: 0.04, borderRadius: 10, }} // texture at 4%
                        >
                          <Text style={{ paddingHorizontal: 20, paddingVertical: 8 }}>werwerwer</Text>
                        </ImageBackground>

                      </View>
                      
                      
                    </View>
                    
                  </ImageBackground>


                </View>
              </Animated.View>
            </View>
          </Modal>

          {/* --- Tile D4 --- */}
          <Pressable
            onPress={() => {
              console.log('Tile D4 pressed');
              setIsModalVisibleD4(true);
              Animated.timing(modalTranslateXD4, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
              }).start();
            }}
            onPressIn={() => {
              Animated.spring(scaleD4, { toValue: 1.05, useNativeDriver: true }).start();
            }}
            onPressOut={() => {
              Animated.spring(scaleD4, { toValue: 1, friction: 3, tension: 40, useNativeDriver: true }).start();
            }}
            style={styles.tileTouchableD4}
          >
            <Animated.Image
              source={require('../assets/01_Images/TileD4.png')}
              style={[styles.tile, { transform: [{ scale: scaleD4 }] }]}
            />
          </Pressable>

          {/* --- Modal for D4 --- */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={isModalVisibleD4}
            onRequestClose={() => setIsModalVisibleD4(false)}
          >
            <View style={styles.modalOverlay}>
              <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFill} />

              <Animated.View
                style={[
                  styles.modalContentWrapper,
                  { transform: [{ translateX: modalTranslateXD4 }] },
                ]}
              >
                <Image
                  source={require('../assets/01_Images/Day4Menu.png')}
                  style={styles.modalImage}
                  resizeMode="contain"
                />

                <Pressable
                  onPress={() => {
                    console.log('Close D4');
                    Animated.timing(modalTranslateXD4, {
                      toValue: Dimensions.get('window').width,
                      duration: 500,
                      useNativeDriver: true,
                    }).start(() => {
                      setIsModalVisibleD4(false);
                    });
                  }}
                  onPressIn={() => {
                    Animated.spring(scaleClose, { toValue: 1.5, useNativeDriver: true }).start();
                  }}
                  onPressOut={() => {
                    Animated.spring(scaleClose, { toValue: 1, friction: 3, tension: 40, useNativeDriver: true }).start();
                  }}
                  style={styles.closeTileTouchable}
                >
                  <Animated.Image
                    source={require('../assets/01_Images/CloseIcon.png')}
                    style={[styles.closeButton, { transform: [{ scale: scaleClose }] }]}
                  />
                </Pressable>
              </Animated.View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  scrollContainer: { alignItems: 'center', paddingBottom: 20 },
  imageWrapper: { position: 'relative', height: '100%', alignItems: 'center', justifyContent: 'center' },
  roadmap: { width: 306, height: 1350, marginBottom: 50 },
  tileTouchableD5: { position: 'absolute', top: 738, left: '14.5%', zIndex: 3 },
  tileTouchableD4: { position: 'absolute', top: 841, left: '35%', zIndex: 3 },
  tile: { width: 141, resizeMode: 'contain' },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  modalContentWrapper: { alignItems: 'center', justifyContent: 'center' },
  modalImage: { width: 360 },
  closeTileTouchable: { position: 'absolute', top: 218, right: 21, zIndex: 2 },
  closeTileD5Touchable: { position: 'absolute', top: 209, right: 21, zIndex: 2 },
  closeButton: { width: 37, resizeMode: 'contain' },
  d5Container: {
    flex: 1,
    justifyContent:"center",
    position: 'absolute', top: 282,  zIndex: 2
  },
  innerBar: {
    flex: 1,
    backgroundColor: "#FDFDFD",
    height: 64,
    width: 318,
    
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#42485D",
    marginBottom: 10,
  },

  innerBarTempo: {
    flex: 1,
    backgroundColor: "#FDFDFD",
    height: 72,
    width: 318,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#42485D",
    marginBottom: 10,
  },

  innerText: {
    fontFamily: "RegestoGroteskBold",
    fontSize: 20,
    color: "#383B73"
  },

  scrollSnap: {
    // flex: 1, 
    // flexDirection: 'row',  
    
    alignItems:"center", 
    justifyContent:"center", 
    backgroundColor:"#DBF208", 
    height: 56, 
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#42485D",
    marginRight: 12,
  },

});

export default Home;
