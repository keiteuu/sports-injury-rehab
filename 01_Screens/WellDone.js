import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function WellDone({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Well Donee</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#383B73",
  },
  title: {
    fontSize: 20,
    color: "white",
  },
});