import React, {Component} from 'react';
import {View, Text,StyleSheet, Alert, Pressable, Platform, TouchableOpacity, Modal } from 'react-native';
import Colors from '../../res/colors';
import {Picker} from '@react-native-picker/picker';
import Http from '../../libs/http';
import destr from 'destr';
import {MiSelectCiudad} from './miSelectCiudad';
import {MiSelectBloque} from './miSelectBloque';
import {MiSelectNumero} from './miSelectNumero';
import {MiSelectNivel} from './miSelectNivel';
import {MiSelectFondo} from './miSelectFondo';
import axios from 'axios';
import {connect} from 'react-redux';


//***** UBICACIÓN DEL DAÑO*******
class Select extends Component {

  constructor(props)
  {

    super(props);

      this.state={
        bloque:4,
        ciudades:[],
        loading:false,
        bloques:[],
        calles:[],
        callesNum:6,
        ciudad:'',
        bloque:'',
        calle:'',
        linea:'',
        nivel:'',
        fondo:'',
        bloqueAux:'',
        pickerOpacity: 0,
        opacityOfOtherItems: 1 ,//THIS IS THE OPACITY OF ALL OTHER ITEMS, WHICH COLLIDES WITH YOUR PICKER.
        label: 'Firstvalue',
        chooseData1:'Seleccione una ciudad',
        modalVisible1:false,
        chooseData2:'Seleccione una bloque',
        modalVisible2:false,
        chooseDataCalle:'N°',
        modalVisibleCalle:false,
        chooseDataLinea:'N°',
        modalVisibleLinea:false,
        chooseDataNivel:'N°',
        modalVisibleNivel:false,
        chooseDataFondo:'N°',
        modalVisibleFondo:false,

      }
  }


  







