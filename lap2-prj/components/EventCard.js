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

import { Card, Button, FormLabel, FormInput } from 'react-native-elements';

const TINT_COLOR = 'rgb(4, 159, 239)';

export default class EventCard extends React.Component {
  render() {
    return (
      <View style={styles.row}>
<<<<<<< HEAD
        <View style={styles.textbox}>
          <Text style={{marginBottom: 20}}>{this.props.data.nomeEvento}</Text>
          <Text style={styles.text}>{this.props.data.localita}</Text>
          <Text style={styles.text}>{this.props.data.agenzia}</Text>
        </View>

        {/* <View style={styles.box1}>*/}
          <Image
            style={styles.box1}
            resizeMethod="resize"
            source= {require("../assets/image.png")}
          />
        {/*</View>*/}
=======
        <Text style={styles.text}>{this.props.data.nomeEvento}</Text>
        <Text style={styles.text}>{this.props.data.localita}</Text>
        <Text style={styles.text}>{this.props.data.agenzia}</Text>

        <View style={styles.box1}>
          <Image
            resizeMethod="resize"
            style= {{width: 150, height: 150}}
            source= {require("../assets/image.png")}
          />
        </View>
>>>>>>> f2f9649ffb3e37bd5fe2c590285a8fa75b5f5dd8
        
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
<<<<<<< HEAD
    // se metti flex 1 crasha il mondo
=======
>>>>>>> f2f9649ffb3e37bd5fe2c590285a8fa75b5f5dd8
    flexDirection: 'row',
    height: 200,
    //borderBottomWidth:,
    borderBottomColor: '#ddd',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 25,
    borderRadius: 30,
    //padding: 10,
  },

  box1: {
    height: 150,
    width: 150,
    position: 'absolute',
    top: -20,
    left: -20,
<<<<<<< HEAD
    borderRadius: 30,
  },

  textbox: {
    flexDirection: 'column',
    flex: 1,
    borderWidth: 1,
    alignItems: "flex-start",
    top: -30,
    marginLeft: 150,
    marginRight: 25,
=======
    backgroundColor: 'red',
    borderRadius: 30,
>>>>>>> f2f9649ffb3e37bd5fe2c590285a8fa75b5f5dd8
  },
  
  text: {
    color: 'blue',
<<<<<<< HEAD
    marginBottom: 10,
=======
>>>>>>> f2f9649ffb3e37bd5fe2c590285a8fa75b5f5dd8
  },
});
