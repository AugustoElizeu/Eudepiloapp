import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';

function Agendamento() {
  const [selectedValue, setSelectedValue] = useState("java");

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  // Função para lidar com a alteração da data
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const today = new Date();
  const minDate = today.toISOString().split('T')[0]; // Formato yyyy-MM-dd
  const minTime = new Date(today.setHours(0, 0, 0));  // 12 AM
  const maxTime = new Date(today.setHours(21, 0, 0)); // 9 PM

  return (
    <View style={styles.container}>
      <Text style={{fontSize:32, margin:5}}>Placeholder</Text>
      <Text style={{fontSize:18, margin:5}}>Opção de serviço</Text>
      <Picker selectedValue={selectedValue} style={styles.servico} onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
        <Picker.Item label="Depilação de orelha" value="Depilação de orelha" />
        <Picker.Item label="Depilação de Axila" value="Depilação de Axila" />
        <Picker.Item label="Depilação de perna" value="Depilação de perna" />
      </Picker>
      
      <Text style={{fontSize:18, margin:5}}>Escolha o horário</Text>
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

      <Text style={{fontSize:18, margin:15}}>Escolha um dia</Text>
      <Calendar
        style={styles.calendar}
        onDayPress={onDayPress}
        markedDates={{ [selectedDate]: { selected: true, selectedColor: 'blue' } }}
        minDate={minDate}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },titulo:{
    fontSize:24,

  },
  servico:{
    margin:10,
    height: 50,
    width: 300,
    alignItems:'center',
    alignContent: 'center',
    backgroundColor:'#e6e6e6',
  },
  picker: {
    margin:10,
    height: 50,
    width: 120,
    backgroundColor: '#e6e6e6',
  },
  selectedValue: {
    marginTop: 20,
    fontSize: 18,
  },calendar:{
    borderRadius:10,
  }
});

export default Agendamento;