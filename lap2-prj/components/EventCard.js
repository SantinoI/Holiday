import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Switch,
  TextInput,
  Platform,
  TouchableOpacity,
  Image,
  ActionSheetIOS,
} from 'react-native';

import { Card, Button, FormLabel, FormInput } from "react-native-elements";


const TINT_COLOR = 'rgb(4, 159, 239)';

export default class EventCard extends React.Component {
  /*state = {
    nomeEvento:"Nome da esempio",
    localita: "località da esempio",
    agenzia: "agenzia esempio"
  };*/

  render() {
    return (
      <View style={styles.container}>
        <Card containerStyle={styles.box1}>
          <View style={{marginLeft: 50}}>
            <Text>{this.props.data.nomeEvento}</Text>
            <Text>{this.props.data.localita}</Text>
            <Text>{this.props.data.agenzia}</Text>
          </View>
        </Card>
        <View style={styles.box2}>
          <Image
              resizeMode="contain" // vedere altre modalità
              style= {{width: 100, height: 100}}
              borderRadius = {25}
              source = {require("../assets/image.png")}
              /*source = { this.state.image
                ? { uri: this.state.image }
                : require("../assets/image.png")
              }*/
            />
        </View>
      </View>
    );
  }
}

/*EventCard.navigationOptions = ({ navigation }) => {
  return {
    title: "Event",
    headerStyle: {}
  };
};*/

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  box1: {
    position: 'absolute',
    top: 40,
    left: 40,
    width: 300,
    height: 150,
    borderRadius: 40,

  },
  box2: {
    position: 'absolute',
    top: 35,
    left: 25,
    width: 75,
    height: 75,
    backgroundColor: 'blue',
    borderRadius: 40,
  },

  text: {
    color: '#ffffff',
    fontSize: 80
  }
});
