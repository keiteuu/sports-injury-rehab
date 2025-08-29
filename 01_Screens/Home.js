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
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  // --- Dropdown animations ---
  const rotateAnim = useRef(new Animated.Value(0)).current; // arrow
  const dropdownAnim = useRef(new Animated.Value(0)).current; // height
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    const toValue = open ? 0 : 1;
    setOpen(!open);

    Animated.timing(rotateAnim, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(dropdownAnim, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['90deg', '0deg'], // rotate CCW
  });

  const dropdownHeight = dropdownAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 124], // adjust expanded height
  });

  // --- Animations for D5 ---
  const scaleD5 = useRef(new Animated.Value(1)).current;
  const modalTranslateXD5 = useRef(
    new Animated.Value(Dimensions.get('window').width)
  ).current;
  const [isModalVisibleD5, setIsModalVisibleD5] = useState(false);

  // --- Animations for D4 ---
  const scaleD4 = useRef(new Animated.Value(1)).current;
  const modalTranslateXD4 = useRef(
    new Animated.Value(Dimensions.get('window').width)
  ).current;
  const [isModalVisibleD4, setIsModalVisibleD4] = useState(false);

  // --- Shared animations ---
  const scaleClose = useRef(new Animated.Value(1)).current;
  const scaleStart = useRef(new Animated.Value(1)).current;

  

  return (
    <ImageBackground
      source={require('../assets/01_Images/Backgrounds/HomeBg.png')}
      style={styles.background}
    >
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageWrapper}>
          <Image
            source={require('../assets/01_Images/Recovery Roadmap 2.png')}
            style={styles.roadmap}
            resizeMode="contain"
          />

          

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
                    style={[styles.closeButtonD4, { transform: [{ scale: scaleClose }] }]}
                  />
                </Pressable>
              </Animated.View>
            </View>
          </Modal>

          {/* --- Tile D5 --- */}
          <Pressable
            onPress={() => {
              setIsModalVisibleD5(true);
              Animated.timing(modalTranslateXD5, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
              }).start();
            }}
            onPressIn={() => {
              Animated.spring(scaleD5, {
                toValue: 1.05,
                useNativeDriver: true,
              }).start();
            }}
            onPressOut={() => {
              Animated.spring(scaleD5, {
                toValue: 1,
                friction: 3,
                tension: 40,
                useNativeDriver: true,
              }).start();
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
                {/* Background Image with margin 40 */}
                <ImageBackground
                  source={require('../assets/01_Images/D5MenuBG.png')}
                  style={styles.modalImage}
                  resizeMode="contain"
                >
                  {/* Inner container */}
                  <View style={styles.modalInnerContainer}>
                    {/* Header row */}
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: 20,
                        marginTop: 18,
                        marginBottom: -4
                      }}
                    >
                      <Image
                        source={require('../assets/01_Images/Day 5.png')}
                        style={{ height: 30, resizeMode: 'contain', marginLeft: -80 }}
                      />

                      <Pressable
                        onPress={() => {
                          Animated.timing(modalTranslateXD5, {
                            toValue: Dimensions.get('window').width,
                            duration: 500,
                            useNativeDriver: true,
                          }).start(() => {
                            setIsModalVisibleD5(false);
                          });
                        }}
                        onPressIn={() => {
                          Animated.spring(scaleClose, {
                            toValue: 1.5,
                            useNativeDriver: true,
                          }).start();
                        }}
                        onPressOut={() => {
                          Animated.spring(scaleClose, {
                            toValue: 1,
                            friction: 3,
                            tension: 40,
                            useNativeDriver: true,
                          }).start();
                        }}
                        style={styles.closeTileD5Touchable}
                      >
                        <Animated.Image
                          source={require('../assets/01_Images/CloseIcon.png')}
                          style={[
                            styles.closeButtonD5,
                            { transform: [{ scale: scaleClose }] },
                          ]}
                        />
                      </Pressable>
                    </View>

                    {/* Inner Bars + START */}
                    <View style={{ alignItems: "center", marginTop: 20 }}>

                      {/* Task List + Dropdown together */}
                      <View>
                        <ImageBackground
                          source={require('../assets/01_Images/Textures/GrungeHalftone.jpg')}
                          style={styles.innerBar}
                          imageStyle={{ opacity: 0.04, borderRadius: 10 }}
                        >
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Animated.Image
                              source={require('../assets/01_Images/Icons/Diecut/Type=Tasks.png')}
                              style={{
                                width: 36,
                                height: 36,
                                marginLeft: 12,
                                marginRight: 12,
                              }}
                            />
                            <View
                              style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                padding: 12,
                              }}
                            >
                              <Text style={[styles.innerText, { paddingRight: 10 }]}>Task List</Text>
                              <Pressable onPress={toggleDropdown}>
                                <Animated.Image
                                  source={require('../assets/01_Images/Icons/Direct/Type=Next Circle.png')}
                                  style={{
                                    width: 36,
                                    height: 36,
                                    marginRight: 12,
                                    transform: [{ rotate: rotateInterpolate }],
                                  }}
                                />
                              </Pressable>
                            </View>
                          </View>
                        </ImageBackground>

                        {/* Dropdown flush with Task List */}
                        <Animated.View
                          style={{
                            overflow: "hidden",
                            height: dropdownHeight,
                            width: 318,
                          }}
                        >
                          <Image
                            source={require("../assets/01_Images/Day 5 Task List.png")}
                            style={{
                              marginTop:-4,
                              width: "100%",
                              height: 124,
                              resizeMode: "cover",
                              
                              //backgroundColor: '#fff',
                            }}
                          />
                        </Animated.View>
                      </View>

                      {/* Tempo Bar */}
                      <ImageBackground
                        source={require('../assets/01_Images/Textures/GrungeHalftone.jpg')}
                        style={[styles.innerBar, { height: 72, marginTop: 8 }]}
                        imageStyle={{ opacity: 0.04, borderRadius: 10 }}
                      >
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                          <Image
                            source={require('../assets/01_Images/Icons/Diecut/Type=Metronome.png')}
                            style={{ width: 36, height: 36, marginLeft: 12, marginRight: 12 }}
                          />
                          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <ImageBackground
                              source={require('../assets/01_Images/Textures/GrungeHalftone.jpg')}
                              style={styles.scrollSnap}
                              imageStyle={{ opacity: 0.04, borderRadius: 10 }}
                            >
                              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text
                                  style={{
                                    paddingLeft: 32,
                                    paddingRight: 6,
                                    paddingVertical: 8,
                                    fontFamily: 'BenzinSemibold',
                                    fontSize: 14,
                                    color: '#383B73',
                                  }}
                                >
                                  150
                                </Text>
                                <Text style={[styles.innerText, { paddingRight: 6 }]}>bpm</Text>
                                <Image
                                  source={require('../assets/01_Images/Icons/Direct/Slider Arrow Indication.png')}
                                  style={{ height: 40, resizeMode: 'contain', marginRight: 8 }}
                                />
                              </View>
                            </ImageBackground>
                          </View>
                        </View>
                      </ImageBackground>

                      {/* Partnering Bar */}
                      <ImageBackground
                        source={require('../assets/01_Images/Textures/GrungeHalftone.jpg')}
                        style={[styles.innerBar, { height: 72, marginTop: 8}]}
                        imageStyle={{ opacity: 0.04, borderRadius: 10 }}
                      >
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                          <Image
                            source={require('../assets/01_Images/Icons/Diecut/Type=Partner Mode.png')}
                            style={{ width: 36, height: 36, marginLeft: 12, marginRight: 12 }}
                          />
                          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <ImageBackground
                              source={require('../assets/01_Images/Textures/GrungeHalftone.jpg')}
                              style={styles.scrollSnap}
                              imageStyle={{ opacity: 0.04, borderRadius: 10 }}
                            >
                              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text
                                  style={[styles.innerText, {paddingLeft: 20 }]}>
                                  Partnering
                                </Text>
                                <Image
                                  source={require('../assets/01_Images/Icons/Direct/Type=Next.png')}
                                  style={{ height: 22, resizeMode: 'contain', transform: [{ rotate: '90deg' }],}}
                                />
                              </View>
                            </ImageBackground>
                          </View>
                        </View>
                      </ImageBackground>

                      {/* START Button */}
                      <View style={{ alignItems: 'center', marginTop: 16 }}>
                        <Pressable
                          onPress={() => navigation.navigate('A_SingleLegRaise')}
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
                              source={require('../assets/01_Images/Textures/GrungeHalftone.jpg')}
                              style={styles.startButton}
                              imageStyle={{ opacity: 0.04, borderRadius: 8 }}
                            >
                              <Text style={styles.startText}>START</Text>
                            </ImageBackground>
                          </Animated.View>
                        </Pressable>
                      </View>
                      
                    </View>
                  </View>
                </ImageBackground>
              </Animated.View>
            </View>
          </Modal>
        </View>
      </ScrollView>

      <Image
      source={require('../assets/01_Images/Top Gradient.png')}
      style={{position: 'absolute',  }}/>
      <TouchableOpacity style={styles.button}>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                      <Image
                        source={require("../assets/01_Images/Icons/Diecut/Type=Genre.png")}
                        style={{ width: 36, height: 36, marginLeft: 16, marginRight: 12 }}
                      />
                      <Text style={styles.buttonText}>K-Pop</Text>
                      <Image
                        source={require("../assets/01_Images/Icons/Direct/Type=Next Circle.png")}
                        style={{ width: 36, height: 36, marginLeft: "auto", marginRight: 16 }}
                      />
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  scrollContainer: { alignItems: 'center', paddingBottom: 20 },
  imageWrapper: { position: 'relative', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' },
  roadmap: { width: 420, height: 1350, marginBottom: 72 },
  tileTouchableD5: { position: 'absolute', top: 738, left: '14.5%', zIndex: 3 },
  tileTouchableD4: { position: 'absolute', top: 840, left: '35.5%', zIndex: 3 },
  tile: { width: 141, resizeMode: 'contain' },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  modalContentWrapper: { alignItems: 'center', justifyContent: 'center' },
  modalImage: { width: Dimensions.get('window').width- 40, height: 516, marginHorizontal: 40, alignItems: 'center' },
  modalInnerContainer: { flex: 1 },
  

  closeTileD5Touchable: { marginLeft: 10 },
  closeButtonD5: 
  {
    width: 37,
    height: 37,      // keep square ratio
    resizeMode: 'contain',
    marginLeft: 10,  // small spacing from the Day 5 image if needed },
  },

  closeButtonD4: { width: 37, resizeMode: 'contain', position:'absolute', top: -512, left: '30.5%',  },
  
  innerBar: {
    backgroundColor: '#FDFDFD',
    height: 64,
    width: 318,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#42485D',
  },

  innerText: { fontFamily: 'RegestoGroteskBold', fontSize: 20, color: '#383B73' },
  scrollSnap: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DBF208',
    height: 56,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#42485D',
    marginRight: 12,
  },
  startButton: {
    width: 320,
    height: 64,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#42485D',
    backgroundColor: '#DBF208',
    justifyContent: 'center',
    alignItems: 'center',
  },

  startText: { fontFamily: 'BenzinSemibold', fontSize: 18, color: '#2D2F5B', textAlign: 'center' },

  buttonText: {
    color: "#2D2F5C",
    fontSize: 20,
    fontFamily: "RegestoGroteskBold",
  },

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
    position: 'absolute'
  },
});

export default Home;
