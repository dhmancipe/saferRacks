import React, {Component, useState } from 'react';
import {TextInput, Platform, View, StyleSheet} from 'react-native';

class Search extends Component {

  state ={
    query:""
  }

  handleText = (query) =>{
    this.setState({query});
    if(this.props.onChange){
      this.props.onChange(query);

      }
  }

  render (){

    const { query }= this.state;
    return(
      <View>
        <TextInput
          onChangeText={this.handleText}
          value={query}
          placeholder="Planta"
        />

      </View>

    );
  }
}
export default Search;
