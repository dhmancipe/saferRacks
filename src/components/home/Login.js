import React, {Component} from 'react';
import {ScrollView,View, Text, StyleSheet, Image, TextInput, Pressable, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Colors from '../../res/colors';
import Http from '../../libs/http';
import UrlService from '../../libs/UrlService';
import AuthService from '../../libs/AuthService';
import CookieService from '../../libs/CookieService';
import CheckBox from '@react-native-community/checkbox';
import {connect} from 'react-redux';
import{setId, setRol, setCargo, setName} from '../../redux/actions';
const {width, height}=Dimensions.get('window')


class Login extends Component {



  constructor()
  {


    super();
    this.state={

      grant_type: 'password',
      client_id : 2,
      client_secret:'BXB2IpNEGmk3ih1kx65MKU1QCburmqxtGlCFhnoY',
      username:'',
      password:'',
      scop: '',
      isChecked:false,
  //    userId:'',
      isUser:false,



    }
  }

  componentDidMount= async () => {
    AsyncStorage.getItem('database_form')
        .then(value=>{
          console.log('dataform', value.user)
          this.props.setId(JSON.parse(value).id);
          this.props.setRol(JSON.parse(value).rol);

          this.props.setName(JSON.parse(value).user);
          if(JSON.parse(value).error==null){
            this.setState({isUser:true});



            //console.log("props_after log",this.props)
            this.props.navigation.navigate('Home')


          }else{
            console.log('Por favor revise sus datos de acceso', res)
            alert('Por favor revise sus datos de acceso')
          }
        })


  }

  handleUser=(text) =>{
    this.setState({username:text});
  }

  handlePass=(text) =>{
    this.setState({password:text});
  }

  handleCheck=(text) =>{
    this.setState({isChecked:text});
  }

  consultarUser = async () => {

    const espiresAt= 60*24;


    let formData = new FormData();
    formData.append('grant_type', this.state.grant_type);
    formData.append('client_id', this.state.client_id);
    formData.append('client_secret', this.state.client_secrete);
    formData.append('username', this.state.username);
    formData.append('password', this.state.password);
    formData.append('scop', this.state.scop);

    const arrayData=[];

    try {


      const res = await Http.instance.post(UrlService.loginUrl(),formData);
      const user = await Http.instance.get("https://saferracks.espira.cloud/user/status?email="+this.state.username);
      console.log('user_rol',user.rol)
      this.props.setId(user.id);
      this.props.setRol(user.rol);
      this.props.setCargo(user.cargo);
      this.props.setName(user.name);

      const data={
        user:user.name,
        id:user.id,
        rol:user.rol,
        cargo:user.cargo,
        error:res.error,
        isUser:this.state.isUser,



      }
        arrayData.push(data);
        try{
          AsyncStorage.setItem('database_form',JSON.stringify(data)).then(()=>{

            AsyncStorage.getItem('database_form')
                .then(value=>{
                  console.log('dataform_login', JSON.parse(value))
                  if(value.error==null){
                    this.setState({isUser:true});

                    //console.log("props_after log",this.props)
                    this.props.navigation.navigate('Home')


                  }else{
                    console.log('Por favor revise sus datos de acceso', res)
                    alert('Por favor revise sus datos de acceso')
                  }
                })






            })
        }catch(err){
          console.log(err);
        }

    //  this.setState({userId:user.id});

    //  console.log('user data after log', user.id)



    } catch (error) {
      error.preventDefault();

      alert('Por favor revise sus datos de acceso')
    }



  }





  render (){




    return (
      <ScrollView style={styles.container}>

      <View style={styles.img}>
        <Image style={{
          resizeMode: "cover",
          height: 100,
          width: 100
        }}  source = {require("../../assets/icon.png")}/>
        <Text style={styles.h1}>Safer Racks</Text>
      </View>
      <View>
        <TextInput
         keyboardType='email-address'
         style={styles.input}
         placeholder="   E-Mail"
         onChangeText={(text)=> this.handleUser(text)}
        / >

        <TextInput
         secureTextEntry={!this.state.isChecked}
         inlineImageLeft='../../assets/icon.png'
         style={styles.input}
         placeholder=" Contraseña"
         onChangeText={(text)=> this.handlePass(text)}
        / >
        <View style={styles.row}>
          <CheckBox
            tintColors={Colors.gris}
            style={styles.inputCheck}
            disabled={false}
            value={this.state.isChecked}
            onValueChange={(text) => this.handleCheck(text)}
          />
          {console.log('check',this.state.isChecked)}
          <Text style={styles.text2}>Ver contraseña</Text>
        </View>

      </View>
      <View style={styles.press}>

        <Pressable style={styles.btn} onPress={this.consultarUser}>

        <Text style={styles.h2} >Ingresar </Text>
        </Pressable>


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

  btn:{
    padding:8,
    backgroundColor: Colors.rojo,
    borderRadius: 8,
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
  },
  h1:{
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    margin: 16,
    marginTop: 5,
    color:Colors.azul,
  },

  text:{

    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
    marginBottom: 3,
    color:Colors.azul,
  },
  text2:{

    fontSize: 18,

    textAlign: "center",
    marginTop: 3,

  },

  img:{

    alignItems: "center",
    paddingTop:  40,
    paddingBottom: 60,

    //height: 100,
    //width: 200
  },
  input:{
    height: 60,
    borderColor: '#ccc',
    borderBottomWidth: 2,

    marginBottom: 20,
    marginLeft: 10,
    marginRight:10,
    borderRadius: 8,
    fontSize: 18,
  },
  inputCheck:{
    marginLeft: 10,
    marginRight: 10,

  },
  h2:{
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.white,
  },

  press:{


    paddingBottom: 40,
    paddingTop: 40

    //height: 100,
    //width: 200
  },
  row:{
    flexDirection:"row",
  }

});

const mapDispatchToProps ={
  setId,
  setRol,
  setName,
  setCargo
}

const mapStateToProps = (state) => {
  return{
    userId: state.userReducer.id,
    userRol: state.userReducer.rol,
    userName: state.userReducer.name,
    userCargo: state.userReducer.cargo,

    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Login);
