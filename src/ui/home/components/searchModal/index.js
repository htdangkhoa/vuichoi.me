import React, { Component } from "react";
import { TextInput, SafeAreaView, TouchableOpacity, View } from "react-native";
import { Modal, FlatList } from "react-native";
import {
  Button,
  Text,
  Content,
  Container,
  Header,
  Left,
  Body,
  Title,
  Right
} from "native-base";
import { debounce } from "lodash";
import axios from "axios";
import style from "./style";
import { onPlaceAutoComplete } from '../../../../network'

export default class SearchModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      text: "",
      places: []
    };
  }

  componentWillReceiveProps(props) {
    const { visible } = props;

    this.setState({ visible });
  }

  onChangeText = text => {
    this.setState({ text });

    this.onGetPlace(text);
  };

  onGetPlace = debounce(async text => {
    if (!text || text.length < 3) return;

    try {
      const { data } = await onPlaceAutoComplete(text);

      console.log(data);

      await this.setState({ places: [...data.predictions] });
    } catch (error) {
      console.log(error);
    }
  }, 1000);

  render() {
    return (
      <Modal
        visible={this.state.visible}
        onDismiss={() => this.setState({ text: "", places: [] })}
        animationType="slide"
      >
        <Container>
          <Header>
            <Left />
            <Body>
              <Title>Search</Title>
            </Body>
            <Right>
              <Button
                transparent
                onPress={() => this.setState({ visible: false })}
              >
                <Text>Cancel</Text>
              </Button>
            </Right>
          </Header>

          <Content style={style.content}>
            <View style={style.searchBox}>
              <TextInput
                style={style.textInput}
                placeholder="Search"
                onChangeText={this.onChangeText}
                value={this.state.text}
                autoFocus
              />
            </View>

            <FlatList
              data={this.state.places}
              keyExtractor={item => item.id}
              renderItem={element => {
                const { item } = element;

                return (
                  <TouchableOpacity
                    key={`${element.index}`}
                    onPress={this.props.onClose.bind(this, {...item}, this.props.requestId)}
                    style={
                      element.index !== this.state.places.length - 1
                        ? style.separator
                        : {}
                    }
                  >
                    <View style={style.placeContainer}>
                      <Text style={style.placeMainText}>
                        {item.structured_formatting.main_text}
                      </Text>
                      <Text style={style.placeSecondaryText}>
                        {item.structured_formatting.secondary_text}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </Content>
        </Container>
      </Modal>
    );
  }
}