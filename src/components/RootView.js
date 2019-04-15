import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Right,
  Button,
  Icon,
  Text
} from "native-base";
import { withNavigation } from "react-navigation";

class RootView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;

    const { state } = navigation;

    const currentIndex = navigation.dangerouslyGetParent().state.index;

    return (
      <Container>
        <Header>
          <Left>
            {currentIndex != 0 && (
              <Button transparent iconLeft onPress={() => navigation.goBack()}>
                <Icon
                  name="arrow-back"
                  style={{ marginLeft: 0, marginRight: 4 }}
                />
                <Text>Back</Text>
              </Button>
            )}
          </Left>
          <Body>
            <Title>{state.routeName}</Title>
          </Body>
          <Right />
        </Header>

        <SafeAreaView style={{ flex: 1 }}>{this.props.children}</SafeAreaView>
      </Container>
    );
  }
}

const mapStateToProps = state => state;

export default withNavigation(RootView);
