import { StyleSheet, Text, View, Button,TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
// import { useSharedValue } from "react-native-reanimated";
// import Carousel from "react-native-reanimated-carousel";

import * as React from "react";

  const Disrecovery = () => {

    
    return (
      <View style={styles.container} >
        <TouchableOpacity
          onPress={() => alert('Button Pressed!')}
          activeOpacity={0.6}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Knee Strain</Text>
        </TouchableOpacity>




      </View> 
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "powderblue",
    justifyContent: 'stretch',
    alignItems: 'stretch',
    marginTop: -32,
  },
  // status: {
  //   fontFamily: "AlteHaasGrotesk", // Moved fontFamily to styles
  //   fontSize: 24,
  //   marginBottom: 20,
  // },
  
  sliderContainer: {
    flex: 2,
    backgroundColor:'pink'
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
export default Disrecovery;