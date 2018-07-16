import React, { Component } from 'react';
import {
    StyleSheet,
    Platform,
    Text,
    ScrollView,
    View,
    TouchableOpacity,
    Image
  } from "react-native";


  const TINT_COLOR = "#39b9c3";
  const BACKGROUND_COLOR = "#d7e4e5";

export default class BookingButton extends Component {
    state = {
        bookState:""
    }

    componentWillMount(){
        this.setState({bookState: this.props.bookState})
    }

    render(){
        if(this.state.bookState == "ATTESA"){
            return(
                <View>
                    <View style={{borderWidth: 1, borderRadius: 30, borderColor: TINT_COLOR,marginLeft: '10%',marginRight: '10%', padding: 10,}}>
                        <Text style={{textAlign:'center', color: TINT_COLOR }}> Prenotazione Inviata </Text>
                    </View>

                    <TouchableOpacity
                        style={{marginTop:5, borderWidth: 1, borderRadius: 30, borderColor: "red", marginLeft: '10%',marginRight: '10%', padding: 10}}
                        activeOpacity={0.5}
                        onPress={() => this.props.onRemoveBooking()}
                        title="Prenota">          
                        <Text style={{textAlign:'center', color: "red" }}> Rimuovi richiesta Prenotazione </Text>
                    </TouchableOpacity>          
                </View>
            )
        }else if (this.state.bookState == "ACCETTATA"){
            return (
                <View>
                    <View style={{borderWidth: 1, borderRadius: 30, borderColor: "green",marginLeft: '10%',marginRight: '10%', padding: 10,}}>
                        <Text style={{textAlign:'center', color: "green" }}> Prenotazione ACCETTATA </Text>
                    </View>
                    <TouchableOpacity
                        style={{marginTop:5, borderWidth: 1, borderRadius: 30, borderColor: "red", marginLeft: '10%',marginRight: '10%', padding: 10}}
                        activeOpacity={0.5}
                        onPress={() => this.props.onRemoveBooking()}
                        title="Prenota">          
                        <Text style={{textAlign:'center', color: "red" }}> Rimuovi richiesta Prenotazione </Text>
                    </TouchableOpacity>          
                </View>
            );
        }else if (this.state.bookState == "RIFIUTATA"){
            return (
                <View style={{borderWidth: 1, borderRadius: 30, borderColor: "red",marginLeft: '10%',marginRight: '10%', padding: 10,}}>
                    <Text style={{textAlign:'center', color: "red" }}> Prenotazione RIFUTATA </Text>
                </View>
            );
        }
    }
}
