import React, {Component} from 'react';
import {View, Text,StyleSheet, Image, Pressable , Alert, TouchableOpacity, Modal} from 'react-native';
import Colors from '../../res/colors';
import {Picker} from '@react-native-picker/picker';
import Http from '../../libs/http';
import {MiSelectRiesgo} from './miSelectRiesgo';
import {MiSelectDeterioro} from './miSelectDeterioro';
import {MiSelectGravedad} from './miSelectGravedad';


class SelectCaso extends Component {

  state={
    riesgo:'',
    deterioro:'',
    gravedad:'',
    riesgos:[],

    color:'1',
    deterioros:[],
    
    selectedLanguage: '',
    setSelectedLanguage:'',
    chooseData1:'Seleccione un riesgo',
    modalVisible1:false,
    chooseData2:'Seleccione un deteriro',
    modalVisible2:false,
    chooseData3:'Seleccione la gravedad',
    modalVisible3:false,

  }


  render(){



    const guardarDaño=()=>{
      if(!this.state.riesgo || !this.state.deterioro || !this.state.gravedad ){
        Alert.alert(
      "Información incompleta",
      "Falta llenar algún campo",
      [

        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  }else{
    this.props.daño(this.state.riesgo, this.state.deterioro, this.state.gravedad);
  }


    }

    const changeModal1 =(bool) =>{
      this.setState({modalVisible1: bool});
    }
    const setData1=(option)=>{
      this.setState({chooseData1: option})
    }
    const setId1=(id)=>{
      this.setState({riesgo: id});
    }

    const changeModal2 =(bool) =>{
      this.setState({modalVisible2: bool});
    }
    const setData2=(option)=>{
      this.setState({chooseData2: option})
    }
    const setId2=(id)=>{
      this.setState({deterioro: id});
    }

    const changeModal3 =(bool) =>{
      this.setState({modalVisible3: bool});
    }
    const setData3=(option)=>{
      this.setState({chooseData3: option})
    }
    const setId3=(id)=>{
      this.setState({gravedad: id});
    }

    return(
      <View style={styles.container}>


      <View style={styles.columnText}><Text style={styles.text}>Seleccione el tipo de riesgo</Text></View>


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
          <MiSelectRiesgo
            changeModal={changeModal1}
            setData={setData1}
            setId={setId1}

          />
      </Modal>



        <View style={styles.columnText}>
        <Text style={styles.text}>Seleccione el tipo de deterioro</Text>
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
            <MiSelectDeterioro
              changeModal={changeModal2}
              setData={setData2}
              setId={setId2}
              riesgo={this.state.riesgo}

            />
        </Modal>


        <View style={styles.columnText}><Text style={styles.text}>Seleccione el tipo de gravedad</Text></View>


        <TouchableOpacity
           onPress={() => {
             changeModal3(true)


           }}
           style={styles.miSelect}

           >
            <Text style={styles.textSelect}>{this.state.chooseData3}</Text>
        </TouchableOpacity >

        <Modal
          transparet={true}
          animationType='fade'
          visible={this.state.modalVisible3}
          nRequestClose={() => changeModal3(false)}

        >
            <MiSelectGravedad
              changeModal={changeModal3}
              setData={setData3}
              setId={setId3}

            />
        </Modal>



        <Pressable style={styles.btn}  onPress={guardarDaño}>
        <Text style={styles.h2} >Elegir y siguiente </Text>
        </Pressable>


      </View>


    )
  }
}

export default SelectCaso;


const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: 'row',
    backgroundColor: Colors.gris,
    padding: 5

  },
  hi:{
    backgroundColor: Colors.white,
    fontSize: 18,

  },
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
  container:{

    marginTop:   30,


  },
  columnText:{

    alignItems: 'center',
    marginRight:  16,

  },
  text:{
    marginLeft:  16,
    fontSize: 18,
    marginTop:  5,

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
    color: Colors.white,},
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
