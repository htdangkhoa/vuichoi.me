import React, { Component } from "react";
import { View, TouchableOpacity, TextInput, Modal } from "react-native";
import { Button, Text, Icon } from "native-base";
import { Polyline, Marker } from "react-native-maps";
import RootView from "../../components/RootView";
import SearchModal from "./components/searchModal";
import MapView from "../../components/MapView";
import style from "./style";
import { decode } from "@mapbox/polyline";
import { onDirections } from "../../network";

const REQUEST_ENTER_START_POINT = "REQUEST_ENTER_START_POINT";

const REQUEST_ENTER_END_POINT = "REQUEST_ENTER_END_POINT";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: 10.812496,
      longitude: 106.7092023,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      markers: [],
      showModal: false,
      requestId: null,
      startPoint: {},
      endPoint: {},
      coords: []
    };
  }

  onGetDirections = async () => {
    try {
      const { data } = await onDirections(
        this.state.startPoint.place_id,
        this.state.endPoint.place_id
      );

      console.log(data);

      const { routes } = data;

      const { overview_polyline, bounds, legs } = routes[0];

      const { southwest, northeast } = bounds;

      const latLngs = [];

      const points = decode(overview_polyline.points);

      const coords = points.map(point => {
        return {
          latitude: point[0],
          longitude: point[1]
        };
      });

      const latitudeDelta = Math.abs(southwest.lat - northeast.lat);

      const longitudeDelta = Math.abs(southwest.lng - northeast.lng);

      const listMarker = [];
      for (let i = 0; i < legs.length; i++) {
        const { start_location, end_location } = legs[i];

        if (i === 0) {
          listMarker.push({
            latitude: start_location.lat,
            longitude: start_location.lng
          });
        }

        listMarker.push({
          latitude: end_location.lat,
          longitude: end_location.lng
        });
      }

      await this.setState({
        coords: [...coords],
        latitudeDelta,
        longitudeDelta,
        markers: [...listMarker]
      });

      console.log(this.state);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { navigation } = this.props;

    return (
      <RootView>
        <View style={{ flex: 1 }}>
          <MapView
            initialRegion={{
              latitude: 10.812496,
              longitude: 106.7092023,
              latitudeDelta: this.state.latitudeDelta,
              longitudeDelta: this.state.longitudeDelta
            }}
            style={{ flex: 1 }}
          >
            <Polyline
              coordinates={this.state.coords}
              fillColor="red"
              lineCap="round"
              strokeWidth={5}
            />

            {this.state.markers.map((coord, index) => (
              <Marker coordinate={coord} key={`${index}`} />
            ))}
          </MapView>

          <View style={style.placeContainer}>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  showModal: true,
                  requestId: REQUEST_ENTER_START_POINT
                });
              }}
            >
              <View style={style.textInputContainer}>
                <Icon name="locate" style={style.icon} />
                <TextInput
                  placeholder="Enter Start Point"
                  editable={false}
                  selectTextOnFocus={false}
                  contextMenuHidden={false}
                  value={this.state.startPoint.description || ""}
                  style={style.textInput}
                  pointerEvents="none"
                  underlineColorAndroid="transparent"
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.setState({
                  showModal: true,
                  requestId: REQUEST_ENTER_END_POINT
                });
              }}
            >
              <View style={style.textInputContainer}>
                <Icon name="pin" style={style.icon} />
                <TextInput
                  placeholder="Enter End Point"
                  editable={false}
                  selectTextOnFocus={false}
                  contextMenuHidden={false}
                  value={this.state.endPoint.description || ""}
                  style={style.textInput}
                  pointerEvents="none"
                  underlineColorAndroid="transparent"
                />
              </View>
            </TouchableOpacity>
          </View>

          <SearchModal
            visible={this.state.showModal}
            requestId={this.state.requestId}
            onClose={async (place, requestId) => {
              switch (requestId) {
                case REQUEST_ENTER_START_POINT:
                  await this.setState({
                    showModal: false,
                    startPoint: { ...place }
                  });
                  break;
                default:
                  await this.setState({
                    showModal: false,
                    endPoint: { ...place }
                  });

                  await this.onGetDirections();
                  break;
              }
            }}
          />

          <Button
            full
            style={style.btnNext}
            onPress={() =>
              navigation.navigate("Enter Stop Points", {
                startPoint: this.state.startPoint,
                endPoint: this.state.endPoint
              })
            }
          >
            <Text>Next</Text>
          </Button>

          {/* <Modal visible={true} transparent>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "flex-end",
                backgroundColor: "#0000004D"
              }}
            >
              <View
                style={{
                  flex: 0.4,
                  backgroundColor: "red",
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15
                }}
              />
            </View>
          </Modal> */}
        </View>
      </RootView>
    );
  }
}
