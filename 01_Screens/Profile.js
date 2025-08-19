import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  ImageBackground
} from "react-native";

const Profile = ({ navigation }) => {

  return (
    <ImageBackground
          source={require("../assets/01_Images/Backgrounds/DisrecoveryBg.png")} 
          style={styles.background}
          resizeMode="cover"
        >
      <View style={styles.container}>
      
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "skyblue",
    alignItems: "center",
    justifyContent: "center",
  },

  background: { flex: 1 },
  container: { flex: 1 },
});

export default Profile;
