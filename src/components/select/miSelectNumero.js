import React,{Component}  from 'react';
import{
  StyleSheet, Text, View, TouchableOpacity, Dimensions,ScrollView
}from 'react-native';
import Http from '../../libs/http';


const {width, height}=Dimensions.get('window')


  class MiSelectNumero extends Component {

    state={
      myloop : []
    }





      render(){

        const    onPressItem=(option,id)=>{
              this.props.changeModal(false);
              this.props.setData(option);
              this.props.setId(id);


            }



            for (let i = 1; i < 50; i++) {
              this.state.myloop.push(

                {"nombre": i,"id":i}

              );
            }



        const  option=this.state.myloop.map((item, i)=>{
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
    backgroundColor: "rgba(34,34,34,0.5)",

  },
  modal:{
    backgroundColor: 'white',
    borderRadius: 10,
    width:width - 30,
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

export  {MiSelectNumero}
