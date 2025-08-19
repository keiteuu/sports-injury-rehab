import React, { useRef, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Image, StyleSheet, Animated } from "react-native";
import Home from "../01_Screens/Home";
import Disrecovery from "../01_Screens/Disrecovery";
import Profile from "../01_Screens/Profile";

const Tab = createBottomTabNavigator();

const AnimatedIcon = ({ focused, onIcon, offIcon }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const runBounce = (toBig = true) => {
    if (toBig) {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 1.25,
            duration: 140,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: -8,
            duration: 140,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 1,
            duration: 160,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 160,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  useEffect(() => {
    if (focused) runBounce(true);
    else runBounce(false);
  }, [focused]);

  return (
    <Animated.View
      style={{
        transform: [{ scale }, { translateY }],
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image source={focused ? onIcon : offIcon} style={styles.icon} />
    </Animated.View>
  );
};

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 96,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          paddingTop: 12,
          backgroundColor: "transparent",
          position: "absolute",
          borderTopWidth: 0,
          elevation: 0,
          overflow: "hidden",
        },
        tabBarLabelStyle: {
          fontFamily: "RegestoGroteskMedium",
          fontSize: 12,
        },
        tabBarBackground: () => (
          <View style={{ flex: 1, backgroundColor: "#383B73" }} />
        ),
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <AnimatedIcon
              focused={focused}
              onIcon={require("../assets/01_Images/NavBarIcons/HomeOn.png")}
              offIcon={require("../assets/01_Images/NavBarIcons/HomeOff.png")}
            />
          ),
          headerShown: true,
          headerStyle: { backgroundColor: "rgb(0,91,238)" },
          headerTitleStyle: {
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
          },
        }}
      />

      <Tab.Screen
        name="Dis(Re)Covery"
        component={Disrecovery}
        options={{
          tabBarIcon: ({ focused }) => (
            <AnimatedIcon
              focused={focused}
              onIcon={require("../assets/01_Images/NavBarIcons/RediscoveryOn.png")}
              offIcon={require("../assets/01_Images/NavBarIcons/RediscoveryOff.png")}
            />
          ),
          headerShown: true,
          headerBackground: () => (
            <View
              style={{
                flex: 1,
                backgroundColor: "#383B73",
                borderBottomWidth: 2,
                borderBottomColor: "#1B2342",
              }}
            />
          ),
          headerTitleStyle: {
            fontFamily: "RegestoGroteskBold",
            fontSize: 20,
            paddingLeft: 16,
            color: "#FFF94C",
          },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <AnimatedIcon
              focused={focused}
              onIcon={require("../assets/01_Images/NavBarIcons/ProfileOn.png")}
              offIcon={require("../assets/01_Images/NavBarIcons/ProfileOff.png")}
            />
          ),
          headerShown: true,
          headerStyle: { backgroundColor: "rgb(0,91,238)" },
          headerTitleStyle: {
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
});
