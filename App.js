import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import api from './src/services/api';

export default function App() {
  const [cep, setCep] = useState('')
  const [cepUser, setCepUser] = useState(null)
  const inputRef = useRef(null)


  async function search(){
    if(cep == ''){
      alert("Digite um cep válido")
      setCep('')
      return;
    }

    try{
      const res = await api.get(`/${cep}/json`);
      console.log(res.data);
      setCepUser(res);
      Keyboard.dismiss();

    }catch(error){
      alert('ERROR: ' + error);
      console.log('ERROR: ' + error);
    }
  }

  function clear(){
    setCep('');
    setCepUser(null);
    inputRef.current.focus();
  }

  return (
    <SafeAreaView style={styles.container}>

        <View style={{marginTop: 32, alignItems: 'center'}}>
          <Text style={styles.title}>Digite o CEP desejado: </Text>
          <TextInput
          style={styles.input} 
          placeholder='Ex: 12345678'
          value={cep}
          onChangeText={(text) => setCep(text)}
          keyboardType='numeric'
          ref={inputRef}
          />
        </View>


        <View style={styles.areaBtn}>
          <TouchableOpacity 
          style={[styles.button, {backgroundColor: '#1d75cd'}] }
          onPress={search}
          >
            <Text style={styles.textBtn}>Buscar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
          style={[styles.button, {backgroundColor: '#cd3e1d'}] }
          onPress={clear}
          >
            <Text style={styles.textBtn}>Limpar</Text>
          </TouchableOpacity>
        </View>


        {cepUser && 
        <View style={styles.result} >
          <Text style={styles.itemText}> CEP: {cepUser.data.cep} </Text>
          <Text style={styles.itemText}> Logradouro: {cepUser.data.logradouro} </Text>
          <Text style={styles.itemText}> Bairro: {cepUser.data.bairro} </Text>
          <Text style={styles.itemText}> Cidade: {cepUser.data.localidade} </Text>
          <Text style={styles.itemText}> Estado: {cepUser.data.estado} </Text>
        </View>
        }
     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDD',
  },
  title:{
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 25,
  },
  input:{
    borderWidth: 1,
    backgroundColor: '#FFF',
    padding: 10,
    width: '90%',
    borderColor: '#000',
    borderRadius: 5,
    fontSize: 18,
  },
  areaBtn:{
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15
  },
  button:{
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
  },
  textBtn:{
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600'
  },
  result:{
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText:{
    fontSize: 20
  }

});
