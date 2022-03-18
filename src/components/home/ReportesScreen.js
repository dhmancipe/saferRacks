import React, {Component, useState } from 'react';
import {View, Text, TouchableOpacity,StyleSheet,ScrollView, Pressable, WebView, PermissionsAndroid, Platform, Alert, Dimensions, Modal} from 'react-native';
import Colors from '../../res/colors';

import Http from '../../libs/http';
import Fecha from './Fecha';
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';
const {width, height}=Dimensions.get('window');
import {MiSelect} from '../select/miSelect';


class ReportesScreen extends Component {

  state={

    ciudad:'',
    reporte:'',
    loading:false,
    date1:new Date(1598051730000),
    date2:new Date(1598051730000),
    chooseData1:'Seleccione una ciudad',

    modalVisible:false,


  }
  callbackFunction1 = (fecha) => {
  let  date1=this.formatDate(fecha);
      this.setState({date1: date1})
 }
 callbackFunction2 = (fecha) => {
   let  date2=this.formatDate(fecha);
       this.setState({date2: date2})
}


 formatDate = (date)=>{
let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" +   date.getDate()
 return formatted_date;
};





    actualDownload = () => {
        let dateReport = new Date().getSeconds();
        const { dirs } = RNFetchBlob.fs;
        RNFetchBlob.config({
        fileCache: true,
        addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: `casos.pdf`,
        path: `${dirs.DownloadDir}/casos.pdf`+dateReport,
        },
      })
        .fetch('GET', "https://saferracks.espira.cloud/informe/prueba?ciudad="+this.state.ciudad+"&date1="+this.state.date1+"&date2="+this.state.date2, {})
        .then((res) => {

        })
        .catch((e) => {
          console.log(e)
        });
    }

    actualDownload2 = () => {
        let dateReport = new Date().getSeconds();
        const { dirs } = RNFetchBlob.fs;
        RNFetchBlob.config({
        fileCache: true,
        addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: `casos.xls`,
        path: `${dirs.DownloadDir}/casos.xls`+dateReport,
        },
      })
        .fetch('GET', "https://saferracks.espira.cloud/informe/excel?ciudad="+this.state.ciudad+"&date1="+this.state.date1+"&date2="+this.state.date2, {})
        .then((res) => {
          console.log('The file saved to ', res.path());
        })
        .catch((e) => {
          console.log(e)
        });
    }

    actualDownload3 = () => {
        let dateReport = new Date().getSeconds();
        const { dirs } = RNFetchBlob.fs;
        RNFetchBlob.config({
        fileCache: true,
        addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: `estabilidad.pdf`,
        path: `${dirs.DownloadDir}/estabilidad.pdf`+dateReport,
        },
      })
        .fetch('GET', "https://saferracks.espira.cloud/informe/estabilidad?ciudad="+this.state.ciudad, {})
        .then((res) => {
          console.log('The file saved to ', res.path());
        })
        .catch((e) => {
          console.log(e)
        });
    }

    downloadFile = async() => {
      try {
          const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            this.actualDownload();
              alert('Reporte descargado con exito')
          } else {
            Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
          }
        } catch (err) {
          console.warn(err);
        }
    }

    downloadFile2 = async() => {
      try {
          const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            this.actualDownload2();
              alert('Reporte descargado con exito')
          } else {
            Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
          }
        } catch (err) {
          console.warn(err);
        }
    }
    downloadFile3 = async() => {
      try {
          const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            this.actualDownload3();
              alert('Reporte descargado con exito')
          } else {
            Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
          }
        } catch (err) {
          console.warn(err);
        }
    }




  render (){



    const {ciudades} = this.state;
    const date1 = this.state.date1;
    const date2 = this.state.date2;
    const ciudad = this.state.ciudad;
    const reporte = this.state.reporte;
    const pdfPath='https://saferracks.espira.cloud/informe/prueba';

    console.log('state',this.state.ciudad)




    const changeModal =(bool) =>{
      this.setState({modalVisible: bool})
    }

    const setData=(option)=>{
      this.setState({chooseData1: option})
    }
    const setId=(id)=>{
      this.setState({ciudad: id})
    }

    return (
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.h1} > Reportes </Text>
            <View style={styles.columnText}><Text style={styles.text}>Seleccione la ciudad</Text></View>
            <TouchableOpacity
               onPress={() => changeModal(true)}
               style={styles.miSelect}

               >
                <Text style={styles.textSelect}>{this.state.chooseData1}</Text>
            </TouchableOpacity >

            <Modal
              transparet={true}
              animationType='fade'
              visible={this.state.modalVisible}
              nRequestClose={() => changeModal(false)}

            >
                <MiSelect
                  changeModal={changeModal}
                  setData={setData}
                  setId={setId}

                />
            </Modal>





              <View style={styles.columnText}><Text style={styles.text}>Desde</Text></View>

              <View style={styles.selectDate}>
                <Fecha
                  dateIn={this.callbackFunction1}
                />
              </View>

              <View style={styles.columnText}><Text style={styles.text}>Hasta </Text></View>

              <View style={styles.selectDate}>
                <Fecha
                  dateIn={this.callbackFunction2}
                />
              </View>


              <View style={styles.columnText}><Text style={styles.text2}>Generar reporte de:</Text></View>


              <Pressable style={styles.btn} onPress={this.downloadFile2}>
              <Text style={styles.btnTxt} >Daños en Excel</Text>
              </Pressable>
              <Pressable style={styles.btn} onPress={this.downloadFile}>
              <Text style={styles.btnTxt} >Daños en PDF</Text>
              </Pressable>
              <Pressable style={styles.btn} onPress={this.downloadFile3}>
              <Text style={styles.btnTxt} >Estabilidad en PDF</Text>
              </Pressable>


        </View>
      </ScrollView>
    )
  }


}

const defaultValues=()=>{

  return{
    tipo:"",
    ciudad:"",
    date1:"",
    date2:""
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
  selectDate:{

    backgroundColor: Colors.hueso,
    borderRadius: 8,
    marginLeft:  16,
    marginRight:  16,
    marginTop:  5,

    borderColor: Colors.gris,
    borderWidth: 2,


  },

  text:{

    fontSize: 18,
    marginTop:  5,
  },
  textSelect:{

    fontSize: 16,
    marginTop:  15,
    marginLeft: 15,
    marginBottom: 15
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

  text2:{

    fontSize: 18,
    marginTop:  15,
  },


  columnText:{

    alignItems: 'center',
    marginRight:  16,

  },
  btn:{

    backgroundColor: Colors.rojo,
    borderRadius: 8,
    marginLeft:  16,
    marginRight:  16,
    marginTop:  25,

  },
  btnTxt:{

    color: Colors.white,
    textAlign: "center",
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,




  },


});

export default ReportesScreen;
