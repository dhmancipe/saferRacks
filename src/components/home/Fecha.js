import React, { useState } from 'react'
import {View, Text,StyleSheet, Alert, Platform, Button, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';



const Fecha = (props) => {

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);



  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    props.dateIn(currentDate);

  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');


  };

  const showTimepicker = () => {
    showMode('time');
  };




  return (



    <View>





      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="spinner"
          onChange={onChange}
        />
      )}
      

      <Pressable   onPress={showDatepicker}>

      <Text style={styles.text}>{Moment(date).calendar()}</Text>
      </Pressable>


    </View>
  )
}

const styles = StyleSheet.create({
  text:{
    fontSize:  16,

    marginLeft: 28,
    marginTop: 14,
    marginBottom: 14,


  }
});


export default Fecha;
