import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Pressable, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { depilacao, sobrancelha, esteticaFacial, cabelo, Outros } from './Data';


function Agendamento({ route }) {
  const [selectedValue, setSelectedValue] = useState('12:00');
  const [selectedValue1, setSelectedValue1] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [serviceOptions, setServiceOptions] = useState([]);

  const { item } = route.params;

  useEffect(() => {
    const mapServiceOptions = () => {
      switch (item.title) {
        case 'Depilação':
          setServiceOptions(depilacao);
          break;
        case 'Sobrancelha':
          setServiceOptions(sobrancelha);
          break;
        case 'Estética Facial':
          setServiceOptions(esteticaFacial);
          break;
        case 'Cabelo':
          setServiceOptions(cabelo);
          break;
        case 'Outros':
          setServiceOptions(Outros);
          break;
        default:
          setServiceOptions([]);
      }
    };

    mapServiceOptions();
  }, [item.title]);

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const today = new Date();
  const minDate = today.toISOString().split('T')[0];

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  const handleAgendar = async () => {
    if (!selectedDate || !selectedValue || !selectedValue1) {
      Alert.alert('Erro', 'Por favor, selecione uma data, horário e serviço.');
      return;
    }

    try {
      const currentUserEmail = await AsyncStorage.getItem('currentUserEmail');
      if (!currentUserEmail) {
        Alert.alert('Erro', 'Usuário não encontrado.');
        return;
      }

      const allKeys = await AsyncStorage.getAllKeys();
      const userAgendamentos = allKeys.filter(key => key.startsWith(`${currentUserEmail}-`));
      const existingAgendamentos = await Promise.all(
        userAgendamentos.map(async (key) => {
          const agendamentoJSON = await AsyncStorage.getItem(key);
          return JSON.parse(agendamentoJSON);
        })
      );

      const agendamentoConflitante = existingAgendamentos.find(
        (agendamento) => agendamento.data === selectedDate && agendamento.horario === selectedValue
      );

      if (agendamentoConflitante) {
        Alert.alert('Erro', 'Já existe um agendamento para esta data e horário. Por favor, escolha outra data ou horário.');
        return;
      }

      const agendamento = {
        data: selectedDate,
        horario: selectedValue,
        servico: selectedValue1,
        userEmail: currentUserEmail,
      };

      const agendamentoJSON = JSON.stringify(agendamento);
      const chaveAgendamento = `${currentUserEmail}-${selectedDate}-${selectedValue}-${selectedValue1}`;
      await AsyncStorage.setItem(chaveAgendamento, agendamentoJSON);
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
      }, 2300);
    } catch (error) {
      console.error('Erro ao salvar o agendamento:', error);
      Alert.alert('Erro', 'Não foi possível salvar o agendamento.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 32, margin: 5 }}>{item.title}</Text>
      <Text style={{ fontSize: 18, margin: 5 }}>Opção de serviço</Text>
      <Picker selectedValue={selectedValue1} style={styles.servico} onValueChange={(itemValue) => setSelectedValue1(itemValue)}>
        {serviceOptions.map((service, index) => (
          <Picker.Item enabled={index !== 0} key={index} label={service.title} value={service.title} />
        ))}
      </Picker>
      
      <Text style={{ fontSize: 18, margin: 5 }}>Escolha o horário</Text>
      <Picker selectedValue={selectedValue} style={styles.picker} onValueChange={(itemValue) => setSelectedValue(itemValue)}>
        <Picker.Item label="12:00" value="12:00" />
        <Picker.Item label="13:00" value="13:00" />
        <Picker.Item label="14:00" value="14:00" />
        <Picker.Item label="15:00" value="15:00" />
        <Picker.Item label="16:00" value="16:00" />
        <Picker.Item label="17:00" value="17:00" />
        <Picker.Item label="18:00" value="18:00" />
        <Picker.Item label="19:00" value="19:00" />
        <Picker.Item label="20:00" value="20:00" />
        <Picker.Item label="21:00" value="21:00" />
      </Picker>

      <Text style={{ fontSize: 18, margin: 5 }}>Escolha um dia</Text>
      <Calendar
        style={styles.calendar}
        onDayPress={onDayPress}
        markedDates={{ [selectedDate]: { selected: true, selectedColor: 'blue' } }}
        minDate={minDate}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Consulta Marcada</Text>
            <Text style={styles.modalText}>Dia {selectedDate} às {selectedValue}</Text>
            <Text>{selectedValue1}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={async () => {
    setModalVisible(false);
  }}>
              <Text style={styles.textStyle}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.button} onPress={handleAgendar}>
        <Text style={{ color: 'white' }}>Agendar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  servico: {
    margin: 10,
    height: 50,
    width: 300,
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#e6e6e6',
  },
  picker: {
    margin: 10,
    height: 50,
    width: 140,
    backgroundColor: '#e6e6e6',
  },
  calendar: {
    borderRadius: 10,
  },
  button: {
    width: 230,
    height: 40,
    backgroundColor: '#723172',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
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

export default Agendamento;
