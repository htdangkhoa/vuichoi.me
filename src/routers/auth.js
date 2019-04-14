import { createStackNavigator } from "react-navigation";
import Login from "../ui/login";

const AuthStack = createStackNavigator(
  {
    Login: Login
  },
  {
    headerMode: "none",
    initialRouteName: "Login"
  }
);

export default AuthStack;
