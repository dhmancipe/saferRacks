import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import Colors from '../../res/colors';


const ContentBox = ( props ) =>{

  getImgIcon = () => {
    if(props.img == 1){
      return require("../../assets/registrar.jpg");
    }if(props.img == 2){
      return require("../../assets/misCasos.jpg");
    }if(props.img == 3){
      return require("../../assets/perfil.jpg");
    }if(props.img == 4){
      return require("../../assets/reportes.jpg");
    }if(props.img == 5){
      return require("../../assets/calendar.jpg");
    }if(props.img == 6){
      return require("../../assets/admin.jpg");
    }


  }








  return(

    <Pressable  style={styles.container} onPress={props.onPress}  >

      <View style={styles.img}>
        <Image
        style={styles.image}
        source={getImgIcon()}
        />

      </View>
      <View style={styles.row}>
        <Text style={styles.h2}>{props.header}</Text>

      </View>
      <View style={styles.text}>
        <Text style={styles.text}>{props.body}</Text>

      </View>

    </Pressable>
  )
}

const styles=StyleSheet.create ({
  container:{
    //  flexDirection: "row",
    //  justifyContent: "space-between",
      padding: 16,
      backgroundColor: "white",
      borderRadius: 12,
      marginLeft: 16,
      marginRight: 16,
      marginBottom: 8,
      marginTop: 8
      //borderBottomColor: Colors.gris,
    //  borderBottomWidth: 1

  },
  row:{
    flexDirection:"row",
  },
  h2:{
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: "left",
    flex: 1,
    marginLeft: 16,
    marginRight:  16,
  },

  img:{

    alignItems: "center",
    padding: 30,

    //height: 100,
    //width: 200
  },
  image: {
    width: 250,
    height: 250,
  },
  text:{

    fontSize: 18,
    marginTop: 4,
    textAlign: "left",
    marginLeft: 8,
    marginRight: 8,
    marginBottom:  8,
  },
  moneyText:{
    fontWeight: 'bold',
    fontSize: 14,
  }


});

export default ContentBox;
