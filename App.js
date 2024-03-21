import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity, ImageBackground,TextInput } from 'react-native';
//npm install all below
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PhoneInput from './Screen/PhoneInput'

const Stack = createNativeStackNavigator();

function LoginScreen(){
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
            <Text style={{  color:'#0000ff',}} onPress={() => navigation.navigate('SignUpScreen')}>Esqueceu Senha?</Text>
        </View>
        <TouchableOpacity style={styles.buttonLogin}  onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={styles.buttonTextLogin}>Entrar</Text>
         </TouchableOpacity>
    </View>
  </View>
  );

}
function ForgotScreen(){
  window.alert("HAHAHA SIFU GAMEPLAY")

}
function SignUpScreen(){
  

  return (
  <View style={styles.container}>
      <View>
        <Text style={styles.tituloStyle}>WE NEVER FADE AWAY</Text>
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
        <TouchableOpacity style={styles.buttonCadastro}>
            <Text style={styles.buttonTextCadastro}>Cadastrar-se</Text>
        </TouchableOpacity>
      </View>

  </View>
  );
}

function HomeScr({navigation}){

  return (
  <ImageBackground source={require('./imgs/fundo.jpg')} style={styles.background}>
  <View style={styles.container}>
    <View>
      <Image style={styles.imgConf} source={require('./imgs/download.png')}/>
    </View>

    <View style={{marginBottom:20,width:270,justifyContent:'center',alignItems: 'center'}}>
        <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.buttonText}>Entrar</Text>
         </TouchableOpacity>
    </View>
    
    <View style={styles.lineStr}>
            <Text style={{marginRight:5}}>Não possui conta?</Text>
            <TouchableOpacity>
               <Text style={{ color: 'blue' }} onPress={() => navigation.navigate('SignUpScreen')}>Clique aqui e cadastre-se</Text>
             </TouchableOpacity>
     </View>

     <View style={styles.footerx}>
                <Text style={{color: 'white'}}>Trabalho realizado pela turma de desenvolviment mobile</Text>
                <Text style={{color: 'white'}}>Augusto Elizeu,Ramon e Tamires - Abril/2024</Text>
      </View>
      <StatusBar style="auto"/>
    </View>
  </ImageBackground>
  );

}

export default function App() {
 return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScr" component={HomeScr} options={{ headerShown: false }}/>
 	      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerTitle: '' }}/>
        <Stack.Screen name='SignUpScreen' component={SignUpScreen} options={{headerTitle: ''}}/>
      </Stack.Navigator>
    </NavigationContainer>
);
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lineStr:{
    flexDirection:'row',
    marginBottom:10,
  },
  imgConf:{
    width: 200,
    height: 200,
    backgroundColor: 'lightblue',
    borderRadius: 50, // Aqui você define o raio da borda
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:100,
  },
  button:{
    width: 200, // Defina a largura do botão aqui
    height: 40, // Defina a altura do botão aqui
    backgroundColor: '#723172', // Cor de fundo do botão
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, // Borda arredondada
  },
  buttonText: {
    color: 'white', // Cor do texto do botão
    fontSize: 18, // Tamanho do texto do botão
  },
  footerx:{
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#723172',
    padding: 10,
    alignItems: 'center',
  },
  //-----------------------
  //LOGIN SCREEN STYLES
  //-----------------------
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
  //-----------------------
  //Sign up screen
  //-----------------------
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
        color: 'red'
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
