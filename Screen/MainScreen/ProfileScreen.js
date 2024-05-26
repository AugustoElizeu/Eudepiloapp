import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

function ProfileScreen({navigation}) {
  const [userData, setUserData] = useState({
    nome: '',
    email: '',
    telefone: '',
    CPF:'',
    fotoPerfil: '',
  });

  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    loadUserData();
    loadAgendamentos();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadAgendamentos();
    }, [])
  );

  const loadUserData = async () => {
    try {
      const currentUserEmail = await AsyncStorage.getItem('currentUserEmail');
      const userDataJSON = await AsyncStorage.getItem(currentUserEmail);
      const userData = JSON.parse(userDataJSON);
      setUserData(userData);
      setUserData(prevState => ({
        ...prevState,
        email: currentUserEmail
      }));
    } catch (error) {
      console.error('Erro ao obter os dados do usuário:', error);
    }
  }

  const loadAgendamentos = async () => {
    try {
      const currentUserEmail = await AsyncStorage.getItem('currentUserEmail');
      const allKeys = await AsyncStorage.getAllKeys();
      const userAgendamentos = allKeys.filter(key => key.startsWith(`${currentUserEmail}-`));
      const agendamentosData = await Promise.all(
        userAgendamentos.map(async (key) => {
          const agendamentoJSON = await AsyncStorage.getItem(key);
          return JSON.parse(agendamentoJSON);
        })
      );
      setAgendamentos(agendamentosData);
    } catch (error) {
      console.error('Erro ao carregar os agendamentos:', error);
    }
  }

  const renderAgendamento = ({ item }) => (
    <View style={styles.agendamentoItem}>
      <Text>Serviço: {item.servico}</Text>
      <Text>Data: {item.data}</Text>
      <Text>Horário: {item.horario}</Text>
    </View>
  );

  const handleSelectImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert('Permissão negada', 'A permissão para acessar a galeria de mídia foi negada.');
        return;
      }

      const imageResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!imageResult.cancelled) {
        setFotoPerfil(imageResult.uri);
        await AsyncStorage.setItem('fotoPerfil', imageResult.uri);
        Alert.alert('Sucesso', 'Foto de perfil atualizada com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao selecionar a imagem:', error);
    }
  };


  return (
    <View style={styles.profileScreen}>
      <View style={styles.userData}>
        <TouchableOpacity onPress={handleSelectImage}>
          <Image style={styles.profilePicture} source={{ uri: userData.fotoPerfil}} />
          <FontAwesome name={'plus'} size={25} color={"#901090"} style={styles.iconPosition} />
        </TouchableOpacity>
        <View style={{ top: 60, left:10, }}>
          <Text>Nome do usuário: {userData.username}</Text>
          <Text>Email: {userData.email}</Text>
          <Text>CPF.: {userData.CPF}</Text>
          <Text>Telefone: {userData.phoneNumber}</Text>
        </View>
        <TouchableOpacity style={styles.buttonLeave} onPress={() => navigation.navigate('HomeScr')}>
          <FontAwesome name={'sign-out'} size={30} color={"black"} />
          <Text style={styles.relactiveText}>Log-off</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.agendamentosContainer}>
        <Text style={{ fontSize: 32, margin: 10, color: 'purple' }}>Serviços agendados</Text>
        <FlatList
          data={agendamentos}
          renderItem={renderAgendamento}
          keyExtractor={(item, index) => index.toString()}
          numColumns={1}
        />
      </View>
    </View>
  )
}

export default ProfileScreen;

const styles = StyleSheet.create({
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 100,
    left: 20,
    margin: 20,
    marginRight: 20,
    marginTop: 50,
  },
  userData: {
    right: 50,
    marginLeft: 50,
    marginTop: 5,
    flexDirection: 'row',
    alignContent:'center', 
    justifyContent: 'center'
  },
  profileScreen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  agendamentosContainer: {
    backgroundColor: '#f4f4f4',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    height: 500,
    marginTop: 20,
  },
  agendamentoItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width:280,
  },
  buttonLeave: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    margin: 5,
    top:70,
    left:20,
  },relactiveText:{
    width:50,
  },
  iconPosition: {
    position:'absolute',
    left:100,
    bottom:15,
  }
});
