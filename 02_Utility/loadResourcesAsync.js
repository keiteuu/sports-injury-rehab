import * as Font from "expo-font";
import { Asset } from "expo-asset";

export default async function loadResourcesAsync() {
  // 1. Load fonts
  const fontAssets = Font.loadAsync({
    RegestoGroteskBlack: require("../assets/03_Fonts/Regesto/RegestoGrotesk-Black.ttf"),
    RegestoGroteskBold: require("../assets/03_Fonts/Regesto/RegestoGrotesk-Bold.ttf"),
    RegestoGroteskMedium: require("../assets/03_Fonts/Regesto/RegestoGrotesk-Medium.ttf"),
    RegestoGroteskRegular: require("../assets/03_Fonts/Regesto/RegestoGrotesk-Regular.ttf"),
    RegestoGroteskLight: require("../assets/03_Fonts/Regesto/RegestoGrotesk-Light.ttf"),
  });

}