import React from 'react';
import { StyleSheet, FlatList, Text, View, Image, TouchableOpacity } from 'react-native';

const data = [
  {
    title: "Depilação",
    image: "https://www.icosmetologia.com.br/Arquivos/Noticia/noticia-114615.jpg",
  },
  {
    title: "Sobrancelha",
    image: "https://browbar.com.br/wp-content/uploads/2021/08/TOM07922-1024x683.jpg",
  },
  {
    title: "Estética Facial",
    image: "https://maisbemestar.com.br/wp-content/uploads/2018/01/estetica-facil-saude-rosto.jpg",
  },
  {
    title: "Cabelo",
    image: "https://salaovirtual.org/wp-content/uploads/2022/02/lavando-madeixas.jpg",
  },
  {
    title: "Outros",
    image: "https://www.unicesumar.edu.br/blog/wp-content/uploads/2018/12/estetica-e-cosmetica.jpg",
  },
];

const RenderItem = ({ item, navigation }) => (
  <View style={styles.item}>
    <TouchableOpacity onPress={() => navigation.navigate('Agendamento')}>
      <Image source={{ uri: item.image }} style={styles.banner2} />
      <Text style={styles.subtitle}>{item.title}</Text>
    </TouchableOpacity>
  </View>
);

function MainHud({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={{ marginTop: 60, fontSize: 30, fontFamily: 'Roboto', margin: 21 }}>Avisos</Text>
      <Image style={styles.banner1} source={{ uri: "https://www.sindimetal.com.br/wp-content/uploads/2016/05/feriado-Corpus-Christi.jpg" }} />
      <Text style={styles.servico}>Serviços</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => <RenderItem item={item} navigation={navigation} />}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
    </View>
  );
}
export default MainHud;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner1: {
    width: 350,
    height: 150,
    borderRadius: 10,
  },
  banner2: {
    width: 170,
    height: 100,
    marginLeft: 10,
    borderRadius: 10,
  },
  item: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 5,
  },
  servico: {
    textAlign: 'right',
    alignItems: 'flex-start',
    margin: 10,
    fontSize: 24,
    fontFamily: 'Roboto',
  },
});
