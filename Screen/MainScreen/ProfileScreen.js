import React from 'react';
import { View, Text, StyleSheet, FlatList,Image,TouchableOpacity } from 'react-native';

const renderDatas = ({ item }) => (
  <View>
    <TouchableOpacity  onPress={() => openChannel}>
      <View style={{flexDirection:'row',}}>
        <Text>{item.Servico} |</Text>
        <Text> {item.Horario} | </Text>
        <Text> {item.Data}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

function ProfileScreen(){
  const datas = [
  {
    Data: "10/10/2024",
    Horario: "10:30",
    Servico: "Depilação de perna",
  },
  ];
  return (
    <View style={styles.profileScreen}>
      <View style={styles.userData}>
        <Image style={styles.profilePicture} source={{uri:"https://avatarfiles.alphacoders.com/359/359671.jpeg"}}/>
        <View style={{top:60,}}>
          <Text>Nome do usuario.: pedro </Text>
          <Text>Email.: Pudim@gmail.com </Text>
          <Text>Telefone.: (21) 98637-4120</Text>
        </View>
      </View>
      <View style={{backgroundColor:'#f4f4f4', padding:10, alignItems:'center',justifyContent:'center',borderRadius:20,height:500}}>
        <Text style={{fontSize:32,margin:10,color:'purple',}}>Serviços marcados</Text>
        <FlatList data={datas} renderItem={renderDatas} keyExtractor={(item, index) => index.toString()} numColumns={1}/>
      </View>
    </View>
  )

}

export default ProfileScreen

const styles = StyleSheet.create({
 
  profilePicture:{
    width:80,
    height:80,
    borderRadius:100,
    left:5,
    margin:20,
    marginRight: 20,
    marginTop:50,
  },userData:{
    right:80,
    marginLeft: 50,
    marginTop:5,
    flexDirection: 'row',
  },profileScreen:{
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  }
});