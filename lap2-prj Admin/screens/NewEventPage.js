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
import { Button, Input, Label, Item, Content, Card, CardItem, Thumbnail, Left, Body, Right, Container } from 'native-base';


import DatePicker from 'react-native-datepicker'
import { Permissions, Location } from "expo";
import { MaterialIcons } from "@expo/vector-icons";
import { StackNavigator } from "react-navigation";
import { FontAwesome , Feather, MaterialCommunityIcons, SimpleLineIcons} from "@expo/vector-icons";
import { TabNavigator } from "react-navigation";
import { SearchBar } from "react-native-elements";
import Icon from 'react-native-vector-icons/Feather';
import EventCard from "../components/EventCard";

import * as firebase from "firebase";

const TINT_COLOR = "#39b9c3";
const BACKGROUND_COLOR = "#d7e4e5";


export default class NewEventPage extends React.Component {
  state = {
    date:'',
    time:'',
    days:0,
    price:0,
    days: 0,
  }


  componentWillMount(){
    console.log()
  }

  _getCurrentDate=()=>{
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    return  year+ '-' + month + '-' + date;
   }

   _getCurrentDay=()=>{
     var day = new Date().getDate();
     return day;}
   _getCurrentMonth=()=>{
     var month = new Date().getMonth() + 1;
     return month;}
   _getCurrentYear=()=>{
     var year = new Date().getFullYear();
     return year;}

 


  render() {
    return (
      <Container style={{ backgroundColor : BACKGROUND_COLOR}}>
        <ScrollView>
          <Card style={{ marginLeft: 10, marginRight: 10, borderRadius: 10}}>
          
              {/* IMMAGINE EVENTO */}
              <CardItem cardBody style={{borderRadius: 10}}>
                {/* <Image  style={{ borderRadius:10, height: 200, width: null, flex: 1}}
                        source={{uri: this.props.navigation.state.params.eventInfo.immagineEvento}}
                /> */}
              </CardItem>

              {/* LOCALITA' E ID_EVENTO*/}
              <CardItem >
                <Left style={{flex:0.8, flexDirection: 'column', alignItems: 'flex-start' }}>
                <Text style={{fontSize:10, fontStyle: 'italic'}}>{}, {}</Text>
                
                </Left>
                <Right>
                <Text style={{fontSize:10, fontStyle: 'italic'}}>Codice di riferimento: {}</Text>
                </Right>
              </CardItem>

              <CardItem style={{flexDirection: 'column', alignItems: 'center' }} >
              <Text style={{fontSize: 24, textAlign: 'center'}}>{}</Text>
              </CardItem>

              {/* GIORNO E ORARIO EVENTO */}
              <CardItem  style={{borderColor: BACKGROUND_COLOR, borderWidth: 1, marginLeft: 10, marginRight: 10, marginTop: 10, marginBottom: 5, borderRadius: 10}} >
                {/* Giorno */}
                <Left style={{marginRight:0}}>
                    <Image style={{width:20, height: 20, marginRight:0}} source={require('../assets/calendar.png')}/>
                    <DatePicker
                    style={{width: 100*110/100}}
                    date={this.state.date}
                    mode="date"
                    locale={'it'}
                    placeholder="Seleziona una data"
                    format="YYYY-MM-DD"
                    minDate={this._getCurrentDate()}
                    maxDate={this._getCurrentYear()+1+'-'+this._getCurrentMonth()+'-'+this._getCurrentDay()}
                    confirmBtnText="Conferma"
                    cancelBtnText="Cancella"
                    customStyles={{
                      dateIcon: {
                        display: 'none',
                      },
                      dateInput: {
                        borderWidth: 0,
                        marginRight: 0
                      }
              
                    }}
                    onDateChange={(date) => {this.setState({date: date})}}
                  />
                </Left>
                {/* Orario */}
                <Left>
                   <Image style={{width:20, height: 20, marginRight:0}} source={require('../assets/clock.png')}/>
                   <DatePicker
                    style={{width: 100*110/100}}
                    date={this.state.time}
                    mode="time"
                    locale={'it'}
                    placeholder="Seleziona un orario"
                    confirmBtnText="Conferma"
                    cancelBtnText="Cancella"
                    customStyles={{
                      dateIcon: {
                        display: 'none',
                      },
                      dateInput: {
                        borderWidth: 0,
                        marginRight: 0
                      }
              
                    }}
                    onDateChange={(time) => {this.setState({time: time})}}
                  />
                </Left>

                {console.log(this.state.time)}

                
                 
    
              </CardItem>

              {/* TEMPO E PREZZO'*/}
              <CardItem  style={{borderColor: BACKGROUND_COLOR, borderWidth: 1, marginLeft: 10, marginRight: 10, marginBottom: 5, borderRadius: 10}} >
                <Left style={{flexDirection: 'row'}}>
                    <Image style={{width:20, height: 20, marginRight:0}} source={require('../assets/stopwatch.png')}/>
                      <Button transparent
                              onPress={() => this.setState({ days: this.state.days>0 ? this.state.days - 1 : 0 })}
                              style={{marginLeft:10,width:50, height:50}}
                      ><Icon style={{}} size={25} color={TINT_COLOR} name='minus-circle'/></Button>
                      <Text style={{marginLeft: -13,marginRight:10}}>{this.state.days}</Text>
                      <Button transparent
                              onPress={() => this.setState({ days: this.state.days + 1 })}
                              style={{width:50, height:50}}
                      ><Icon style={{}} size={25} color={TINT_COLOR} name='plus-circle'/></Button>
                </Left>

                <Left style={{}}>
                <Image style={{width:20, height: 20, marginRight:10}} source={require('../assets/money.png')}/>
                     <Item floatingLabel style={{ marginTop: 0,width:100 }}>
                       <Label style={{fontSize: 14, width:100}}>Prezzo</Label>
                       <Input
                       style={{fontSize:14}}
                       onChangeText={text => this.setState({ price: text })}
                      />
                    </Item>                      
                </Left>
              </CardItem>

              

              {/* DESCRIZIONE */}
              <CardItem  style={{borderColor: BACKGROUND_COLOR, borderWidth: 1, marginLeft: 10, marginRight: 10, marginBottom: 5, borderRadius: 10}} >
                <Left style={{}}>
                    <Image style={{width:23, height: 23, marginRight:10}} source={require('../assets/description.png')}/>
                    <Text style={{paddingRight: 20}}>{}</Text>
                </Left>
              </CardItem>

              
            </Card>
        </ScrollView>
    </Container>
    );
  }   
}

NewEventPage.navigationOptions = ({ navigation }) => {
  return {
    title: "Nuovo evento",
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
    marginLeft: '10%',
    marginRight: '10%',
    padding: 10,
    backgroundColor: TINT_COLOR,
    borderRadius: 30,
  },
});
