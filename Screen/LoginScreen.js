import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

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

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#333',
    padding: 20,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
});

export default SecondPage;