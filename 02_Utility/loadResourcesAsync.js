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

//   // 2. Preload images
//   const imageAssets = [
//     require("../assets/01_Images/sample1.png"),
//     require("../assets/01_Images/sample2.png"),
//   ].map((img) => Asset.fromModule(img).downloadAsync());

  // // 3. Preload videos (Discovery carousel)
  // const videoAssets = [
  //   require("../assets/02_Videos/Armageddon.mp4"),
  //   require("../assets/02_Videos/isThisLove.mp4"),
  //   require("../assets/02_Videos/likeJennie.mp4"),
  //   require("../assets/02_Videos/dirtyWork.mp4"),
  //   require("../assets/02_Videos/FlyUp.mp4"),
  // ].map((vid) => Asset.fromModule(vid).downloadAsync());

  // 4. Wait for everything in parallel
  // await Promise.all([fontAssets, ...imageAssets, ...videoAssets]);
}