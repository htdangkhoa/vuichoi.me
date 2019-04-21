import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { Button, Text, Icon } from "native-base";
import RootView from "../../components/RootView";
import MapView from "../../components/MapView";
import InputLocation from "../../components/InputLocation";
import style from "./style";

const modalHeight = 230;

export default class EnterStopPoints extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false,
      heightOfMapView: 0
    };
  }

  render() {
    const { navigation } = this.props;

    const { startPoint, endPoint } = navigation.state.params;

    return (
      <RootView>
        <MapView
          initialRegion={{
            latitude: 10.812496,
            longitude: 106.7092023,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          onLayout={event => {
            this.setState({ heightOfMapView: event.nativeEvent.layout.height });
          }}
        />

        <View>
          <View style={style.bottomSheet}>
            <View
              style={[
                style.bottomSheetContainer,
                {
                  height: this.state.isExpanded
                    ? this.state.heightOfMapView
                    : modalHeight,
                  borderTopLeftRadius: this.state.isExpanded ? 0 : 16,
                  borderTopRightRadius: this.state.isExpanded ? 0 : 16
                }
              ]}
            >
              <Button
                full
                transparent
                style={style.bottomSheetAction}
                onPress={() => {
                  this.setState({ isExpanded: !this.state.isExpanded });
                }}
              >
                <Icon
                  type="Feather"
                  name={this.state.isExpanded ? "chevron-down" : "chevron-up"}
                  style={style.bottomSheetActionIcon}
                />
              </Button>

              <ScrollView bounces={false}>
                <View style={style.bottomSheetContentContainer}>
                  <InputLocation
                    iconName="crosshair"
                    placeholder="Enter Start Point"
                    value={startPoint.description}
                  />

                  <InputLocation
                    iconName="map-pin"
                    placeholder="Enter End Point"
                    value={endPoint.description}
                  />

                  <Button full style={style.btnAddStopPoints}>
                    <Text>Add Stop Points</Text>
                  </Button>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </RootView>
    );
  }
}
