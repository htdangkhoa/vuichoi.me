import React, { Component } from "react";
import RootView from "../../components/RootView";
import { Button, Text } from "native-base";

export default class Login extends Component {
  render() {
    const { navigation } = this.props

    return (
      <RootView>
        <Text>Login</Text>

        <Button onPress={() => navigation.navigate("App")}>
          <Text>Login</Text>
        </Button>
      </RootView>
    );
  }
}
