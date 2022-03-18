import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import Colors from '../../res/colors';


const check = ( estado ) =>{
  if(estado == 'Cerrado'){
    return require("../../assets/check.png");
  }else{
    return require("../../assets/noCheck.png");
  }

}

const CasosItem = ({ item, onPress }) =>{

  getImgDot = () => {
    if(item.gravedad == 'verde'){
      return require("../../assets/greenDot.png");
    }if(item.gravedad == 'naranja'){
      return require("../../assets/orangeDot.png");
    }if(item.gravedad == 'rojo'){
      return require("../../assets/redDot.png");
    }
  }




  return(


    <Pressable onPress={onPress} style={styles.container}>



        <View style={styles.row}>
          <Text style={styles.nameText}>{item.ciudad.nombre}</Text>
          <Text style={styles.nameText}>B{item.bloque.nombre}</Text>
          <Text style={styles.moneyText}> C{item.calle}</Text>
          <Text style={styles.moneyText}> L{item.linea}</Text>
          <Text style={styles.moneyText}> N{item.nivel}</Text>
          <Text style={styles.moneyText}> F{item.fondo}</Text>
        </View>
        <View style={styles.row}>

          <Text style={styles.numberText}>{item.deterioro.codigo}</Text>
          <Image
            source={getImgDot()}
          />


          <Image
          style={{
              marginLeft:  6
            }}
            source={check(item.estado)}
          />

          
        </View>

    </Pressable>
  )
}

const styles=StyleSheet.create ({
  container:{
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 16,
      backgroundColor: 'white',
      borderRadius: 4,
      borderBottomColor: Colors.gris,
      borderBottomWidth: 1

  },
  row:{
    flexDirection:"row",


  },
  nameText:{
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 12
  },

  auxText:{

    fontSize: 14,
    marginRight: 16
  },
  numberText:{
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 10
  },
  moneyText:{

    fontSize: 14,
  }


});

export default CasosItem;
