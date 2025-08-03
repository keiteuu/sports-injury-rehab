import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';


// ✅ Home screen that shows the carousel
const Home = ({ navigation }) => {
  return (
    
    
    <ScrollView>
      <Image source={require('../assets/01_Images/Recovery Roadmap.png')} style={styles.roadmap} />
    </ScrollView>

    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    // width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roadmap: {
    // width: 306,
    flex: 1,
    height: 1350,
    justifyContent: 'center',
    // alignContent: 'center',
    // alignItems:'center',
    // flexShrink: 0,
    //borderRadius: 16,
  },
  button: {
    alignItems:'center',
    justifyContent:'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: 'brown',
    height: 56,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Home;
