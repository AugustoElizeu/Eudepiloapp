import React from 'react';
import { View, Text, StyleSheet, Button,TextInput,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function handleLogin(email, password, navigation) {
  const userDataString = await AsyncStorage.getItem(email);
  if (!userDataString) {
    window.alert('Senha e/ou usuário incorreto(s)');
    return;
  }
  const userData = JSON.parse(userDataString);
  if (userData.password === password) {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainScreen' }],
    });
  } else {
    window.alert('Senha e/ou usuário incorreto(s)');
  }
}

function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  return (
    <View style={styles.container}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.greatSlogan}>Suavidade em um toque:</Text>
        <Text style={styles.greatSlogan}>agende sua depilação conosco!</Text>
      </View>
      <View style={styles.viewShadowLogin}>
        <Text style={styles.textLoginLabel}>Email</Text>
        <TextInput 
          style={styles.textLoginArea}
          onChangeText={setEmail}
          value={email}
        />
        <Text style={styles.textLoginLabel}>Senha</Text>
        <TextInput 
          style={styles.textLoginArea}
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />
        <View style={{ position: "relative", left: 80, bottom: 10 }}>
          <Text style={{ color: '#0000ff' }} onPress={() => navigation.navigate('SignUpScreen')}>
            Esqueceu Senha?
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.buttonLogin} 
          onPress={() => handleLogin(email, password, navigation)}
        >
          <Text style={styles.buttonTextLogin}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default LoginScreen;

function ForgotScreen(){
  window.alert("HAHAHA SIFU GAMEPLAY")

}

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