  render(){

    var  maxCalle = (callesNum) => {

        for(let i = 0; i < callesNum; i++){
          calless.push(
            {i}
          );
          this.setState({calles:calless});

    	   }

      }

    var myloop = [];

    for (let i = 1; i < 50; i++) {
      myloop.push(

        {"label": i,"id":i}

      );
    }

    var myloopNivel = [];

    for (let i = 1; i < 6; i++) {
      myloopNivel.push(

        {"label": i,"id":i}

      );
    }


    const {ciudades} = this.state;
    const {bloques} = this.state;
    const {bloque} = this.state;
    var {bloqueAux} = this.state;


    bloqueAux=bloques[bloque];

    let bloqueJson=destr(bloqueAux);
    let bloqueJson2=JSON.stringify(bloqueJson);
    let bloqueJson3=JSON.parse(3.14159265359);






    const guardarUbicacion=()=>{

        if(!this.state.ciudad || !this.state.bloque || !(this.state.calle || this.state.linea) || !this.state.nivel || !this.state.fondo ){
          Alert.alert(
        "Información incompleta",
        "Falta llenar algún campo",
        [

          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
          );
          console.log('state-select', this.state)
        }else {
            this.props.ubicacion(this.state.ciudad, this.state.bloque, this.state.calle, this.state.linea, this.state.nivel, this.state.fondo);
        }
    }

    const onPressPostSinNovedad = async () => {

      if(!this.state.ciudad || !this.state.bloque)
        {
          Alert.alert(
        "Información incompleta",
        "Debe escoger una ciudad y un bloque",
        [

          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
          );
        }else{
          let formData = new FormData();
          formData.append('nombre', this.state.ciudad);
          formData.append('ciudad', this.state.ciudad);
          formData.append('planta', this.state.ciudad);
          formData.append('bloque', this.state.bloque);
          formData.append('calle', 1);
          formData.append('linea', 1);
          formData.append('nivel', 1);
          formData.append('fondo', 1);
          formData.append('gravedad', 'verde');
          formData.append('riesgo', 7);
          formData.append('deterioro', 30);
          formData.append('user', this.props.userId);
          console.log('form_data', formData)
          Alert.alert(
            "Caso creado",
            "La información se ha guardado",
            [

              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
              );
            console.log('props.navigate',this.props)
          try{
            await axios.post('https://saferracks.espira.cloud/api/caso/insertar', formData);

          }catch(e){
            console.log(e);
          }
        }
    }



    console.log('this.state', this.state);

    const changeModal1 =(bool) =>{
      this.setState({modalVisible1: bool});
    }
    const setData1=(option)=>{
      this.setState({chooseData1: option})
    }
    const setId1=(id)=>{
      this.setState({ciudad: id});
    }

    const changeModal2 =(bool) =>{
      this.setState({modalVisible2: bool});
    }
    const setData2=(option)=>{
      this.setState({chooseData2: option})
    }
    const setId2=(id)=>{
      this.setState({bloque: id});
    }

    const changeModalCalle =(bool) =>{
      this.setState({modalVisibleCalle: bool});
    }
    const setDataCalle=(option)=>{
      this.setState({chooseDataCalle: option})
    }
    const setIdCalle=(id)=>{
      this.setState({calle: id});
    }


    const changeModalLinea =(bool) =>{
      this.setState({modalVisibleLinea: bool});
    }
    const setDataLinea=(option)=>{
      this.setState({chooseDataLinea: option})
    }
    const setIdLinea=(id)=>{
      this.setState({linea: id});

    }

    const changeModalNivel =(bool) =>{
      this.setState({modalVisibleNivel: bool});
    }
    const setDataNivel=(option)=>{
      this.setState({chooseDataNivel: option})
    }
    const setIdNivel=(id)=>{
      this.setState({nivel: id});
    }

    const changeModalFondo =(bool) =>{
      this.setState({modalVisibleFondo: bool});
    }
    const setDataFondo=(option)=>{
      this.setState({chooseDataFondo: option})
    }
    const setIdFondo=(id)=>{
      this.setState({fondo: id});

    }



    return(
      <View style={styles.container}>



        <View style={styles.columnText}><Text style={styles.text}>Ciudad</Text></View>


        <TouchableOpacity
           onPress={() => {
             changeModal1(true)


           }}
           style={styles.miSelect}

           >
            <Text style={styles.textSelect}>{this.state.chooseData1}</Text>
        </TouchableOpacity >

        <Modal
          transparet={true}
          animationType='fade'
          visible={this.state.modalVisible1}
          nRequestClose={() => changeModal1(false)}

        >
            <MiSelectCiudad
              changeModal={changeModal1}
              setData={setData1}
              setId={setId1}

            />
        </Modal>




          <View style={styles.columnText}>
          <Text style={styles.text}>Bloque</Text>
          </View>

          <TouchableOpacity
             onPress={() => changeModal2(true)}
             style={styles.miSelect}

             >
              <Text style={styles.textSelect}>{this.state.chooseData2}</Text>
          </TouchableOpacity >

          <Modal
            transparet={true}
            animationType='fade'
            visible={this.state.modalVisible2}
            nRequestClose={() => changeModal2(false)}

          >
              <MiSelectBloque
                changeModal={changeModal2}
                setData={setData2}
                setId={setId2}
                ciudad={this.state.ciudad}

              />
          </Modal>


          <View style={styles.rowText}>
            <Text style={styles.text}>Calle</Text>
            <Text style={styles.text}>Linea</Text>
          </View>


          <View style={styles.row} >




            <View style={styles.selectLocation}>

            <TouchableOpacity
               onPress={() => changeModalCalle(true)}
               style={styles.number}

               >
                <Text style={styles.textSelect}>{this.state.chooseDataCalle}</Text>
            </TouchableOpacity >

            <Modal
              transparet={true}
              animationType='fade'
              visible={this.state.modalVisibleCalle}
              nRequestClose={() => changeModalCalle(false)}

            >
                <MiSelectNumero
                  changeModal={changeModalCalle}
                  setData={setDataCalle}
                  setId={setIdCalle}

                />
            </Modal>

              </View>

              <View style={styles.selectLocation}>

              <TouchableOpacity
                 onPress={() => changeModalLinea(true)}
                 style={styles.number}

                 >
                  <Text style={styles.textSelect}>{this.state.chooseDataLinea}</Text>
              </TouchableOpacity >

              <Modal
                transparet={true}
                animationType='fade'
                visible={this.state.modalVisibleLinea}
                nRequestClose={() => changeModalLinea(false)}

              >
                  <MiSelectNumero
                    changeModal={changeModalLinea}
                    setData={setDataLinea}
                    setId={setIdLinea}

                  />
              </Modal>

                </View>

            </View>


            <View style={styles.rowText}>
              <Text style={styles.text}>Nivel</Text>
              <Text style={styles.text}>Fondo</Text>
            </View>


            <View style={styles.row} >




              <View style={styles.selectLocation}>

              <TouchableOpacity
                 onPress={() => changeModalNivel(true)}
                 style={styles.number}

                 >
                  <Text style={styles.textSelect}>{this.state.chooseDataNivel}</Text>
              </TouchableOpacity >

              <Modal
                transparet={true}
                animationType='fade'
                visible={this.state.modalVisibleNivel}
                nRequestClose={() => changeModalNivel(false)}

              >
                  <MiSelectNumero
                    changeModal={changeModalNivel}
                    setData={setDataNivel}
                    setId={setIdNivel}

                  />
              </Modal>

                </View>

                <View style={styles.selectLocation}>

                <TouchableOpacity
                   onPress={() => changeModalFondo(true)}
                   style={styles.number}

                   >
                    <Text style={styles.textSelect}>{this.state.chooseDataFondo}</Text>
                </TouchableOpacity >

                <Modal
                  transparet={true}
                  animationType='fade'
                  visible={this.state.modalVisibleFondo}
                  nRequestClose={() => changeModalFondo(false)}

                >
                    <MiSelectFondo
                      changeModal={changeModalFondo}
                      setData={setDataFondo}
                      setId={setIdFondo}

                    />
                </Modal>

                  </View>

              </View>

              <Pressable style={styles.btn} onPress={onPressPostSinNovedad}>
              <Text style={styles.h2} >Guardar sin novedad</Text>
              </Pressable>

              <Pressable style={styles.btn}  onPress={guardarUbicacion}>
              <Text style={styles.h2} >Elegir y siguiente </Text>
              </Pressable>







      </View>

    )
  }
}


const mapStateToProps = (state) => {
  return{
    userId: state.userReducer.id,
    userRol: state.userReducer.rol,
    }
  }
export default connect(mapStateToProps)(Select);


const styles = StyleSheet.create({
  select:{

    backgroundColor: Colors.hueso,
    borderRadius: 8,
    paddingLeft: 8,
    marginLeft:  16,
    marginRight:  16,
    marginTop:  5,
    borderColor: Colors.gris,
    borderWidth: 2,


  },
  row:{

    flexDirection: 'row',
    justifyContent: "space-between",
    marginLeft:  16,
    marginRight:  16,
  },

  selectLocation:{
    backgroundColor: Colors.hueso,
    borderColor: Colors.gris,
    borderWidth: 2,
    borderRadius: 8,
    marginTop:  5,


  },
  number:{
    height: 50, width: 120

  },
  rowText:{

    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft:  16,
    marginRight:  16,
  },
  text:{

    fontSize: 18,
    marginTop:  5,


  },
  columnText:{

    marginLeft:  125,
    marginRight:  16,

  },
  container:{

    marginTop:   30,
    marginBottom:   0,

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
  miSelect:{

    backgroundColor: Colors.hueso,
    borderColor: Colors.gris,
    borderWidth: 2,
    borderRadius: 8,
    marginTop:  5,
    marginLeft:  16,
    marginRight:  16,
    },
    textSelect:{

      fontSize: 16,
      marginTop:  15,
      marginLeft: 15,
      marginBottom: 15
    },


});
