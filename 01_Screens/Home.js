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
} from 'react-native';


const Home = ({ navigation }) => {
  const scaleD5 = useRef(new Animated.Value(1)).current;
  const scaleD4 = useRef(new Animated.Value(1)).current;
  const scaleClose = useRef(new Animated.Value(1)).current;

  const modalTranslateX = useRef(new Animated.Value(Dimensions.get('window').width)).current;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlePressInD5 = () => {
    Animated.spring(scaleD5, {
      toValue: 1.05,
      useNativeDriver: true,
    }).start();
  };
  const handlePressOutD5 = () => {
    Animated.spring(scaleD5, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handlePressInD4 = () => {
    Animated.spring(scaleD4, {
      toValue: 1.05,
      useNativeDriver: true,
    }).start();
  };
  const handlePressOutD4 = () => {
    Animated.spring(scaleD4, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handlePressInCloseButton = () => {
    Animated.spring(scaleClose, {
      toValue: 1.5,
      useNativeDriver: true,
    }).start();
  };
  const handlePressOutCloseButton = () => {
    Animated.spring(scaleClose, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
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
          onPressIn={handlePressInD5}
          onPressOut={handlePressOutD5}
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
          onPressIn={handlePressInD4}
          onPressOut={handlePressOutD4}
          style={styles.tileTouchableD4}
        >
          <Animated.Image
            source={require('../assets/01_Images/TileD4.png')}
            style={[styles.tile, { transform: [{ scale: scaleD4 }] }]}
          />
        </Pressable>


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
                onPressIn={handlePressInCloseButton}
                onPressOut={handlePressOutCloseButton}
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
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: 'center', // center horizontally in ScrollView
    paddingBottom: 20,
    // marginTop: -40,
    // marginBottom: -40,
  },

  imageWrapper: {
    position: 'relative',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tileTouchableD5: {
    position: 'absolute',
    top: 738, // adjust based on roadmap height
    left: '14.5%',
    //transform: [{ translateX: -50 }],
    zIndex: 3,
  },

  tileTouchableD4: {
    position: 'absolute',
    top: 841, // adjust based on roadmap height
    left: '35%',
    zIndex: 3,
  },

  tile: {
    width: 141,
    // height: 150,
    resizeMode: 'contain',
  },

  roadmap: {
    width: 306,
    height: 1350,
    //mixBlendMode: 'color-burn',
  },
  buttonOverlay: {
    position: 'absolute',
    top: 100, // adjust this depending on where you want it
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: 'brown',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    zIndex: 1,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
  },

  modalOverlay: {
    flex: 1,
    // backgroundColor: '#00021A65',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  modalContentWrapper: {
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  },

  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    maxWidth: '90%',
    maxHeight: '80%',
  },
  

  modalImage: {
    width: 360,
  },

  closeTileTouchable: {
  position: 'absolute',
  top: 218, // adjust position as needed
  right: 21,
  zIndex: 2,
},

closeButton: {
  width: 37,
  resizeMode: 'contain',
},

  darkOverlay: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: 'rgba(0,0,0,0.3)', // adjust for desired tint
  },

});

export default Home;