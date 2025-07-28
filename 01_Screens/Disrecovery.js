import { StyleSheet, Text, View, Button,TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

const Disrecovery = () => {
  const navigation = useNavigation(); // Get the navigation object
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Profile")}
        activeOpacity={0.6}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Button</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "powderblue",
    alignItems: "center",
    justifyContent: "center",
  },
  status: {
    fontFamily: "AlteHaasGrotesk", // Moved fontFamily to styles
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: 'black',
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});
export default Disrecovery;