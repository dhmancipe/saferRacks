import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet, ActivityIndicator,Dimensions, Modal, TouchableOpacity} from 'react-native';
import Http from '../../libs/http';
import CasosItem from './CasosItem';
import Search from '../search/Search';
import {MiSelect} from '../select/miSelect';
import {MiSelectEstado} from '../select/miSelectEstado';
import {connect} from 'react-redux';
const {width, height}=Dimensions.get('window');
import Colors from '../../res/colors';

class MisCasosScreen extends Component{

  state = {
     casos:[],
     loading:false,
     allCases:[],
     allCasesFiltered:[],
     modalVisible:false,
     ciudad:'',
     chooseData1:'Ciudad',
     modalVisible2:false,
     estado:'',
     chooseData2:'Estado',
  }

  componentDidMount =  () => {
    this.getCasos();
  }

  getCasos = async () => {
    this.setState({loading:true})
    const res = await Http.instance.get("https://saferracks.espira.cloud/caso/lista/"+this.props.userId);
    this.setState({casos:res, allCases:res, allCasesFiltered:res, loading:false});


  }

  handlePress = (caso) =>{
    //console.log("about case", this.props);
    this.props.navigation.navigate('Detalle Caso',caso)
  }
  //<Search onChange={this.handleSearch} />
/*  handleSearch = (query) => {
    const  {allCases} = this.state;
    const caseFiltered = allCases.filter((caso) => {
      return caso.ciudad.nombre.toLowerCase().includes(query.toLowerCase())
    });

    this.setState({casos: caseFiltered});
    console.log("caososfill", this.state.casos);
  }*/


  render(){

    const {casos, loading} = this.state;

    const changeModal =(bool) =>{
      this.setState({modalVisible: bool})
    }

    const setData=(option)=>{
      this.setState({chooseData1: option})
      const  {allCases} = this.state;
      const caseFiltered = allCases.filter((caso) => {
        return caso.ciudad.nombre.toLowerCase().includes(option.toLowerCase())
      });

      this.setState({casos: caseFiltered,allCasesFiltered: caseFiltered});
      console.log("caososfill", this.state.casos);
    }

    const setId=(id)=>{
      this.setState({ciudad: id})

    }

    const changeModal2 =(bool) =>{
      this.setState({modalVisible2: bool})
    }

    const setData2=(option)=>{
      this.setState({chooseData2: option})
      const  {allCasesFiltered} = this.state;
      const caseFiltered = allCasesFiltered.filter((caso) => {
        return caso.estado.toLowerCase().includes(option.toLowerCase())
      });

      this.setState({casos: caseFiltered});
      console.log("caososfill", this.state.casos);
    }

    const setId2=(id)=>{
      this.setState({ciudad: id})

    }

    return (

      <View style={styles.container}>

        <View style={styles.filterContainer}>
          <Text style={styles.textSelectBold}>Filtrar por:  </Text>
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

          <TouchableOpacity
             onPress={() => changeModal2(true)}
             style={styles.miSelectEstado}
             >
              <Text style={styles.textSelect}>{this.state.chooseData2}</Text>
          </TouchableOpacity >

          <Modal
            transparet={true}
            animationType='fade'
            visible={this.state.modalVisible2}
            nRequestClose={() => changeModal2(false)}

          >
              <MiSelectEstado
                changeModal={changeModal2}
                setData={setData2}
                setId={setId2}

              />
          </Modal>


        </View>


      {loading?
        <ActivityIndicator
        style={styles.loader}
        color = "red"
        size="large"/>
        :null
      }
        <FlatList
          data={this.state.casos}
          keyExtractor={item => item.id}
          renderItem ={({item})=>
          <CasosItem item={item}
          onPress={() => this.handlePress(item)}

          />
        }
        />

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: "#d9d9d9",
    padding: 15,
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
    textAlign: "center",
    fontSize: 18,
    textAlign:"center",
  },
  loader:{
    marginTop: 60
  },
  miSelect:{

    backgroundColor: Colors.hueso,


    borderRadius: 4,
    width: width/3

    },
    miSelectEstado:{

      backgroundColor: Colors.hueso,
      marginLeft: 2,

      borderRadius: 4,
      width: width/3

      },
    textSelect:{
      textAlign: 'center',
      fontSize: 16,
      marginTop:  10,
      marginLeft: 0,
      marginBottom: 10
    },
    textSelectBold:{

      fontSize: 16,
      marginTop:  10,
      marginLeft: 15,
      marginBottom: 10,
      fontWeight: 'bold'
    },
    filterContainer:{
      flexDirection:"row",
      backgroundColor: Colors.gris,
        borderWidth: 2,
        borderColor: Colors.gris,


    },

});

const mapStateToProps = (state) => {
  return{
    userId: state.userReducer.id,
    userRol: state.userReducer.rol,
    }
  }

export default connect(mapStateToProps)(MisCasosScreen);
