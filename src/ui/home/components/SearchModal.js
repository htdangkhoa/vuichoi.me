import React, { Component } from "react";
import { TextInput, SafeAreaView } from "react-native";
import { Modal, FlatList,  } from "react-native";
import { Button, Text, Content } from "native-base";
import { debounce } from "lodash";
import axios from "axios";

export default class SearchModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      places: []
    };
  }

  onChangeText = text => {
    this.setState({ text });

    this.onGetPlace(text);
  };

  onGetPlace = debounce(async text => {
    if (!text || text.length < 3) return;

    try {
      const { data } = await axios({
        url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=AIzaSyAn6Yh_RWK_E-UKs7UJpsAdD3eUTiocaVU&components=country:sg|country:vn&region=vn`,
        method: "GET"
      });

      console.log(data);

      await this.setState({ places: [...data.predictions] });

      console.log(this.state.places);
    } catch (error) {
      console.log(error);
    }
  }, 1000);

  render() {
    return (
      <Modal visible={this.props.visible} onShow={() => this.setState({ text: "", places: [] })}>
        <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
          <TextInput
            placeholder="Search"
            onChangeText={this.onChangeText}
            value={this.state.text}
          />

          <Content style={{ flex: 1 }}>
            <FlatList
              data={this.state.places}
              keyExtractor={item => item.id}
              renderItem={element => {
                const { item } = element

                return (
                  <Button
                    full
                    transparent
                    key={`${element.index}`}
                    onPress={this.props.onClose.bind(this, item.description)}
                  >
                    <Text>{item.description}</Text>
                  </Button>
                );
              }}
            />
          </Content>
        </SafeAreaView>
      </Modal>
    );
  }
}
