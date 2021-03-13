// expo install @react-native-community/slider
// expo install expo-clipboard
import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Switch } from 'react-native';
import Icon from '@expo/vector-icons/Feather';

import Slider from '@react-native-community/slider';
import Clipboard from 'expo-clipboard';

let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'
let number = '0123456789';

export default function App(){
  const [password, setPassword] = useState('');
  const [size, setSize] = useState(7);
  const [ativo, setAtivo] = useState(false);

  function gerarSenha(){
    
    if(ativo == false){
      let pass = '';
      // n = ao total de charset(número)
      for(let i = 0, n = charset.length; i < size; i++){
        // += = concatenando 
        pass += charset.charAt(Math.floor(Math.random() * n))
      }
      setPassword(pass);
    }else{
      let pass = '';
      // n = ao total de charset(número)
      for(let i = 0, n = number.length; i < size; i++){
        // += = concatenando 
        pass += number.charAt(Math.floor(Math.random() * n))
      }
      setPassword(pass);
    }

    
  }

  function copyPass(){
    Clipboard.setString(password);
    Alert.alert( "Senha copiada!",
      "Senha copiada com sucesso!"
    )
  }

  return(
    <View style={styles.container}>
      <Image 
      source={require('./src/assets/logo.png')}
      style={styles.logo}
      />

      <Text style={styles.title}>{size} Caracteres</Text>

      <View style={styles.area}>
        <Slider 
        style={{height: 50}}
        minimumValue={5}
        maximumValue={15}
        minimumTrackTintColor="#FF0000"
        maximumTrackTintColor="#000"
        value={size}
        onValueChange={ (valor)=> setSize(valor.toFixed(0)) }
        />
      </View>

      <TouchableOpacity style={styles.areaButton} onPress={gerarSenha} >
        <Text style={styles.buttonText}>Gerar senha</Text>
      </TouchableOpacity>

      <View style={styles.areaSwitch}>
        <Text style={styles.switchText}>Apenas números</Text>
        <Switch
        style={styles.switch}
        onValueChange={ (valorSwitch) => setAtivo(valorSwitch)}
        value={ativo}
        />
      </View>

      {password !== '' && (
        <View style={styles.areaPassword}>
          <Text style={styles.password}>{password}</Text>
          <Icon style={styles.iconCopy} name="copy" size={20} color="#000" onPress={copyPass}/>
        </View>
      )}

      

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F3F3',
  },
  logo:{
    marginBottom: 60
  },
  title:{
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000'
  },
  area:{
    marginTop: 15,
    marginBottom: 15,
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 8
  },
  areaButton:{
    backgroundColor: '#FFA200',
    width: '80%',
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF'
  },
  areaPassword:{
    marginTop: 15,
    marginBottom: 15,
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 8
  },
  password:{
    padding: 10,
    fontSize: 20,
  },
  iconCopy: {
    padding: 15
  },

  areaSwitch:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 60,
    backgroundColor: '#DDD',
    padding: 10,
    borderRadius: 10,
  },
  switchText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFF'
  }


})