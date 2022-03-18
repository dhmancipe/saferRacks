  import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, Modal, ScrollView, Pressable, Image, TextInput, Platform, FlatList, TouchableOpacity, Dimensions, Alert} from 'react-native';
import Colors from '../../res/colors';
import ContentBox from './ContentBox';
import Login from './Login';
import ImagePicker from 'react-native-image-crop-picker';
import Select from '../select/Select';
import SelectCaso from '../select/SelectCaso';
 import RNPickerSelect from "react-native-picker-select";
 import axios from 'axios';
 import {connect} from 'react-redux';

const {width, height}=Dimensions.get('window')
 function UploadImg(selected){
   if (selected){

     return(
       <ScrollView
        horizontal
        style={styles.scroll}
       >
         <Image style={stylesM.img}  source={{
         uri: 'https://saferracks.espira.cloud/public/img/gallery.png',
         }}/>


       </ScrollView>
     )

  }else{
    return(
      <ScrollView
       horizontal
       style={styles.scroll}
      >
        <Image style={stylesM.img}  source={{
        uri: 'https://saferracks.espira.cloud/public/img/gallery.png',
        }}/>


      </ScrollView>
    )
  }


 }

class CrearCasoScreen extends Component {

  constructor()
  {

    super();
    this.state={

      planta:'',
      bloque:'',
      calle:'',
      linea:'',
      nivel:'',
      fondo:'',
      deterioro:'',
      riesgo:'',
      gravedad:'',
      comentarios:'',
      archivo:'',
      localDir:'',
      tipo:'',
      showImg:false,
      showPlc:false,
      showTipo:false,
      showComent:false,
      imgSltd:'https://saferracks.espira.cloud/public/img/gallery.png',
      imgsEnviar:[ ],
      imagen1:'',
      imagen2:'',
      imagen3:'',
      imagen4:'',
      i:0,
    }
  }





  handlePressImg = () =>{
    //console.log("about case", this.props);
    this.props.navigation.navigate('Agregar imagen')
  }

  handleText=(text) =>{
    this.setState({comentarios:text});
  }

  callbackUbicacion = (planta, bloque, calle, linea, nivel, fondo) => {
      this.setState({planta:planta,bloque:bloque,calle:calle,linea:linea, nivel:nivel, fondo:fondo, showImg:true, showPlc:false})
 }




 callbackDaño = (riesgo, deterioro, gravedad) => {
     this.setState({riesgo:riesgo,deterioro:deterioro,gravedad:gravedad, showComent:true, showTipo:false})
   }

  callbackImgs=(imagenes)=>{
    this.setState({imgsEnviar:imagenes})
  }

