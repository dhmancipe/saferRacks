import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, ScrollView,Dimensions} from 'react-native';
import Colors from '../../res/colors';
import {connect} from 'react-redux';


const {width, height}=Dimensions.get('window')

class PerfilScreen extends Component {


  render (){
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.h1} > AM Welding S.A.S  </Text>
          <View style={styles.img}>
            <Image style={{
              resizeMode: "cover",
              height: 140,
              width: 140,
              borderRadius: 70
            }}  source = {require("../../assets/worker.png")}/>
            <Text style={styles.h2} > {this.props.userName} </Text>
            <Text style={styles.text} >{this.props.userCargo} </Text>
            
            <Text style={styles.empresa} >313 8525097 - (1)710 0988 </Text>
            <Text style={styles.empresa} >Carrera 69 # 38d-27 </Text>
            <Text style={styles.empresa} >info@amwelding.com.co </Text>
            <Text style={styles.empresa} >www.amwelding.com.co </Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    padding: 16,
    backgroundColor: "white",
    borderRadius: 12,
    marginLeft: 16,
    marginRight:  16,
    marginRight: 16,
    marginBottom: 16,
    marginTop: 16,



  },
  btn:{
    padding:8,
    backgroundColor: "white",
    borderRadius: 8,
    margin: 16,
  },
  h1:{
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    margin: 16,
    marginTop: 30,
    color:Colors.azul,
  },
  h2:{
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 30,
  },
  text:{

    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
    marginBottom: 3,
    color:Colors.azul,
  },
  cc:{
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 3,

    marginBottom: 20,
  },

  empresa:{
    textAlign: "left",
    fontSize: 16,

    marginTop: 1,
    marginBottom: 1,
  },

  img:{

    alignItems: "center",
    padding: 30,

    //height: 100,
    //width: 200
  },

});

const mapStateToProps = (state) => {
  return{
    userId: state.userReducer.id,
    userRol: state.userReducer.rol,
    userName: state.userReducer.name,
    userCargo: state.userReducer.cargo,
    }
  }

export default connect(mapStateToProps)(PerfilScreen);
