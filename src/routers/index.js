import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import AuthStack from "./auth";
import Home from "../ui/home";
import EnterLocation from "../ui/enterlocation";
import EnterStopPoints from "../ui/enterStopPoints";

const AppStack = createStackNavigator(
  {
    Home: Home,
    "Stop Points": EnterStopPoints,
    EnterLocation: EnterLocation
  },
  {
    headerMode: "none",
    initialRouteName: "Home"
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "App",
      headerMode: "none"
    }
  )
);
