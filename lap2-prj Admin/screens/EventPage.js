import React from "react";
import {
  StyleSheet,
  Text,
  ScrollView,

  Image
} from "react-native";
import {Card, CardItem, Left, Container } from 'native-base';

const TINT_COLOR = "#39b9c3";
const BACKGROUND_COLOR = "#d7e4e5";


export default class EventPage extends React.Component {
  componentWillMount(){
    console.log("Event info" + this.props.navigation.state.params.eventInfo)
  }

  render() {
    return (

    <Container style={{ backgroundColor : BACKGROUND_COLOR}}>
        <ScrollView>
          <Card style={{ marginLeft: 10, marginRight: 10, borderRadius: 10}}>
          
              {/* IMMAGINE EVENTO */}
              <CardItem style={{borderRadius: 10, marginTop: 10,paddingTop:10, padding: 10}}>
                <Image  style={{ borderRadius:10, height: 200, width: null, flex: 1}}
                        source = {  this.props.navigation.state.params.eventInfo.immagineEvento ? { uri: this.props.navigation.state.params.eventInfo.immagineEvento } :
                                                                require("../assets/selectImage.png")}/>
              </CardItem>

              {/* Nome Evento */}
              <CardItem  style={{flexDirection: 'column', justifyContent: 'center', marginLeft: 10, marginRight: 5, marginBottom: 5, borderRadius: 10}} >
                <Text style={{fontSize: 12, color: 'gray'}}>Evento</Text>
                <Text style={{fontSize: 20, textAlign: 'center'}}>{this.props.navigation.state.params.eventInfo.nomeEvento}</Text>   
              </CardItem>

              {/* Location */}
              <CardItem  style={{ marginLeft: 10, marginRight: 5, marginBottom: 5, borderRadius: 10}} >
                <Left style={{flexDirection: 'column', justifyContent: 'center', marginLeft: 10, marginRight: 5, marginBottom: 5, borderRadius: 10}}>              
                   <Text style={{fontSize: 12, color: 'gray'}}>Regione</Text>
                   <Text style={{fontSize: 16, textAlign: 'center'}}>{this.props.navigation.state.params.eventInfo.regione}</Text>                  
                </Left>
                <Left style={{flexDirection: 'column', justifyContent: 'center',  marginLeft: 10, marginRight: 5, marginBottom: 5, borderRadius: 10}} >              
                   <Text style={{fontSize: 12, color: 'gray'}}>Provincia</Text>
                   <Text style={{fontSize: 16, textAlign: 'center'}}>{this.props.navigation.state.params.eventInfo.provincia}</Text>   
                </Left>
                <Left style={{flexDirection: 'column', justifyContent: 'center', marginLeft: 10, marginRight: 5, marginBottom: 5, borderRadius: 10}}>
                   <Text style={{fontSize: 12, color: 'gray'}}>Città</Text>
                   <Text style={{fontSize: 16, textAlign: 'center'}}>{this.props.navigation.state.params.eventInfo.citta}</Text>   
                </Left>
              </CardItem>

              {/* GIORNO ORARIO PREZZO EVENTO */}
              <CardItem  style={{ marginLeft: 10, marginRight: 10, marginTop: 5, marginBottom: 5, borderRadius: 10}} >
                {/* Orario */}
                <Left style={{flexDirection: 'row', justifyContent: 'center'}}>
                   <Image style={{width:20, height: 20, marginRight: 0}} source={require('../assets/clock.png')}/>
                    <Text style={{fontSize: 13, textAlign: 'center'}}>{this.props.navigation.state.params.eventInfo.orari}</Text> 
                </Left>
              
                {/* Giorno */}
                <Left style={{marginRight: 5}}>
                    <Image style={{width:20, height: 20, marginRight: 0}} source={require('../assets/calendar.png')}/>
                    <Text style={{fontSize: 13, textAlign: 'center'}}>{this.props.navigation.state.params.eventInfo.data}</Text> 
                </Left>
            
                {/* Prezzo */}
                <Left style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Image style={{width:20, height: 20, marginRight:0}} source={require('../assets/money.png')}/>
                    <Text style={{fontSize: 13, textAlign: 'center'}}>{this.props.navigation.state.params.eventInfo.prezzo}</Text>                     
                </Left>
              </CardItem>

              {/* <CardItem  style={{marginLeft: 10, marginRight: 10, marginBottom: 5, borderRadius: 10}} >
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
                </Left>  */}

              {/* DESCRIZIONE BREVE*/}
              <CardItem  style={{marginLeft: 10, marginRight: 10, marginBottom: 5, borderRadius: 10}} >
                    <Image style={{width:20, height: 20, marginRight:10}} source={require('../assets/description.png')}/>
                    <Text>{this.props.navigation.state.params.eventInfo.descrizioneBreve}</Text>
              </CardItem>

              {/* DESCRIZIONE LUNGA*/}
              <CardItem  style={{marginLeft: 10, marginRight: 10, marginBottom: 5, borderRadius: 10}} >
                    <Image style={{width:20, height: 20, marginRight:10}} source={require('../assets/description.png')}/>
                    <Text>{this.props.navigation.state.params.eventInfo.descrizioneCompleta}</Text>
              </CardItem>

            </Card>
        </ScrollView>
    </Container>
    );
  }   
}

EventPage.navigationOptions = ({ navigation }) => {
  return {
    title: "Evento",
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
