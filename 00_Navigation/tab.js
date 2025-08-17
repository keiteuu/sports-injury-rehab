import React, { useRef, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Image, StyleSheet, Animated, Pressable } from "react-native";
import Home from "../01_Screens/Home";
import Disrecovery from "../01_Screens/Disrecovery";
import Profile from "../01_Screens/Profile";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const TabIcon = ({ focused, onIcon, offIcon, routeName }) => {
  const navigation = useNavigation();

  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  // a small reusable animation sequence that bounces the icon
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
      // gently return to normal if requested
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

  // animate when `focused` changes
  useEffect(() => {
    if (focused) runBounce(true);
    else runBounce(false);
  }, [focused]);

  // Press handler: animate and navigate (so we also animate when tab is already focused)
  const handlePress = () => {
    runBounce(true);
    // navigate to the route — same behaviour as the tab press, safe to call
    if (routeName) navigation.navigate(routeName);
  };

  return (
    <Pressable onPress={handlePress} android_ripple={{ color: "transparent" }}>
      <Animated.View
        style={{
          transform: [{ scale }, { translateY }],
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image source={focused ? onIcon : offIcon} style={styles.icon} />
      </Animated.View>
    </Pressable>
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
          backgroundColor: "transparent", // transparent base
          position: "absolute",
          borderTopWidth: 0,
          elevation: 0,
          overflow: "hidden", // clip corners
        },
        // 🚀 Remove tabBarInner entirely, it’s causing the white bleed
        tabBarLabelStyle: {
          fontFamily: "RegestoGroteskMedium",
          fontSize: 12,
        },
        tabBarIconStyle: {
          marginBottom: 4,
        },
        tabBarBackground: () => (
          <View
            style={{
              flex: 1,
              backgroundColor: "#383B73", // ✅ your real background color
            }}
          />
        ),
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              onIcon={require("../assets/01_Images/NavBarIcons/HomeOn.png")}
              offIcon={require("../assets/01_Images/NavBarIcons/HomeOff.png")}
            />
          ),
          headerShown: true,
          headerStyle: {
            backgroundColor: "rgb(0,91,238)",
          },
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
        // component={() => (
        //   <View style={{ paddingTop: 50, paddingBottom: 20, paddingHorizontal: 16 }}>
        //     <Disrecovery />
        //   </View>
        // )}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              onIcon={require("../assets/01_Images/NavBarIcons/RediscoveryOn.png")}
              offIcon={require("../assets/01_Images/NavBarIcons/RediscoveryOff.png")}
            />
          ),
          headerShown: true,
          headerStyle: {
            backgroundColor: "#383B73",
            height:120,
            padding: 20,
            borderRadius: 12,
          },
          
          headerTitleStyle: {
            color: "#FFF94C",
            fontFamily:"RegestoGroteskBold",
            fontSize: 20,
            fontWeight: "bold",
          },
          headerTitleContainerStyle: {
            paddingHorizontal: 16,
            paddingBottom: 20,
          },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              onIcon={require("../assets/01_Images/NavBarIcons/ProfileOn.png")}
              offIcon={require("../assets/01_Images/NavBarIcons/ProfileOff.png")}
            />
          ),
          headerShown: true,
          headerStyle: {
            backgroundColor: "rgb(0,91,238)",

          },
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
