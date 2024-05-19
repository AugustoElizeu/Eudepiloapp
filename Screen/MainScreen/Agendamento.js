import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from 'react-native-calendars';

function Agendamento() {
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

  return (
    <View style={styles.container}>
      <Text>Serviço Nome</Text>
      <Text>Opção de serviço</Text>



      <Text>Escolha um dia</Text>
      <Calendar
        onDayPress={onDayPress}
        markedDates={{ [selectedDate]: { selected: true, selectedColor: 'blue' } }}
        minDate={minDate}
      />
      <Text>Escolha uma hora</Text>
      <Button onPress={() => setShowDatePicker(true)} title="Escolha a hora" />
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="time"
          display="default"
          onChange={onChangeDate}
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
});

export default Agendamento;