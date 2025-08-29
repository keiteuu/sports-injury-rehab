import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  ImageBackground,
  Image
} from "react-native";

const Profile = ({ navigation }) => {

  return (
    <ImageBackground
          source={require("../assets/01_Images/Backgrounds/DisrecoveryBg.png")} 
          style={styles.background}
          resizeMode="cover"
        >
      <View>
        <Image
          source={require('../assets/01_Images/Top Gradient.png')}
          style={{position: 'absolute',  }}/>

          <View>
            <Image
            source={require('../assets/01_Images/Profile.png')}
            style={{marginTop: 24, marginHorizontal: 16, width: '92%', height:'48%', resizeMode:'contain',  }}/>

              </View>
              <View>
                <Text style={styles.sectionTitle}>
                  FRIENDS
                </Text>
                <Image
                source={require('../assets/01_Images/Friend List.png')}
                style={{marginTop: 24, marginHorizontal: 16, width: '92%', height:'48%', resizeMode:'contain',  }}/>
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
    marginVertical: 12,
    marginBottom: 16,
  },
});

export default Profile;
