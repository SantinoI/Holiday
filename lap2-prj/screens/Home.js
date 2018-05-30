import React from "react";
import {
  StyleSheet,
  Platform,
  Text,
  ScrollView,
  View,
  FlatList,
  TouchableHighlight,
  TextInput
} from "react-native";
import { Permissions, Location } from "expo";

import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { StackNavigator } from "react-navigation";
import { TabNavigator } from "react-navigation";

import { SearchBar, Button } from "react-native-elements";

import * as firebase from "firebase";

const TINT_COLOR = "rgb(4, 159, 239)";

export default class Home extends React.Component {
  state = {
    text: "",
    address: "",
    location:""
  };

  async componentWillMount(){
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        alert("You need to enable the GPS and authorize it");
        return;
      }else{
        let location = await Location.getCurrentPositionAsync();
        console.log(location);
        this.setState({ location: location.coords, isMapVisible: true });
        let address = await Location.reverseGeocodeAsync(location.coords);
        this.setState({
          address: address[0].city + ", " + address[0].name
        });
        console.log(address);
      }
  }

  // Funzione che passa come parametro il contenuto della searchBar alla navigation quando viene premuto il button search
  _goToResult = item => {
    this.props.navigation.navigate("SearchResult", {
      request: item,
    })
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.searchContainer}>
          <SearchBar
            containerStyle={styles.searchBar}
            onChangeText={value => this.setState({ text: value })}
            lightTheme
            showLoading
            searchIcon={true}
            placeholder="Type Here..."
            Platform={Platform.OS === "ios" ? "ios" : "android"}
            cancelIcon={{ type: "font-awesome", name: "chevron-left" }}
          />
          
          <Button
            style={{ marginTop:10 }}
            // loading = {this.state.isLoading}
            raised
            backgroundColor={TINT_COLOR}
            title="Trova Escursioni"
            onPress={()=>this._goToResult(this.state.text)} // Ricerca
          />
        </View>

        <View style={styles.scrolltext}>
            <Text style={{color: TINT_COLOR}} >Scorri per i risultati nelle vicinanze</Text>
            <Feather name="chevron-up" size={24} color={TINT_COLOR} />
        </View>
      </ScrollView>
    );
  }
}

Home.navigationOptions = ({ navigation }) => {
  return {
    title: "Home",
    headerStyle: {}
  };
};

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    marginTop: 150,
    backgroundColor: "#ecf0f1",
    borderWidth:1
  },
  searchBar: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "white"
  },
  scrolltext: {
    marginTop: 100,
    alignItems: "center",
    borderColor: "red",
    borderWidth:1

  }
});
