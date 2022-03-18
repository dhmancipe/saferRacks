import React,{Component}  from 'react';
import{
  StyleSheet, Text, View, TouchableOpacity, Dimensions,ScrollView
}from 'react-native';
import Http from '../../libs/http';

var options= ['RED',' blue', ' yellow']
const {width, height}=Dimensions.get('window')


  class MiSelect extends Component {

    state={
      ciudades:[{"label": 'Diagnostico de planta', "id": 1},
      {"label": 'Reporte de inspección', "id": 2},
      {"label": 'Reporte de estabilidad',"id": 3}]
    }

  componentDidMount = async () => {

      const res = await Http.instance.get("https://saferracks.espira.cloud/ciudad/lista");

        this.setState({ciudades:res});
        console.log('giudades', this.state.ciudades)
      }



      render(){

        const    onPressItem=(option,id)=>{
              this.props.changeModal(false);
              this.props.setData(option);
              this.props.setId(id);
              console.log('props', this.props.setData)

            }



        const  option=this.state.ciudades.map((item, i)=>{
                return(
                  <TouchableOpacity
                    style={styles.option}
                    key={i}
                    onPress={()=>onPressItem(item.nombre,item.id)}
                  >
                    <Text style={styles.text}>
                      {item.nombre}
                    </Text>

                  </TouchableOpacity>

                )

              })

      return (

        <TouchableOpacity
          onPress={()=>this.props.changeModal(false)}
          style={styles.container}
        >
        <View style={styles.modal}>
          <ScrollView>
            {option}
          </ScrollView>
        </View >

        </TouchableOpacity>
      )

}
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: "rgba(34,34,34,0.2)",

  },
  modal:{
    backgroundColor: 'white',
    borderRadius: 10,
    width:width - 20,
    height:height/1.2

  },
  option:{
    alignItems: 'flex-start'
  },
  text:{
    margin:20,
    fontSize: 18,

  }

})

export  {MiSelect}
