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
  Alert,
  Image,
  Dimensions
} from "react-native";

import { Content, Card, CardItem, Thumbnail, Left, Body, Right, Container } from 'native-base';

import { Permissions, Location } from "expo";
import { MaterialIcons } from "@expo/vector-icons";
import { StackNavigator } from "react-navigation";
import { FontAwesome , Feather, MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import { TabNavigator } from "react-navigation";
import { SearchBar, Button } from "react-native-elements";
import EventCard from "../components/EventCard";


import * as firebase from "firebase";

const TINT_COLOR = "#39b9c3";
const BACKGROUND_COLOR = "#d7e4e5";



export default class Profile extends React.Component {
    state = {
      logged: true
    }

    componentWillMount() {
     /* var uid = firebase.auth().currentUser;
      if (uid) {
        this.setState({logged: true});
        console.log("logged")
      }
      else {
        this.setState({logged: false});
        console.log("not logged")
      }*/
    }

    renderNotLog() {
      return (
        <View style={{marginTop: -75, marginBottom: 20,alignSelf: 'center'}}>
          <Text style={styles.noResultText}> Non sei loggato </Text>
        </View>
      );
    }

    renderLog() {
      return (
        /*  <View style={{backgroungColor: "red",alignItems: 'center',flex: 0.5, borderWidth:1}}>
            <Image
              resizeMode="cover"
              rounded
              style= {{borderRadius:80, width: 160, height: 160, marginTop:20 ,marginBottom: 20}}
              source = {  this.state.image ? { uri: this.state.image } : require("../assets/image.png")}
            />
            <Text style={{fontSize: 20}}>Nome Utente</Text>
            <Text style={{marginTop: 5, fontSize: 15}}>Example@gmail.com</Text>
          </View>*/

        <Container style={{ backgroundColor : BACKGROUND_COLOR, marginTop: 75}}>
          <Card style={{ marginLeft: 10, marginRight: 10, borderRadius: 10}}>
              <TouchableOpacity style={{marginTop: -75 ,marginBottom: 0, alignSelf: 'center'}}>
                  <Image
                  resizeMode="cover"
                  rounded
                  style= {{borderRadius:80, width: 160, height: 160}}
                  source = {  this.state.image ? { uri: this.state.image } : require("../assets/image.png")}/>
              </TouchableOpacity>

              <CardItem style={{flexDirection: 'column', alignItems: 'center' }} >
              <Text style={{fontSize: 24, textAlign: 'center'}}> Nome Utente </Text>
              </CardItem>
          <ScrollView>
                {/* DATA CALENDARIO */}
                <CardItem  style={{borderColor: BACKGROUND_COLOR, borderWidth: 1, marginLeft: 10, marginRight: 10, marginTop: 10, marginBottom: 5, borderRadius: 10}} >
                  <Left style={{}}>
                      <Text>Informazioni personali</Text>
                  </Left>
                </CardItem>
                
                {/* ORARIO/I */}
                <CardItem  style={{borderColor: BACKGROUND_COLOR, borderWidth: 1, marginLeft: 10, marginRight: 10, marginBottom: 5, borderRadius: 10}} >
                  <Left style={{ }}>
                      <Image style={{width:20, height: 20, marginRight:10}} source={require('../assets/clock.png')}/>
                      <Text >orario</Text>
                  </Left>
                </CardItem>

                {/* TEMPO E DIFFICOLTA'*/}
                <CardItem  style={{borderColor: BACKGROUND_COLOR, borderWidth: 1, marginLeft: 10, marginRight: 10, marginBottom: 5, borderRadius: 10}} >
                  <Left style={{}}>
                      <Image style={{width:20, height: 20, marginRight:10}} source={require('../assets/stopwatch.png')}/>
                      <Text >durata</Text>
                  </Left>

                  <Left style={{}}>
                      <FontAwesome name='level-up' size={20}/>
                      <Text style={{marginLeft: 10}}>difficolta</Text>
                  </Left>
                </CardItem>


                {/* AGENZIA E EMAIL */}
                <CardItem  style={{flexDirection: 'column', flexWrap: 'wrap',borderColor: BACKGROUND_COLOR, borderWidth: 1, marginLeft: 10, marginRight: 10, marginBottom: 10, borderRadius: 10}} >
                  <Body style={{flexDirection: 'row', margin: 5}}>
                  <SimpleLineIcons name='user' size={16}/>
                  <Text style={{marginLeft: 10}}>agenzia</Text>
                  </Body>

                  <Body style={{flexDirection: 'row', margin: 5}}>
                    <MaterialCommunityIcons name='email-outline' size={16}/>
                    <Text style={{marginLeft: 10}}>email</Text>
                </Body>

                <Body style={{flexDirection: 'row', margin: 5}}>
                    <Feather name='phone' size={16}/>
                    <Text style={{marginLeft: 10}}>numero</Text>
                </Body>

                <Body style={{flexDirection: 'row', margin: 5}}>
                      <MaterialCommunityIcons name='facebook' size={16}/>
                      <Text style={{marginLeft: 10}}>facebook</Text>
                </Body>
                </CardItem>
            </ScrollView>
          </Card>
        </Container>
      );
    }

    render() {
      return(
        <View style={{backgroundColor:BACKGROUND_COLOR, paddingBottom: (80*110)/100, flex: 1}}>
            {this.state.logged ? (this.renderLog()) : (this.renderNotLog())}          
        </View>
        
      );
    }
}

Profile.navigationOptions = ({ navigation }) => {

  _onAccountPress = () => {
    var uid = firebase.auth().currentUser;

    if (!uid) {
      Alert.alert(
        'Accedi',
        '',
        [
          {text: 'Log-in', onPress: () => navigation.navigate("Login")},
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        ],
        { cancelable: false }
      )
    }
    else {
      Alert.alert(
        'Ciao ' + firebase.auth().currentUser.uid.displayName + '!',
        '',
        [
          {text: 'Log-out', onPress: () => firebase.auth().signOut()},
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        ],
        { cancelable: false }
      )
    }
  };
  return {
      title: "Profile",
      headerStyle: {
        backgroundColor: BACKGROUND_COLOR,
        borderBottomWidth: 0
      },
      headerRight: (
        <TouchableOpacity onPress={() => _onAccountPress()}>
          <SimpleLineIcons
            style={{ paddingHorizontal: 15 }}
            name="options-vertical"
            size={20}
            //color={TINT_COLOR}
          />
      </TouchableOpacity>
      )
    };
  };

  const styles = StyleSheet.create({
    searchContainer: {
      backgroundColor: BACKGROUND_COLOR,
      flexDirection: "column",
      alignItems: "center",
      marginTop: 20,
      marginBottom: 20,
    },
    searchBar: {
      backgroundColor: "rgb(233,233,238)",
      borderTopColor: "rgb(233,233,238)",
      borderRadius: 30,
      borderBottomWidth:0,
      width: (Dimensions.get("window").width * 90)/ 100
    },
    noResultText: {
      color: TINT_COLOR,
      marginTop: '50%',
      fontSize: 20,
      textAlign: 'center'
    }
});
