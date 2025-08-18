import React, {useRef, useState} from 'react';
import { BlurView } from 'expo-blur';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Animated,
  Modal,
  ImageBackground,   // 👈 add this
} from 'react-native';

const Home = ({ navigation }) => {
  const scaleD5 = useRef(new Animated.Value(1)).current;
  const scaleD4 = useRef(new Animated.Value(1)).current;
  const scaleClose = useRef(new Animated.Value(1)).current;
  const modalTranslateX = useRef(new Animated.Value(Dimensions.get('window').width)).current;

  const [isModalVisible, setIsModalVisible] = useState(false);

  // --- your animation handlers (unchanged) ---

  return (
    <ImageBackground
      source={require('../assets/01_Images/Backgrounds/HomeBg.png')} // 👈 your texture file
      style={styles.background}
      // imageStyle={{ opacity: 0.97 }}  // 👈 subtle overlay (reduce opacity)
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageWrapper}>
          <Image
            source={require('../assets/01_Images/Recovery Roadmap.png')}
            style={styles.roadmap}
            resizeMode="contain"
          />

          {/* Tile D5 */}
          <Pressable
            onPress={() => console.log('Tile D5 pressed')}
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

          {/* Tile D4 */}
          <Pressable
            onPress={() => {
              console.log('Tile D4 pressed');
              setIsModalVisible(true);
              Animated.timing(modalTranslateX, {
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

          {/* Modal */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => setIsModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFill} />

              <Animated.View style={[styles.modalContentWrapper, { transform: [{ translateX: modalTranslateX }] }]}>
                <Image
                  source={require('../assets/01_Images/Day4Menu.png')}
                  style={styles.modalImage}
                  resizeMode="contain"
                />

                <Pressable
                  onPress={() => {
                    console.log('CloseButton pressed');
                    Animated.timing(modalTranslateX, {
                      toValue: Dimensions.get('window').width,
                      duration: 500,
                      useNativeDriver: true,
                    }).start(() => {
                      setIsModalVisible(false);
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
  background: {
    flex: 1,
  },

  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },

  imageWrapper: {
    position: 'relative',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  roadmap: {
    width: 306,
    height: 1350,
    marginBottom: 50,

  },

  tileTouchableD5: {
    position: 'absolute',
    top: 738,
    left: '14.5%',
    zIndex: 3,
  },

  tileTouchableD4: {
    position: 'absolute',
    top: 841,
    left: '35%',
    zIndex: 3,
  },

  tile: {
    width: 141,
    resizeMode: 'contain',
  },

  modalOverlay: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContentWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalImage: {
    width: 360,
  },

  closeTileTouchable: {
    position: 'absolute',
    top: 218,
    right: 21,
    zIndex: 2,
  },

  closeButton: {
    width: 37,
    resizeMode: 'contain',
  },
});

export default Home;
