import { Navigation } from "react-native-navigation"
import { Provider } from "react-redux"
import store from "./store"
import { registerScreens } from "./screens"

// Registration for all the screens of the app
registerScreens(store, Provider) 

// Start the app
Navigation.startSingleScreenApp({
  screen: {
    screen: "carousell.HomeScreen",
    title: "Carousell",
    navigatorStyle: { navBarBackgroundColor: '#0099cc', navBarTextColor: '#fff'},
    navigatorButtons: {},
  },
})

export default () => {}
