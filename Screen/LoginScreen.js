import React from 'react';
import { View, Text, StyleSheet, Button,TextInput,TouchableOpacity } from 'react-native';

function LoginScreen({navigation}){
  return (
  <View style={styles.container}>
    <View style={{  justifyContent:'center', alignItems:'center',}}>
      <Text style={styles.greatSlogan}>Suavidade em um toque:</Text>
      <Text style={styles.greatSlogan}>agende sua depilação conosco!</Text>
    </View>
    <View style={styles.viewShadowLogin}>
        <Text style={styles.textLoginLabel}>Email</Text>
        <TextInput Text style={styles.textLoginArea}></TextInput>
        <Text Text style={styles.textLoginLabel}>Senha</Text>
        <TextInput Text style={styles.textLoginArea} secureTextEntry={true}></TextInput>
        <View style={{ position:"relative", left:80, bottom:10,}}> 
            <Text style={{  color:'#0000ff',}} onPress={() => ForgotScreen()}>Esqueceu Senha?</Text>
        </View>
        <TouchableOpacity style={styles.buttonLogin}  onPress={() => navigation.navigate('MainScreen')}>
              <Text style={styles.buttonTextLogin}>Entrar</Text>
         </TouchableOpacity>
    </View>
  </View>
  );
}

function ForgotScreen(){
  window.alert("HAHAHA SIFU GAMEPLAY")

}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  textLoginLabel: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop:10,
    marginBottom:10,
  },
  textLoginArea:{
    backgroundColor: 'lightgray',
    width: 270,
    height: 40,
    borderRadius: 10,
    paddingLeft: 5,
    marginBottom:20,
  },
  buttonLogin:{
    width: 270, // Defina a largura do botão aqui
    height: 40, // Defina a altura do botão aqui
    backgroundColor: '#723172', // Cor de fundo do botão
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, // Borda arredondada
    marginTop: 30,
  },
  buttonTextLogin: {
    color: 'white', // Cor do texto do botão
    fontSize: 20, // Tamanho do texto do botão
  },
  viewShadowLogin: {
    width: 320,
    height: 350,
    position:'relative',
    bottom:50,
    borderRadius: 15,
    justifyContent:'center',
    alignItems:'center',
    shadowColor: 'rgba(0, 0, 0, 0.2)', // Cor da sombra
    shadowOffset: { width: 1, height: 1 }, // Deslocamento da sombra (horizontal, vertical)
    shadowOpacity: 1, // Opacidade da sombra
    shadowRadius: 1, // Raio da sombra
    elevation: 10, // Elevação da sombra (apenas para Android)
  },
  greatSlogan:{

    position:'relative',
    bottom:90,
    fontSize: 24,
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
});