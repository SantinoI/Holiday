import React from "react";
import {
  StyleSheet,
  Platform,
  Text,
  ScrollView,
  View,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image
} from "react-native";
import {Card, CardItem,Container } from 'native-base';

const TINT_COLOR = "#39b9c3";
const BACKGROUND_COLOR = "#d7e4e5";


export default class BookingPage extends React.Component {
    state = {
        totale: 0,
        numeroPersone: 0
    }
  render() {
    return (
        <Container style={{backgroundColor: BACKGROUND_COLOR}}>

          <Card style={{ marginLeft: 10, marginRight: 10, borderRadius: 10}}>

           <CardItem style={{marginTop: 20}}>
              <Text> Adulti: {this.state.numeroPersone} </Text>
              <TouchableOpacity
                style={styles.searchButton}
                activeOpacity={0.5}
                onPress={() => this.setState({numeroPersone: this.state.numeroPersone + 1})}
              >
                <Text style={{color: "white", fontSize: 22}}> + </Text>
              </TouchableOpacity>

              {this.state.numeroPersone > 0 ? 
                (
                  <TouchableOpacity
                    style={styles.searchButton}
                    activeOpacity={0.5}
                    onPress={() => this.setState({numeroPersone: this.state.numeroPersone - 1})}
                  >
                    <Text style={{color: "white", fontSize: 22}}> - </Text>
                  </TouchableOpacity>
                ) :
                <TouchableOpacity
                    style={styles.searchButton}
                    activeOpacity={0.5}
                  >
                    <Text style={{color: "grey", fontSize: 30,}}>-</Text>
                  </TouchableOpacity>
              }
            </CardItem>
      
          </Card>
        </Container>
    );
  }   
}

BookingPage.navigationOptions = ({ navigation }) => {
  return {
    title: "Prenotazione",
    headerStyle: {
      backgroundColor: BACKGROUND_COLOR,
      borderBottomWidth: 0
    },
  };
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: "center"
  },

  searchButton: {
    marginLeft: '2%',
    marginRight: '2%',
    padding: 0,
    backgroundColor: TINT_COLOR,
    //width: 50,
    //height: 50,
    //borderRadius: 50,
  },
});