  removeImage=(image)=>{

    console.log('imagen',this.state.imgsEnviar)
    console.log('imagen1',this.state.imagen1)
    console.log('imagen2',this.state.imagen2)
    console.log('imagen3',this.state.imagen3)
    console.log('imagen4',this.state.imagen4)
    Alert.alert(
      "Eliminar imagen",
      "¿Esta seguro que desea eliminar esta imagen",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Si", onPress: () => {

          console.log('imagen', image)

        /*  let aux=[{key:image.key, uri: ''},...this.state.imgsEnviar]
          this.setState({ imgsEnviar: aux  });*/

          var aux = this.state.imgsEnviar.filter((item) => item !== image);
          this.setState({ imgsEnviar: aux  })

          console.log('imageviar-luego', this.state.imgsEnviar)

          if(image.key==1){
            this.setState({ imagen1: this.state.imagen2  })
            this.setState({ imagen2: this.state.imagen3  })
            this.setState({ imagen3: this.state.imagen4  })
            this.setState({ imagen4: ''  })
          }if(image.key==2){
            this.setState({ imagen2: this.state.imagen3  })
            this.setState({ imagen3: this.state.imagen4  })
            this.setState({ imagen4: ''  })

          }if(image.key==3){
            this.setState({ imagen3: this.state.imagen4  })
            this.setState({ imagen4: ''  })
          }if(image.key==4){
            this.setState({ imagen4: ''  })
          }


          let i=this.state.i
          i=i-1;
          this.setState({i:i});


      } }
      ]
    );
  }

  renderItem = ({item}) => (

    <TouchableOpacity
      onPress={()=>this.removeImage(item)}
    >
      <View >
        <Image style={styles.img2} source = {{uri:item.uri}}/>
      </View>
    </TouchableOpacity>

  )



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

          this.state.localDir=imageUri;
          this.state.archivo=image64;
          this.state.tipo=match;
        //  this.setState({i:this.state.i++});
          let i=this.state.i
          i=i+1;
          this.setState({i:i});


          if(this.state.i==1){
            this.setState({imagen1:image64});
          }if(this.state.i==2){
            this.setState({imagen2:image64});
          }if(this.state.i==3){
            this.setState({imagen3:image64});
          }if(this.state.i==4){
            this.setState({imagen4:image64});
          }




          this.setState({imgSltd:image64});
          let aux=[ {key:this.state.i, uri: image64},...this.state.imgsEnviar]
          this.setState({ imgsEnviar: aux
         });
         if(this.state.imagen4){
          //  console.log( this.state.imgsEnviar[0], 'ok')
            //this.setState({ imgsEnviar: });
         }


            console.log('i camera',i)
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

          this.state.localDir=image;
          this.state.archivo=image64;
          this.state.tipo=match;

          let i=this.state.i
          i=i+1;
          this.setState({i:i});
          console.log("imagen_galeria",image);

          if(this.state.i==1){
            this.setState({imagen1:image64});
          }if(this.state.i==2){
            this.setState({imagen2:image64});
          }if(this.state.i==3){
            this.setState({imagen3:image64});
          }if(this.state.i==4){
            this.setState({imagen4:image64});
          }



          let aux=[ {key:this.state.i, uri: imageUri},...this.state.imgsEnviar]
          this.setState({ imgsEnviar: aux
         });

          this.setState({imgSltd:imageUri});

        });
    }

    const onPressPost = async () => {

      if(!this.state.planta || !this.state.bloque || !(this.state.calle || this.state.linea) || !this.state.nivel || !this.state.fondo || !this.state.imagen1 || !this.state.riesgo || !this.state.deterioro || !this.state.gravedad)
        {
          Alert.alert(
        "Información incompleta",
        "Falta llenar algún campo",
        [

          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
          );
        }else{
          let formData = new FormData();
          formData.append('nombre', this.state.planta);
          formData.append('ciudad', this.state.planta);
          formData.append('planta', this.state.planta);
          formData.append('bloque', this.state.bloque);
          formData.append('calle', this.state.calle);
          formData.append('linea', this.state.linea);
          formData.append('nivel', this.state.nivel);
          formData.append('fondo', this.state.fondo);
          formData.append('riesgo', this.state.riesgo);
          formData.append('deterioro', this.state.deterioro);
          formData.append('gravedad', this.state.gravedad);
          formData.append('comentarios', this.state.comentarios);
          formData.append('user', this.props.userId);
          
          formData.append('imagen1', this.state.imagen1);
          formData.append('imagen2', this.state.imagen2);
          formData.append('imagen3', this.state.imagen3);
          formData.append('imagen4', this.state.imagen4);


          Alert.alert(
            "Caso creado",
            "La información se ha guardado",
            [

              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
              );

          this.setState({showComent:false});
          this.props.navigation.navigate('Home')

          try{

            await axios.post('https://saferracks.espira.cloud/api/caso/insertar', formData);


          }catch(e){
            console.log(e);
          }
        }
    }




    const imprimirState=()=>{
      console.log("State", this.state)
    }





    return (



      //front
      <View style={styles.container}>

        {  console.log('props_en-crearCaso',this.props)}

        <View >
        <ScrollView>


          <Text style={styles.h1} >Registrar riesgo  </Text>
          <Text style={styles.texth} >Ingresa la ubicación, descripción, tipo y detalles del daño.  </Text>

          <View style={styles.row} >

          <Pressable  style={styles.box}  onPress={()=>{this.setState({showPlc:true})}} >

            <View >
              <Image style={styles.img}  source = {require("../../assets/placeholder.png")}/>
            </View>

            <View >
              <Text style={styles.h2}>Ubicación</Text>
            </View>

          </Pressable>

          <Pressable  style={styles.box} onPress={()=>{this.setState({showImg:true})}}    >

            <View  >
              <Image style={styles.img}  source = {require("../../assets/photo.png")}/>

            </View>
            <View >
              <Text style={styles.h2}>Imágenes</Text>
            </View>

          </Pressable>
          </View>


          <View style={styles.row} >

          <Pressable  style={styles.box} onPress={()=>{this.setState({showTipo:true})}}  >

            <View >
              <Image style={styles.img}  source = {require("../../assets/checked.png")}/>

            </View>

            <View >
              <Text style={styles.h2}>Tipo</Text>
            </View>

          </Pressable>


          <Pressable  style={styles.box}  onPress={()=>{this.setState({showComent:true})}} >

            <View  >
              <Image style={styles.img}  source = {require("../../assets/letter.png")}/>
            </View>

            <View >
              <Text style={styles.h2}>Detalles</Text>
            </View>


          </Pressable>


          </View>

          </ScrollView>

        </View>




        <View>
          <Modal
          transparet={false}
          visible={this.state.showImg}
          >

            <View style={stylesM.container}>
              <View style={stylesM.fondo}>

                <Text style={stylesM.h1}>Agregar imagen</Text>

                <FlatList
                  data={this.state.imgsEnviar}
                  renderItem={this.renderItem}
                  keyExtractor={(x,i) => i}

                  style={styles.altura}
                  horizontal

                />

                <Pressable style={stylesM.btn} onPress={takePhotoFromCamera}>
                <Text style={stylesM.h2} >Tomar foto</Text>
                </Pressable>

                <Pressable style={stylesM.btn}  onPress={fromLibrary}>
                <Text style={stylesM.h2} >Ir a galería</Text>
                </Pressable>

                <Pressable style={stylesM.btn} onPress={()=>{
                    if(!this.state.imagen1 ){
                      Alert.alert(
                    "Información incompleta",
                    "Debe cargar al menos una foto",
                      [
                          { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                      );
                    }else{
                      this.setState({ showTipo:true, showImg:false})
                    }
                }}>
                <Text style={stylesM.h2} >Siguiente </Text>
                </Pressable>

                <Pressable style={stylesM.btn} onPress={()=>{this.setState({showPlc:true, showImg:false })}}>
                <Text style={stylesM.h2} >  Anterior </Text>
                </Pressable>

                <Pressable style={stylesM.btn} onPress={()=>{this.setState({showImg:false})}}>
                <Text style={stylesM.h2} >Cancelar</Text>
                </Pressable>



              </View>

            </View>
          </Modal>

          <ScrollView>
            <Modal
            transparet={false}
            visible={this.state.showPlc}
            >
              <ScrollView style={stylesM.container}>
                <View style={stylesM.fondo}>

                  <Text style={stylesM.h1}>Agregar Ubicación</Text>

                  <View  >

                      <View  >
                      <Select
                          ubicacion={this.callbackUbicacion}
                      />
                      </View>
                  </View>



                  <Pressable style={stylesM.btn} onPress={()=>{this.setState({showPlc:false})}}>
                    <Text style={stylesM.h2} >Cancelar</Text>
                  </Pressable>

                </View>

              </ScrollView>
            </Modal>

          </ScrollView>

          <ScrollView>
            <Modal
            transparet={false}
            visible={this.state.showTipo}
            >
              <View style={stylesM.container}>
                <View style={stylesM.fondo}>

                  <Text style={stylesM.h1}>Agregar tipo de daño</Text>

                  <View >

                      <View >
                      <SelectCaso
                        daño={this.callbackDaño}
                      />
                      </View>
                  </View>

                  <Pressable style={stylesM.btn} onPress={()=>{this.setState({showImg:true, showTipo:false })}}>
                  <Text style={stylesM.h2} >  Anterior </Text>
                  </Pressable>

                  <Pressable style={stylesM.btn} onPress={()=>{this.setState({showTipo:false})}}>
                  <Text style={stylesM.h2} >Cancelar</Text>
                  </Pressable>

                </View>

              </View>
            </Modal>

          </ScrollView>

          <ScrollView>
            <Modal
            transparet={false}
            visible={this.state.showComent}
            >
              <View style={stylesM.container}>
                <View style={stylesM.fondo}>

                  <Text style={stylesM.h1}>Agregar comentarios</Text>

                  <TextInput
                   multiline={true}
                   style={stylesM.input}
                   placeholder="Comentarios"
                   onChangeText={(text)=> this.handleText(text)}
                  / >

                  <Pressable style={stylesM.btn} onPress={onPressPost}>
                  <Text style={stylesM.h2} >Guardar caso</Text>
                  </Pressable>

                  <Pressable style={stylesM.btn} onPress={()=>{this.setState({showTipo:true, showComent:false })}}>
                  <Text style={stylesM.h2} >  Anterior </Text>
                  </Pressable>

                  <Pressable style={stylesM.btn} onPress={()=>{this.setState({showComent:false})}}>
                  <Text style={stylesM.h2} >Cancelar</Text>
                  </Pressable>





                </View>

              </View>
            </Modal>

          </ScrollView>


        </View>

      </View>

    )
  }
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: 'row',
    backgroundColor: Colors.gris,
    padding: 5,
    width:width,
    height:height

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
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    marginTop: 25
  },
  text:{
    textAlign: "left",
    fontSize: 18,
    marginLeft: 3,
    marginRight: 16,
    marginBottom: 12


  },

  texth:{
    textAlign: "left",
    fontSize: 18,
    marginLeft: 15,
    marginRight: 16,
    marginBottom: 12


  },
  box:{
    //  flexDirection: "row",
    //  justifyContent: "space-between",
      padding: 16,
      backgroundColor: "white",
      borderRadius: 12,
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 8,
      marginTop: 8
      //borderBottomColor: Colors.gris,
    //  borderBottomWidth: 1

  },
  img:{width: 100,
    height: 100,
    alignItems: "center",
    margin: 15,
  },
  img2:{width: 100,
    height: 150,
    alignItems: "center",
    margin: 15,
    borderRadius: 8,
  },
  altura:{
    height: 180,
  },

  row:{
    flex:1,
    flexDirection: 'row',
    marginLeft: 8,
    marginRight: 8,
  },



});


