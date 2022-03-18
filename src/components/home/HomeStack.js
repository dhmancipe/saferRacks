import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import MisCasosScreen from './MisCasosScreen';
import CasoDetailScreen from './CasoDetailScreen';
import Colors from '../../res/colors';
import PerfilScreen from './PerfilScreen';
import CrearCasoScreen from './CrearCasoScreen';
import ModalImgScreen from './ModalImgScreen';
import ReportesScreen from './ReportesScreen';
import Login from './Login';

const Stack = createStackNavigator();

const HomeStack = () =>  {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle:{
          backgroundColor:Colors.rojo,
          shadowColor: Colors.rojo
        },
        headerTintColor: Colors.white
      }}
    >

      <Stack.Screen
      name="Login"
      component={Login}
      />

      <Stack.Screen
       name="Home"
       component={HomeScreen}
       options={
        {
        headerLeft:null
      }}
       />

      <Stack.Screen
      name="Mis Casos"
      component={MisCasosScreen}
      />

      <Stack.Screen
      name="Detalle Caso"
      component={CasoDetailScreen}
      />

      <Stack.Screen
      name="Perfil"
      component={PerfilScreen}
      />

      <Stack.Screen
      name="Crear Caso"
      component={CrearCasoScreen}
      />

      <Stack.Screen
      name="Agregar imagen"
      component={ModalImgScreen}
      />

      <Stack.Screen
      name="Reportes"
      component={ReportesScreen}
      />



    </Stack.Navigator>

  );
}

export default HomeStack;
