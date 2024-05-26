import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

function ProfileScreen({ navigation }) {
  const [userData, setUserData] = useState({
    nome: '',
    email: '',
    telefone: '',
    CPF: '',
    fotoPerfil: '',
  });

  const [agendamentos, setAgendamentos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [cancelIndex, setCancelIndex] = useState(null);

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
      setUserData((prevState) => ({
        ...prevState,
        email: currentUserEmail,
      }));
    } catch (error) {
      console.error('Erro ao obter os dados do usuário:', error);
    }
  };

  const loadAgendamentos = async () => {
    try {
      const currentUserEmail = await AsyncStorage.getItem('currentUserEmail');
      const allKeys = await AsyncStorage.getAllKeys();
      const userAgendamentos = allKeys.filter((key) => key.startsWith(`${currentUserEmail}-`));
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
  };

  const renderAgendamento = ({ item, index }) => (
    <View style={styles.agendamentoItem}>
      <Text>Serviço: {item.servico}</Text>
      <Text>Data: {item.data}</Text>
      <Text>Horário: {item.horario}</Text>
      <TouchableOpacity
        style={styles.uncheckBtn}
        onPress={() => {
          setModalVisible(true);
          setCancelIndex(index);
        }}
      >
        <FontAwesome name={'window-close'} size={20} color={'white'} />
      </TouchableOpacity>
    </View>
  );

  const handleCancelAgendamento = async () => {
  try {
    const currentUserEmail = await AsyncStorage.getItem('currentUserEmail');
    const agendamentoKey = `${currentUserEmail}-${cancelIndex}`;
    await AsyncStorage.removeItem(agendamentoKey);
    setModalVisible(false);
    Alert.alert('Consulta Cancelada', 'A consulta foi cancelada com sucesso.');

    // Removendo o agendamento diretamente do estado agendamentos
    setAgendamentos((prevAgendamentos) => {
      const updatedAgendamentos = prevAgendamentos.filter((item, index) => index !== cancelIndex);
      return updatedAgendamentos;
    });
  } catch (error) {
    console.error('Erro ao cancelar a consulta:', error);
  }
};

  const handleSelectImage = async () => {
    // Código para seleção de imagem...
  };

  return (
    <View style={styles.profileScreen}>
      <View style={styles.userData}>
        <TouchableOpacity onPress={handleSelectImage}>
          <Image style={styles.profilePicture} source={{ uri: userData.fotoPerfil }} />
          <FontAwesome name={'plus'} size={25} color={'#901090'} style={styles.iconPosition} />
        </TouchableOpacity>
        <View style={{ top: 60, left: 10 }}>
          <Text>Nome do usuário: {userData.username}</Text>
          <Text>Email: {userData.email}</Text>
          <Text>CPF.: {userData.CPF}</Text>
          <Text>Telefone: {userData.phoneNumber}</Text>
        </View>
        <TouchableOpacity style={styles.buttonLeave} onPress={() => navigation.navigate('HomeScr')}>
          <FontAwesome name={'sign-out'} size={30} color={'black'} />
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
      <CancelAppointmentModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        cancelIndex={cancelIndex}
        onCancelAppointment={handleCancelAgendamento}
      />
    </View>
  );
}

function CancelAppointmentModal({ modalVisible, setModalVisible, onCancelAppointment }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Deseja cancelar esta consulta?</Text>
          <TouchableOpacity style={{ ...styles.openButton, backgroundColor: '#32CD32', width:100,height:30,borderRadius:10,justifyContent:'center',alignContent:'center'}} onPress={onCancelAppointment}>
            <Text style={styles.textStyle}>Sim</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.openButton, backgroundColor: '#FF6347',  width:100,height:30,borderRadius:10,justifyContent:'center',alignContent:'center', margin:10 }}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.textStyle}>Não</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
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
  },uncheckBtn: {
      position: 'absolute',
      top:20,
      left:250,
      borderRadius: 100,
      width:30,
      height:30,
      justifyContent: 'center',
      alignItems:'center',
      backgroundColor:'black',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: '#723172',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
