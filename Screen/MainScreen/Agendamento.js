import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

function Agendamento() {
  const [selectedValue, setSelectedValue] = useState("12:00");
  const [selectedValue1, setSelectedValue1] = useState("Depilação de orelha");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const today = new Date();
  const minDate = today.toISOString().split('T')[0]; // Formato yyyy-MM-dd
  const minTime = new Date();
  minTime.setHours(12, 0, 0); // 12 PM
  const maxTime = new Date();
  maxTime.setHours(21, 0, 0); // 9 PM

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    const hours = currentDate.getHours();
    if (hours < 12 || hours > 21) {
      return;
    }
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 32, margin: 5 }}>Placeholder</Text>
      <Text style={{ fontSize: 18, margin: 5 }}>Opção de serviço</Text>
      <Picker selectedValue={selectedValue1} style={styles.servico} onValueChange={(itemValue, itemIndex) => setSelectedValue1(itemValue)}>
        <Picker.Item label="Depilação de orelha" value="Depilação de orelha" />
        <Picker.Item label="Depilação de Axila" value="Depilação de Axila" />
        <Picker.Item label="Depilação de perna" value="Depilação de perna" />
      </Picker>
      
      <Text style={{ fontSize: 18, margin: 5 }}>Escolha o horário</Text>
      <Picker selectedValue={selectedValue} style={styles.picker} onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
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
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Consulta Marcada</Text>
            <Text style={styles.modalText}>Dia {formatDate(selectedDate)} às {selectedValue}</Text>
            <Text>{selectedValue1}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(!modalVisible)}>
          <Text style={{ color: 'white' }}>Agendar</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="time"
          display="default"
          onChange={handleDateChange}
          minimumDate={minTime}
          maximumDate={maxTime}
        />
      )}
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
    width: 120,
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
    top: '50%',
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
});

export default Agendamento;