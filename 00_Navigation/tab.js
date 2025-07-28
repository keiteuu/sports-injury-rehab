import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet, Animated, Text, Image } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../01_Screens/Home";
import Disrecovery from "../01_Screens/Disrecovery";
import Profile from "../01_Screens/Profile";


const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Disrecovery" component={Disrecovery} />
      <HomeStack.Screen name="Profile" component={Profile} />
    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={[focused && { backgroundColor: "#ffffff" }]}>
              <Ionicons name="home" size={28} color={color} />
            </View>
          ),
          tabBarActiveTintColor: "skyblue",
          tabBarInactiveTintColor: "#ffffff",
          tabBarLabelStyle: {
            fontFamily: "Georgia",
            fontWeight: '300',
          },
          headerShown: true,
          headerStyle: {
            backgroundColor: "rgb(0,91,238)", // Header background color
          },
          headerTitleStyle: {
            color: 'white', // Header title color
            fontSize: 20, // Header title font size
            fontWeight: 'bold', // Header title font weight
            paddingLeft: 16, paddingRight: 16, paddingBottom: 20,
          },
        }}
      />
      
      <Tab.Screen 
        name="Dis(Re)Covery" 
        component={() => (
          <View style={{ paddingTop: 50, paddingBottom: 20, paddingLeft: 16, paddingRight: 16 }}>
          <Disrecovery />
          </View>
    
        )}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={[focused && { backgroundColor: "#ffffff" }]}>
              <Feather name="search" size={20} color={color} />
            </View>
          ),
          headerShown: true,
          headerStyle: {
            backgroundColor: "#383B73",
            height: 124,
            paddingTop: 20, // Header background color
            borderRadius: 12,
          },
          headerTitleStyle: {
            color: 'white', // Header title color
            fontSize: 20, // Header title font size
            fontWeight: 'bold', // Header title font weight
          },
          headerTitleContainerStyle: {
          paddingLeft: 16, // Add padding to the left of the title
          paddingRight: 16, // Add padding to the right of the title
          paddingTop: 20,
          paddingBottom: 20, // Add padding to the bottom of the title
          },
        }}
      />

      <Tab.Screen 
        name="Profile" 
        component={Profile}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={[focused && { backgroundColor: "#ffffff" }]}>
              <MaterialCommunityIcons name="face-man-profile" size={28} color={color} />
            </View>            
          ),
          headerShown: true,
          headerStyle: {
            backgroundColor: "rgb(0,91,238)", // Header background color
          },
          headerTitleStyle: {
            color: 'white', // Header title color
            fontSize: 20, // Header title font size
            fontWeight: 'bold', // Header title font weight
          },
        }} 
      />
    </Tab.Navigator>
  );
}