import React, { Component } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { Icon } from "native-base";
import style from "./style";

export default class InputLocation extends Component {
  render() {
    return (
      <TouchableOpacity
        {...this.props}
        style={[style.touchableOpacityContainer, { ...this.props.style }]}
      >
        {/* <View>
          
        </View> */}

        {this.props.iconName && (
          <Icon type="Feather" name={this.props.iconName} style={style.icon} />
        )}
        <TextInput
          placeholder={this.props.placeholder}
          editable={false}
          selectTextOnFocus={false}
          contextMenuHidden={false}
          value={this.props.value}
          style={style.textInput}
          pointerEvents="none"
          underlineColorAndroid="transparent"
        />
      </TouchableOpacity>
    );
  }
}
