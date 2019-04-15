import React, { Component } from "react";
import MV, { PROVIDER_GOOGLE } from 'react-native-maps'

export default class MapView extends Component {
  render() {
    return (
      <MV provider={PROVIDER_GOOGLE} {...this.props} style={[{flex: 1}, {...this.props.style}]}>
        {this.props.children}
      </MV>
    );
  }
}
