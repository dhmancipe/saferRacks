import React, {Component} from 'react';
import {View, Text, Pressable, StyleSheet, FlatList, ScrollView, Linking, Dimensions} from 'react-native';
import Http from '../../libs/http';
import Colors from '../../res/colors';
import ContentBox from './ContentBox';
import {connect} from 'react-redux';

import axios from 'axios';


const {width, height}=Dimensions.get('window')
class HomeScreen extends Component{





  handlePressMisCasos = () =>{
    //console.log("about case", this.props);
    this.props.navigation.navigate('Mis Casos')
  }

  handlePressCrearCaso = () =>{
    //console.log("about case", this.props);
    this.props.navigation.navigate('Crear Caso')
  }

  handlePressPerfil = () =>{
    //console.log("about case", this.props);
    this.props.navigation.navigate('Perfil')
  }

  handlePressReportes = () =>{
    //console.log("about case", this.props);
    this.props.navigation.navigate('Reportes')
  }






  render(){
    {console.log('props en home',this.props)}


    return (
      <View style={styles.container}>

        <Text style={styles.h1} >Bienvenido a Safer Racks  </Text>

        <ScrollView>

          <Text style={styles.text} >Gestiona fácil los casos de riesgo y consulta tu histórico ¿Qué quieres hacer?  </Text>

          { this.props.userRol!= 4?(
            <View>
                <ContentBox
                  img = {"1"}
                  header = {"Registrar caso"}
                  body = {"Ingresa los datos del deterioro."}
                  onPress={this.handlePressCrearCaso}
                />
            </View> ):null
          }

          <View>
              <ContentBox
                img = {"2"}
                header = {"Mis casos"}
                body = {"Lleva el seguimiento de tus registros."}
                onPress={this.handlePressMisCasos}
              />
          </View>

          <View>
              <ContentBox
                img = {"3"}
                header = {"Mi perfil"}
                body = {"Revisa los datos asociados a tu cuenta."}
                onPress={this.handlePressPerfil}
              />
          </View>

          <View>
              <ContentBox
                img = {"4"}
                header = {"Mis reportes"}
                body = {"Descarga reportes. "}
                onPress={this.handlePressReportes}
              />
          </View>




          {
            (this.props.userRol== 1 || this.props.userRol== 2)? (
              <View>

                <View>
                    <ContentBox
                      img = {"6"}
                      header = {"Administrador"}
                      body = {"Ingresa a la vista de administrador."}
                      onPress={() => Linking.openURL('https://saferracks.espira.cloud')}
                    />
                </View>
            </View>

            ):null
          }

          <View>
              <ContentBox
                img = {"5"}
                header = {"Calendario de mantenimiento"}
                body = {"Enterate de la programación de mantenimiento"}
                onPress={() => Linking.openURL('https://calendario.saferracks.espira.cloud/')}
              />
          </View>




          <Text style={{color: 'blue', textAlign: 'center'}}
          onPress={() => Linking.openURL('https://espira.co/inicio')}>
          Espira Corp
          </Text>




        </ScrollView>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: Colors.gris,
    padding: 5,
    width:width,
    height:height
  },
  btn:{
    padding:8,
    backgroundColor: "white",
    borderRadius: 8,
    margin: 16,
  },
  h1:{
    textAlign: "left",
    fontSize: 30,
    fontWeight: "bold",
    margin: 16,
    marginTop: 30
  },
  h2:{
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold"
  },
  text:{
    textAlign: "left",
    fontSize: 18,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 12


  }

});

const mapStateToProps = (state) => {
  return{
    userId: state.userReducer.id,
    userRol: state.userReducer.rol,
    }
  }

export default connect(mapStateToProps)(HomeScreen);
