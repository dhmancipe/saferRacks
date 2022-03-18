import React, {Component} from 'react';
import {View, Text, Modal, StyleSheet, Pressable} from 'react-native';
import Colors from '../../res/colors';
import ImagePicker from 'react-native-image-crop-picker';


class ModalImgScreen extends Component {

constructor()
{
  super();
  this.state={
    show:true
  }
}

  render (){

    const takePhotoFromCamera = () => {

        ImagePicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
        }).then(image => {
          console.log(image);
        });
    }

    const fromLibrary = () => {

      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
      }).then(image => {
        console.log(image);
      });
    }

    return (
      <View>
        <Modal
        transparet={false}
        visible={this.state.show}
        >
          <View style={stylesM.container}>
            <View style={stylesM.fondo}>

              <Text style={stylesM.h1}>Agregar imagen</Text>

              <Pressable style={stylesM.btn} onPress={takePhotoFromCamera}>
              <Text style={stylesM.h2} >Tomar foto</Text>
              </Pressable>

              <Pressable style={stylesM.btn}  onPress={fromLibrary}>
              <Text style={stylesM.h2} >Ir a galeria</Text>
              </Pressable>

              <Pressable style={stylesM.btn} onPress={()=>{this.setState({show:false})}}>
              <Text style={stylesM.h2} >Cancelar</Text>
              </Pressable>

            </View>

          </View>
        </Modal>
      </View>
    )
  }
}

const stylesM=StyleSheet.create ({
  container:{


      padding: 16,
      backgroundColor: "rgba(34,34,34,0.5)",
      flex:1,
      borderBottomColor: Colors.gris,
      borderBottomWidth: 1

  },
  fondo:{
      margin: 16,
      backgroundColor: "#ffffff",
      padding: 15,
      borderRadius: 10,
      flex:1,


  },
  h1:{
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    margin: 16,
    marginTop: 60,
    marginBottom: 150,
    color: Colors.azul,
  },
  btn:{
    padding:8,
    backgroundColor: Colors.rosa,
    borderRadius: 8,
    margin: 16,
  },
  h2:{
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.white,
  },

});



export default ModalImgScreen;
