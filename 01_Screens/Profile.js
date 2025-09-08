import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  ImageBackground,
  Image
, Dimensions,
} from "react-native";

const Profile = ({ navigation }) => {
const { width } = Dimensions.get("window");

  return (
    <ImageBackground
          source={require("../assets/01_Images/Backgrounds/DisrecoveryBg.png")} 
          style={styles.background}
          resizeMode="cover"
        >
      <View >
        <Image
          source={require('../assets/01_Images/Top Gradient.png')}
          style={{position: 'absolute',  }}/>

          <View  style={{justifyContent: 'center',alignItems: 'center'}}>
           <Image
            source={require('../assets/01_Images/Profile.png')}
            style={{justifyContent:'center',alignItems: 'center', width: width-32, resizeMode: 'contain', marginTop: -56, }}/>
          

              </View>
              <View>
                <Text style={styles.sectionTitle}>
                  FRIENDS
                </Text>
                <Image
                source={require('../assets/01_Images/Friend List.png')}
                style={{ marginHorizontal: 15, width: width-32, resizeMode: 'contain', marginTop: -200,}}/>
              </View>
            
          </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1 },

  sectionTitle: {
    color: "#FDFDFD",
    fontFamily: "BenzinSemibold",
    fontSize: 18,
    marginLeft: 16,
    marginTop: -56,
  },
});

export default Profile;
