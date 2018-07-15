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
    image: null
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
              <CardItem style={{borderRadius: 10, marginTop: 10,paddingTop:10, padding: 10}}>
                <Image  style={{ borderRadius:10, height: 200, width: null, flex: 1}}
                        source = {  this.state.image ? { uri: this.state.image } :
                                                                require("../assets/selectImage.png")}/>
              </CardItem>

              {/* Nome Evento */}
              <CardItem  style={{borderColor: BACKGROUND_COLOR, borderWidth: 1, marginLeft: 10, marginRight: 5, marginBottom: 5, borderRadius: 10}} >
                <Left style={{}}>
                    {/* <Image style={{width:23, height: 23, marginRight:10}} source={require('../assets/description.png')}/> */}
                    <Item floatingLabel style={{ marginTop: 0 }}>
                       <Label style={{fontSize: 14, textAlign: 'center'}}>Inserisci Nome Evento</Label>
                       <Input
                       style={{fontSize:14, textAlign: 'center'}}
                       onChangeText={text => this.setState({ price: text })}
                      />
                    </Item>     
                </Left>
              </CardItem>

              {/* Nome Evento */}
              <CardItem  style={{borderColor: BACKGROUND_COLOR, borderWidth: 1, marginLeft: 10, marginRight: 5, marginBottom: 5, borderRadius: 10}} >
                <Left style={{}}>
                    {/* <Image style={{width:23, height: 23, marginRight:10}} source={require('../assets/description.png')}/> */}
                    <Item floatingLabel style={{ marginTop: 0 }}>
                       <Label style={{fontSize: 13, textAlign: 'center'}}>Regione</Label>
                       <Input
                       style={{fontSize:14, textAlign: 'center'}}
                       onChangeText={text => this.setState({ price: text })}
                      />
                    </Item>     
                </Left>
                <Left style={{}}>
                    {/* <Image style={{width:23, height: 23, marginRight:10}} source={require('../assets/description.png')}/> */}
                    <Item floatingLabel style={{ marginTop: 0 }}>
                       <Label style={{fontSize: 13, textAlign: 'center'}}>Provincia</Label>
                       <Input
                       style={{fontSize:14, textAlign: 'center'}}
                       onChangeText={text => this.setState({ price: text })}
                      />
                    </Item>     
                </Left>
                <Left style={{}}>
                    {/* <Image style={{width:23, height: 23, marginRight:10}} source={require('../assets/description.png')}/> */}
                    <Item floatingLabel style={{ marginTop: 0 }}>
                       <Label style={{fontSize: 13, textAlign: 'center'}}>Città</Label>
                       <Input
                       style={{fontSize:14, textAlign: 'center'}}
                       onChangeText={text => this.setState({ price: text })}
                      />
                    </Item>     
                </Left>
              </CardItem>

              {/* LOCALITA' E ID_EVENTO*/}
              {/* <CardItem >
                <Left style={{flex:0.8, flexDirection: 'column', alignItems: 'flex-start' }}>
                <Text style={{fontSize:10, fontStyle: 'italic'}}>{}, {}</Text>
                
                </Left>
                <Right>
                <Text style={{fontSize:10, fontStyle: 'italic'}}>Codice di riferimento: {}</Text>
                </Right>
              </CardItem>

              <CardItem style={{flexDirection: 'column', alignItems: 'center' }} >
              <Text style={{fontSize: 24, textAlign: 'center'}}>{}</Text>
              </CardItem> */}

              {/* GIORNO E ORARIO EVENTO */}
              <CardItem  style={{borderColor: BACKGROUND_COLOR, borderWidth: 1, marginLeft: 10, marginRight: 10, marginTop: 5, marginBottom: 5, borderRadius: 10}} >
                {/* Giorno */}
                <Left style={{marginRight:0}}>
                    <Image style={{width:20, height: 20, marginRight:-15}} source={require('../assets/calendar.png')}/>
                    <DatePicker
                    style={{width: 100*110/100}}
                    date={this.state.date}
                    mode="date"
                    locale={'it'}
                    placeholder="Data"
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
                        marginRight: 0,
                      },
                      dateText: {
                        textAlign: 'center',
                        fontSize: 13
                      }
              
                    }}
                    onDateChange={(date) => {this.setState({date: date})}}
                  />
                </Left>
                {/* Orario */}
                <Left>
                   <Image style={{width:20, height: 20, marginRight:-15}} source={require('../assets/clock.png')}/>
                   <DatePicker
                    style={{width: 100*110/100}}
                    date={this.state.time}
                    mode="time"
                    locale={'it'}
                    placeholder="Orario"
                    confirmBtnText="Conferma"
                    cancelBtnText="Cancella"
                    customStyles={{
                      dateIcon: {
                        display: 'none',
                      },
                      dateInput: {
                        borderWidth: 0,
                        marginRight: 0
                      },
                      dateText: {
                        textAlign: 'center',
                        fontSize: 13
                      }
              
                    }}
                    onDateChange={(time) => {this.setState({time: time})}}
                  />
                </Left>

                <Left style={{}}>
                <Image style={{width:20, height: 20, marginRight:10}} source={require('../assets/money.png')}/>
                     <Item floatingLabel style={{ marginTop: 0,width:70 }}>
                       <Label style={{fontSize: 14, width:70}}>Prezzo</Label>
                       <Input
                       style={{fontSize:14}}
                       onChangeText={text => this.setState({ price: text })}
                      />
                    </Item>                      
                </Left>
              </CardItem>

              {/* TEMPO E PREZZO'*/}
              <CardItem  style={{borderColor: BACKGROUND_COLOR, borderWidth: 1, marginLeft: 10, marginRight: 10, marginBottom: 5, borderRadius: 10}} >
                {/* 
                COUNTER PER PACCHETTI DI PIU' GIORNI, TO DO NEXT
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
                </Left> */}
                {/* DESCRIZIONE BREVE*/}
                <Left style={{}}>
                <Image style={{width:20, height: 20, marginRight:10}} source={require('../assets/description.png')}/>
                     <Item floatingLabel style={{ width: 270}}>
                       <Label style={{fontSize: 13, }}>Descrizione Breve</Label>
                       <Input
                        multiline
      
                       style={{ width: 50,fontSize:14, marginBottom: 20}}
                       onChangeText={text => this.setState({ price: text })}
                      />
                    </Item>                      
                </Left>
              </CardItem>

              
                
              <CardItem  style={{borderColor: BACKGROUND_COLOR, borderWidth: 1, marginLeft: 10, marginRight: 10, marginBottom: 5, borderRadius: 10}} >

               {/* DESCRIZIONE Lunga*/}
               <Left style={{}}>
                <Image style={{width:20, height: 20, marginRight:10}} source={require('../assets/description.png')}/>
                     <Item floatingLabel style={{ width: 270}}>
                       <Label style={{fontSize: 13, }}>Descrizione Dettagliata</Label>
                       <Input
                        multiline={true}
      
                       style={{ height: 100, width: 50,fontSize:14, marginBottom: 20}}
                       onChangeText={text => this.setState({ price: text })}
                      />
                    </Item>                      
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
