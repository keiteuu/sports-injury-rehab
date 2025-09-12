import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Disrecovery from "../01_Screens/Disrecovery";
import ReelOptions from "../01_Screens/ReelOptions";
import ReelPlayer from "../01_Screens/ReelPlayer";
import { View, Text, Image } from "react-native";

const DisrecoveryStack = createNativeStackNavigator();

export function DisrecoveryStackScreen() {
  return (
    <DisrecoveryStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#383B73",
          borderBottomWidth: 2,
          borderBottomColor: "#222345",
          height: 96, // 👈 match tab header height

        },
        headerTitleStyle: {
          fontFamily: "RegestoGroteskBold",
          fontSize: 20,
          paddingLeft: 16,
          color: "#FFF94C",
        },
            headerTitleAlign: "left", // 👈 so text aligns like your tab header

      }}
    >
      {/* MAIN Disrecovery Screen */}
      <DisrecoveryStack.Screen
        name="Disrecovery"
        component={Disrecovery}
        options={{
          headerShown: false,
          headerTitle: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              {/* Left side */}
              <Text
                style={{
                  fontFamily: "RegestoGroteskBold",
                  fontSize: 20,
                  color: "#FFF94C",
                  paddingLeft: 16,
                }}
              >Dis(Re)Covery
              </Text>
            </View>
          ),
        }}
      />

      {/* REEL OPTIONS Screen */}
      <DisrecoveryStack.Screen
        name="ReelOptions"
        component={ReelOptions}
        options={{
          title: "Reel Options",
          headerShown: false,
        }}
      />

      {/* REEL Player Screen */}
      <DisrecoveryStack.Screen
        name="ReelPlayer"
        component={ReelPlayer}
        options={{
          title: "Reel Player",
          headerShown: false,
        }}
      />
    </DisrecoveryStack.Navigator>
  );
}
