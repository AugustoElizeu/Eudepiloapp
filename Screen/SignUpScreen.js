import React from 'react';
import { View, Text, StyleSheet, Button,TextInput,TouchableOpacity } from 'react-native';
import PhoneInput from './PhoneInput';

function SignUpScreen({navigation}){

  return (
  <View style={styles.container}>
      <View>
        <Text style={styles.tituloStyle}>Cadastre-se</Text>
      </View>
      <View style={styles.viewShadowCadastro}>
        <Text style={styles.textCadastroLabel}>Nome de Usuario</Text>
        <TextInput style={styles.textCadastroArea}></TextInput>
        <Text style={styles.textCadastroLabel}>Email</Text>
        <TextInput style={styles.textCadastroArea}></TextInput>
        <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignContent:"space-between"}}>
          <Text style={styles.textCadastroLabelFlex}>Telefone</Text>
           <Text style={styles.textCadastroLabelFlex} >CPF</Text>
        </View>
          <PhoneInput keyboardType="phone-pad"/>
        <Text style={styles.textCadastroLabel}>Senha</Text>
        <TextInput style={styles.textCadastroArea} secureTextEntry={true}></TextInput>
        <Text style={styles.textCadastroLabel}>Confirme Senha</Text>
        <TextInput style={styles.textCadastroArea} secureTextEntry={true}></TextInput>
        <TouchableOpacity style={styles.buttonCadastro} onPress={() => navigation.navigate('HomeScr')}>
            <Text style={styles.buttonTextCadastro}>Cadastrar-se</Text>
        </TouchableOpacity>
      </View>

  </View>
  );
}

export default SignUpScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
 
  viewShadowCadastro: {
    width: 320,
    height: 570,
    position:'relative',
    paddingTop: 20,
    top:25,
    borderRadius: 10,
    justifyContent:'center',
    alignItems:'center',
    shadowColor: 'rgba(0, 0, 0, 0.2)', // Cor da sombra
    shadowOffset: { width: 1, height: 4 }, // Deslocamento da sombra (horizontal, vertical)
    shadowOpacity: 1, // Opacidade da sombra
    shadowRadius: 1, // Raio da sombra
    elevation: 2, // Elevação da sombra (apenas para Android)
  },
  tituloStyle:{
        fontSize: 25,
        color: 'purple'
  },
  textCadastroArea:{
    backgroundColor: 'lightgray',
    width: 270,
    height: 35,
    borderRadius: 10,
    paddingLeft: 5,
    marginBottom:15,
  },
  buttonCadastro:{
    width: 270, // Defina a largura do botão aqui
    height: 40, // Defina a altura do botão aqui
    backgroundColor: '#723172', // Cor de fundo do botão
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, // Borda arredondada
    marginTop: 30,
    marginBottom: 40
  },
  textCadastroLabel: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    marginTop:10,
    marginBottom:5,
  },
  textCadastroLabelFlex: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    marginRight: 50,
    marginLeft: 30,
    position:'relative',
    bottom:5,
  },
  buttonTextCadastro: {
    color: 'white', // Cor do texto do botão
    fontSize: 20, // Tamanho do texto do botão
  },
});