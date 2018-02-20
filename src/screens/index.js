import { Navigation } from "react-native-navigation"
import HomeScreen from "./HomeScreen"
import CreateTopicScreen from "./CreateTopicScreen"

// Registration of all the screens of the app
export function registerScreens(store, Provider) {
  Navigation.registerComponent("carousell.HomeScreen", () => HomeScreen, store, Provider)
  Navigation.registerComponent("carousell.CreateTopicScreen", () => CreateTopicScreen, store, Provider)
}
