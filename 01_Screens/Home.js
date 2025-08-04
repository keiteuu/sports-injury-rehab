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

// ✅ Home screen that shows the carousel
const Home = ({ navigation }) => {
  const scaleD5 = useRef(new Animated.Value(1)).current;
  const scaleD4 = useRef(new Animated.Value(1)).current;

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

            <View>
              <Image
                source={require('../assets/01_Images/Day4Menu.png')} // change to your desired image
                style={styles.modalImage}
                resizeMode="contain"
              />
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
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
    height: 300,
    marginBottom: 20,
  },

  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'brown',
    borderRadius: 8,
  },

  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },

  darkOverlay: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: 'rgba(0,0,0,0.3)', // adjust for desired tint
  },

});

export default Home;