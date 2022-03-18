import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ScrollView, Dimensions, TextInput, Pressable, Alert} from 'react-native';
import Colors from '../../res/colors';
import axios from 'axios';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import Http from '../../libs/http';

const {width, height}=Dimensions.get('window')
const fetchImage = async () => {


}

class CasoDetailScreen extends Component {

  state ={
    caso:{},
    casoaux:{},
    lista:[
      {
        foto:''
      },{
        foto:''
      },{
        foto:''
      },
    ],
    comentarios:'',
    fotoCierre:'',
  }


  componentDidMount= async () => {

     const { caso } = this.props.route.params;

     this.props.navigation.setOptions({ title: this.props.route.params.ciudad.nombre});
     const res =  await Http.instance.get("https://saferracks.espira.cloud/caso/detalle/"+this.props.route.params.id);

       console.log("resnew", res);

       console.log("state lista", this.state.lista);
       const aux = [
         {
           foto:res.imagen1
         },{
           foto:res.imagen2
         },{
           foto:res.imagen3
         },
       ];
       this.setState({lista:aux})
       console.log("aux", aux);

  }



  renderItem = ({item}) => (

    <TouchableOpacity>
      <View>
        <Image style={styles.img} source = {{uri:item.foto}}/>

      </View>
    </TouchableOpacity>


  )

  handleText=(text) =>{
    this.setState({comentarios:text});
  }



  render (){

    const takePhotoFromCamera = async () => {

        ImagePicker.openCamera({
          width: 300,
          height: 400,
          cropping: false,
          includeBase64:true,
          compressImageQuality:0.3,

        }).then(image => {


          const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
          let filename = imageUri.split('/').pop();
          let image64 = image ? `data:image/jpg;base64,${image.data}` : null;
          let match = /\.(\w+)$/.exec(filename);
          //console.log('image_data_file',image)

          this.state.fotoCierre=image64;
        });


    }



    const fromLibrary = () => {

        ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: false,
          includeBase64:true,
          selectionLimit: 0,
          compressImageQuality:0.3,

        }).then(image => {

          const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
          let filename = imageUri.split('/').pop();
          let image64 = image ? 'data:image/jpg;base64,' + image.data : null;
          let match = /\.(\w+)$/.exec(filename);

          this.state.fotoCierre=image64;

         });


    }



    const onPressCerrarCaso = async () => {
      let formData = new FormData();
      formData.append('id', this.props.route.params.id);
      formData.append('comentarios', this.state.comentarios);
      formData.append('fotoCierre', this.state.fotoCierre);

      try{

        await axios.post('https://saferracks.espira.cloud/api/caso/estado', formData);
        Alert.alert(
          "Caso cerrado",
          "El caso se ha cerrado",
          [

            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
            );
        this.props.navigation.navigate('Home')



      }catch(e){
        console.log(e);
      }

    }

    return (
      <ScrollView style={styles.full}>
        <View style={styles.container}>

          <View style={styles.containerImg}>
            <FlatList
              data={this.state.lista}
              renderItem={this.renderItem}
              horizontal

            />


          </View>
          <View >
            <Text style={styles.text} >Riesgo: {this.props.route.params.riesgo.nombre}</Text>
            <Text style={styles.cc} >Deterioro: {this.props.route.params.deterioro.codigo} - {this.props.route.params.deterioro.nombre} - {this.props.route.params.gravedad}</Text>
            <Text style={styles.cc} >Bloque:{this.props.route.params.bloque.nombre} Calle:{this.props.route.params.calle} Linea:{this.props.route.params.linea} Nivel:{this.props.route.params.nivel} Fondo:{this.props.route.params.fondo}</Text>
            <Text style={styles.cc} >Estado:{this.props.route.params.estado} </Text>
            <Text style={styles.cc} >Comentarios:{this.props.route.params.comentarios} {"\n"} </Text>
          </View>

          {
            (this.props.userRol== 1 ||this.props.userRol== 2 )? (
              <View >
                <Text style={styles.text} >Sección para el experto {"\n"}</Text>

                <TextInput
                 multiline={true}
                 style={styles.input}
                 placeholder="Comentarios"
                 onChangeText={(text)=> this.handleText(text)}
                / >

                <Pressable style={styles.btn} onPress={takePhotoFromCamera}>
                <Text style={styles.h2} >Tomar foto</Text>
                </Pressable>

                <Pressable style={styles.btn} onPress={fromLibrary}>
                <Text style={styles.h2} >Subir foto</Text>
                </Pressable>

                <Pressable style={styles.btn} onPress={onPressCerrarCaso}>
                <Text style={styles.h2} >Cerrar caso</Text>
                </Pressable>
              </View>

            ):null
          }




        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    padding: 16,
    backgroundColor: "white",
    borderRadius: 12,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
    marginTop: 16,


  },
  containerImg:{
    padding: 8,
    marginTop: 20,


  },
  btn:{
    padding:8,
    backgroundColor: Colors.rojo,
    borderRadius: 8,
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
  },
  h1:{
    textAlign: "left",
    fontSize: 30,
    fontWeight: "bold",
    margin: 16,
    marginTop: 30,
    color:Colors.azul,
  },
  h2:{
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.white,
  },
  text:{

    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "left",
    marginBottom: 3,
    color:Colors.azul,
    marginLeft:15
  },
  cc:{
    textAlign: "left",
    fontSize: 20,

    marginTop: 3,
    marginLeft:15,

  },

  empresa:{
    textAlign: "left",
    fontSize: 16,
    textAlign: 'justify',
    marginTop: 10,
    marginBottom: 15,
    marginLeft:15,
    marginRight: 15
  },

  img:{

    alignItems: "center",
    padding: 30,
    height: 210,
    width: 140,
    borderRadius: 8,
    marginRight:  13,

    //height: 100,
    //width: 200
  },
  input:{

    height: 130,
    borderColor: '#ccc',
    borderWidth: 2,
    marginBottom: 20,
    marginLeft: 10,
    marginRight:10,
    borderRadius: 8,
    fontSize: 18,
  },
  full:{
    width: width,
    height: height

  },

});

const mapStateToProps = (state) => {
  return{
    userId: state.userReducer.id,
    userRol: state.userReducer.rol,
    }
  }
export default connect(mapStateToProps)(CasoDetailScreen);
