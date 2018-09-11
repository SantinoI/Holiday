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
  ActivityIndicator,
  Image,
  Dimensions
} from "react-native";

import { Content, Card, CardItem, Thumbnail, Left, Body, Right, Container, Button } from 'native-base';

import { Permissions, Location } from "expo";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome , Feather, MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import { TabNavigator } from "react-navigation";
import EventCard from "../components/EventCard";




import * as firebase from "firebase";

const TINT_COLOR = "#39b9c3";
const BACKGROUND_COLOR = "#d7e4e5";


export default class Profile extends React.Component {
    state = {
      profileImage: null,
    }


    componentWillMount() {
      console.log(this.props.navigation.state.params.managerInfo)
    }
 
    render() {
      return(
        <ScrollView style={{ paddingTop: 50,marginBottom: -88, backgroundColor: BACKGROUND_COLOR}}>
          <Card style={{ marginTop: 50,marginLeft: 10, marginRight: 10,marginBottom:60, borderRadius: 10}}>
                <TouchableOpacity style={{marginTop: -75 ,marginBottom: 0, alignSelf: 'center'}}>
                  <Image
                    resizeMode="cover"
                    rounded
                    style= {{borderRadius:80, width: 160, height: 160}}
                    source = {  this.state.profileImage ? { uri: this.state.profileImage } : require("../assets/image.png")}
                    />         
                </TouchableOpacity>

                <CardItem style={{flexDirection: 'column', alignItems: 'center' }} >
                {/* contenuto del testo da sostituire con il downlad delle info dell'agenzia una volta fatto */}
                <Text style={{fontSize: 24, textAlign: 'center'}}> {this.props.navigation.state.params.managerInfo} </Text> 
                </CardItem>

                {/* AGENZIA E EMAIL */}
                <CardItem  style={{flexDirection: 'column', flexWrap: 'wrap',borderColor: BACKGROUND_COLOR, borderWidth: 1, marginLeft: 10, marginRight: 10, marginBottom: 10, borderRadius: 10}} >

                  <Text>Informazioni personali</Text>
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
                  
             </Card>
          </ScrollView>
      );
    }
}

Profile.navigationOptions = ({ navigation }) => {

  _onAccountPress = () => {
    var uid = firebase.auth().currentUser;
    if (uid) {
     firebase.auth().signOut()
    }
  };

  return {
      title: "Profile",
      headerStyle: {
        backgroundColor: BACKGROUND_COLOR,
        borderBottomWidth: 0
      },
      
      /*headerRight: (
        <TouchableOpacity onPress={() => _onAccountPress()}>
            <MaterialCommunityIcons style={{marginRight: 30}} name='exit-to-app' size={30} color={TINT_COLOR}/>
        </TouchableOpacity>
      )*/
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
    loginButton: {
      marginLeft: '10%',
      marginRight: '10%',
      width: 160,
      padding: 10,
      backgroundColor: TINT_COLOR,
      borderRadius: 30,
    },
    logoutButton: {
      marginLeft: '10%',
      marginRight: '10%',
      width: 160,
      //height: 30,
      padding: 10,
      backgroundColor: "white",
      borderRadius: 5,
      borderWidth: 1,
      borderColor:"grey"
    },
    noResultText: {
      color: TINT_COLOR,
      marginTop: '50%',
      fontSize: 20,
      textAlign: 'center'
    }
});
