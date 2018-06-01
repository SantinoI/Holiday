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
        
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    // se metti flex 1 crasha il mondo
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
  },

  text: {
    color: 'blue',
    marginBottom: 10,
  },
});