const stylesM=StyleSheet.create ({
  input:{
    height: 150,
    borderColor: '#ccc',
    borderWidth: 2,
    marginBottom: 20,
    marginLeft: 10,
    marginRight:10,
    borderRadius: 8,
    fontSize: 18,
  },

  container:{
      padding: 10,
      backgroundColor: "rgba(34,34,34,0.5)",
      borderBottomColor: Colors.gris,
      borderBottomWidth: 1,
      width:width,
      height:height
  },
  fondo:{
      margin: 6,
      backgroundColor: "#ffffff",
      padding: 15,
      borderRadius: 10,



  },
  h1:{
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    margin: 16,
    marginTop: 30,

    color: Colors.azul,
  },
  btn:{
    padding:8,
    backgroundColor: Colors.rojo,
    borderRadius: 8,
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
  },
  h2:{
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.white,
  },
  select:{

    backgroundColor: Colors.hueso,
    borderRadius: 8,
    paddingLeft: 8,
    marginLeft:  16,
    marginRight:  16,



    borderColor: '#fff',


  },

  selectText:{
    marginLeft:  30,
    fontSize: 18,

  },
  img:{
      width: 100,
      height: 100,
      alignItems: "center",
      margin: 15,
  },
  auxImg:{
    alignItems: "center",
  },
  scroll:{
    flexDirection: 'row',

  }

});

const mapStateToProps = (state) => {
  return{
    userId: state.userReducer.id,
    userRol: state.userReducer.rol,
    }
  }
export default connect(mapStateToProps)(CrearCasoScreen);
