import React, { Component } from "react";
import { View } from "react-native";
import { Button, Text } from "native-base";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import ActionButton from "react-native-action-button";
import RootView from "../../components/RootView";
import SearchModal from "./components/SearchModal";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      text: ""
    };
  }

  render() {
    const { navigation } = this.props;
    return (
      <RootView>
        <View style={{ flex: 1 }} >
          <MapView
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
          />

          <Button full style={{ position: "absolute", top: 0, width: "100%" }}>
            <Text>{this.state.text}</Text>
          </Button>

          <SearchModal
            visible={this.state.showModal}
            onClose={text => {
              this.setState({ showModal: false, text });
            }}
          />

          <ActionButton
            onPress={() => {
              // navigation.navigate("EnterLocation");
              this.setState({ showModal: true });
            }}
          />
        </View>
      </RootView>
    );
  }
}
