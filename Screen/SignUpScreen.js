import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

async function handleSignUp(username, email, password, confirmPassword, phoneNumber, CPF, fotoPerfil) {
  if (password !== confirmPassword) {
    Alert.alert('Erro', 'As senhas não coincidem!');
    return;
  }
   
  if (!isValidEmail(email)) {
    Alert.alert('Erro', 'Por favor, insira um endereço de e-mail válido.');
    return;
  }

  const existingUser = await AsyncStorage.getItem(email);
  if (existingUser !== null) {
    Alert.alert('Erro', 'Este e-mail já está cadastrado!');
    return;
  }

  await AsyncStorage.setItem(email, JSON.stringify({ username, password, phoneNumber, CPF, fotoPerfil }));
  Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
}

function PhoneInput({ phoneNumber, setPhoneNumber, CPF, setCPF }) {
  const handleCPFChange = (input) => {
    const formattedInput = input.replace(/\D/g, '');
    let formattedCPF = '';
    if (formattedInput.length > 0) {
      formattedCPF = `${formattedInput.slice(0, 3)}.`;
      if (formattedInput.length > 3) {
        formattedCPF += `${formattedInput.slice(3, 6)}.`;
      }
      if (formattedInput.length > 6) {
        formattedCPF += `${formattedInput.slice(6, 9)}-`;
      }
      if (formattedInput.length > 9) {
        formattedCPF += `${formattedInput.slice(9, 11)}`;
      }
    }
    setCPF(formattedCPF);
  };

  const handlePhoneNumberChange = (input) => {
    const formattedInput = input.replace(/\D/g, '');
    let formattedPhoneNumber = '';
    if (formattedInput.length > 0) {
      formattedPhoneNumber = `(${formattedInput.slice(0, 2)}) `;
      if (formattedInput.length > 2) {
        formattedPhoneNumber += `${formattedInput.slice(2, 7)}-`;
      }
      if (formattedInput.length > 7) {
        formattedPhoneNumber += formattedInput.slice(7, 11);
      }
    }
    setPhoneNumber(formattedPhoneNumber);
  };

  return (
    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
      <TextInput
        maxLength={15}
        style={styles.textCadastroAreaFlex}
        placeholder="(..) .....-...."
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={handlePhoneNumberChange}
      />
      <TextInput
        maxLength={14}
        style={styles.textCadastroAreaFlex}
        placeholder="xxx.xxx.xxx-xx"
        keyboardType="phone-pad"
        value={CPF}
        onChangeText={handleCPFChange}
      />
    </View>
  );
}

function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [CPF, setCPF] = useState('');
  const patternImage = "https://avatarfiles.alphacoders.com/359/359671.jpeg"
  const [fotoPerfil, setFotoPerfil] = useState(patternImage);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.tituloStyle}>Cadastre-se</Text>
      </View>
      <View style={styles.viewShadowCadastro}>
        <Text style={styles.textCadastroLabel}>Nome de Usuario</Text>
        <TextInput
          style={styles.textCadastroArea}
          onChangeText={setUsername}
          value={username}
        />
        <Text style={styles.textCadastroLabel}>Email</Text>
        <TextInput
          style={styles.textCadastroArea}
          onChangeText={setEmail}
          value={email}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.textCadastroLabelFlex}>Telefone</Text>
          <Text style={styles.textCadastroLabelFlex}>CPF</Text>
        </View>
        <PhoneInput
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          CPF={CPF}
          setCPF={setCPF}
        />
        <Text style={styles.textCadastroLabel}>Senha</Text>
        <TextInput
          style={styles.textCadastroArea}
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />
        <Text style={styles.textCadastroLabel}>Confirme Senha</Text>
        <TextInput
          style={styles.textCadastroArea}
          secureTextEntry={true}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
        />
        <TouchableOpacity
          style={styles.buttonCadastro}
          onPress={() => handleSignUp(username, email, password, confirmPassword, phoneNumber, CPF, fotoPerfil)}
        >
          <Text style={styles.buttonTextCadastro}>Cadastrar-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewShadowCadastro: {
    width: 320,
    height: 570,
    paddingTop: 20,
    top: 25,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 1,
  },
  tituloStyle: {
    fontSize: 25,
    color: 'purple',
  },
  textCadastroArea: {
    backgroundColor: 'lightgray',
    width: 270,
    height: 35,
    borderRadius: 10,
    paddingLeft: 5,
    marginBottom: 15,
  },
  buttonCadastro: {
    width: 270,
    height: 40,
    backgroundColor: '#723172',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 40,
  },
  textCadastroLabel: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 5,
  },
  textCadastroLabelFlex: {
    fontSize: 18,
    marginLeft: 10,
    marginRight: 10,
  },
  textCadastroAreaFlex: {
    marginLeft: 6,
    marginRight: 8,
    backgroundColor: 'lightgray',
    width: 120,
    height: 35,
    borderRadius: 10,
    paddingLeft: 8,
  },
  buttonTextCadastro: {
    color: 'white',
    fontSize: 20,
  },
});