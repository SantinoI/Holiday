import React, { Component } from 'react';
import { Image, TouchableOpacity} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { MaterialIcons, Feather } from "@expo/vector-icons";



export default class EventCard extends Component {
  render() {
    return (
      <Container style={{marginBottom: -450, marginLeft: 10, marginRight: 10}} >
        {/*<Header />*/}
        <Content>
          <Card style={{borderRadius: 25}}>
            <CardItem style={{borderRadius: 25}}>
              <Left>
                <Thumbnail source={{uri: 'Image URL'}} />
                <Body>
                  <Text>{this.props.data.nomeEvento}</Text>
                  <Text note>{this.props.data.agenzia}</Text>
                </Body>
              </Left>
              <Right>
                <Text>55$</Text>
              </Right>
            </CardItem>
            <CardItem cardBody style={{borderRadius: 25}}>
              <Image source= {require("../assets/image.png")} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem style={{borderRadius: 25,}}>
              <Left>
                <Button transparent>
                  <Icon active name="thumbs-up" />
                  <Text>12 Likes</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <Icon active name="chatbubbles" />
                  <Text>4 Comments</Text>
                </Button>
              </Body>
              <Right style={{marginRight: 25}}>
                <TouchableOpacity onPress={this.props.onFavorite}>
                  {this.props.data.favorite ? (
                    <Feather name="heart" size={25} color="red"/>) : (
                    <Feather name="heart" size={25} color="black"/>)}
                </TouchableOpacity>
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}