import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity, ImageBackground,TextInput } from 'react-native';
//npm install all below
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Screen/LoginScreen';
import SignUpScreen from './Screen/SignUpScreen';
import Agendamento from './Screen/MainScreen/Agendamento';
import MScreen from './Screen/MScreen';
import MainHud from './Screen/MainScreen/MainHud';

const Stack = createNativeStackNavigator();

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

function App(){
 return(
  <NavigationContainer>
  <Stack.Navigator initialRouteName="HomeScr">
    <Stack.Screen name="HomeScr" component={HomeScr} options={{ headerShown: false }} />
    <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerTitle: '' }} />
    <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerTitle: '' }} />
    <Stack.Screen name="MainScreen" component={MainHud} options={{ headerShown: false }} />
    <Stack.Screen name="Agendamento" component={Agendamento} options={{ headerTitle: '' }} />
  </Stack.Navigator>
</NavigationContainer>
   );
}



export default App

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
});
