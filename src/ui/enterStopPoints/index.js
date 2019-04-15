import React, { Component } from "react";
import { Text, View } from "react-native";
import RootView from "../../components/RootView";
import MapView from '../../components/MapView'

export default class EnterStopPoints extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    console.log(this.props);

    return (
      <RootView>
        <MapView />
      </RootView>
    );
  }
}
