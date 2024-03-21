import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const PhoneInput = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [CPF, setCPF] = useState('');

  const handleCPFChange = (input) => {
    // Remove qualquer caractere que não seja número do input
    const formattedInput = input.replace(/\D/g, '');
    // Adicione a formatação desejada ao número de telefone
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
    // Atualize o estado com o número de telefone formatado
    setCPF(formattedCPF);
  };

  const handlePhoneNumberChange = (input) => {
    // Remove qualquer caractere que não seja número do input
    const formattedInput = input.replace(/\D/g, '');
    // Adicione a formatação desejada ao número de telefone
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
    // Atualize o estado com o número de telefone formatado
    setPhoneNumber(formattedPhoneNumber);
  };

  return (
    <View style={{flex:1, flexDirection:'row', marginBottom:10,position:'absolute', top: 225}}>
      <TextInput maxLength={15}
        style={styles.textCadastroAreaFlex}
        placeholder="(XX) XXXXX-XXXX"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={handlePhoneNumberChange}
      />
      <TextInput maxLength={14}
        style={styles.textCadastroAreaFlex}
        placeholder="XXX.XXX.XXX-XX"
        keyboardType="phone-pad"
        value={CPF}
        onChangeText={ handleCPFChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textCadastroAreaFlex:{
    marginLeft:6,
    marginRight:8,
    backgroundColor: 'lightgray',
    width: 120,
    height: 35,
    borderRadius: 10,
    paddingLeft: 8,
  },
});

export default PhoneInput;