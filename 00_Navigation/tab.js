import React, { useRef, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Image, StyleSheet, Animated } from "react-native";
import Home from "../01_Screens/Home";
import Disrecovery from "../01_Screens/Disrecovery";
import Profile from "../01_Screens/Profile";

const Tab = createBottomTabNavigator();

const TabIcon = ({ focused, onIcon, offIcon }) => {
  const bounceValue = useRef(new Animated.Value(1)).current; // for scale
  const translateY = useRef(new Animated.Value(0)).current; // for vertical movement

  useEffect(() => {
    if (focused) {
      Animated.parallel([
        Animated.sequence([
          Animated.timing(translateY, {
            toValue: -10,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(bounceValue, {
          toValue: 1.3,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.timing(bounceValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [focused]);

  return (
    <Animated.View
      style={{
        transform: [{ scale: bounceValue }, { translateY }],
      }}
    >
      <Image
        source={focused ? onIcon : offIcon}
        style={styles.icon}
      />
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
          backgroundColor: "#383B73",
          
          // backgroundColor:"transparent",
        },
        tabBarLabelStyle: {
          fontFamily: "Georgia",
          fontWeight: "300",
          fontSize: 12,
        },

        tabBarIconStyle: {
          marginBottom: 4, // 👈 push icon up or down
        },

        tabBarActiveTintColor: "#248EC7",
        tabBarInactiveTintColor: "#fdfdfd60",
        headerTitleAlign: "center",
        
        // backgroundColor: 'transparent',
        // position: 'absolute',
        // borderTopWidth: 0,
        // elevation: 0, // for Android shadow

        tabBarBackground: () => <></>,
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
            height: 124,
            borderRadius: 12,
          },
          headerTitleStyle: {
            color: "white",
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
