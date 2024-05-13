import * as React from 'react';
import { StyleSheet,FlatList, Text, View, Image,TouchableOpacity }  from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';


const data = [
  {
   title: "Depilação",
   image:  "https://www.icosmetologia.com.br/Arquivos/Noticia/noticia-114615.jpg",
  },
  {
    title: "Sobrancelha",
    image:  "https://browbar.com.br/wp-content/uploads/2021/08/TOM07922-1024x683.jpg",
   },
   {
    title: "Estética Facial",
    image:  "https://maisbemestar.com.br/wp-content/uploads/2018/01/estetica-facil-saude-rosto.jpg",
   },
   {
    title: "Cabelo",
    image:  "https://salaovirtual.org/wp-content/uploads/2022/02/lavando-madeixas.jpg",
   },
   {
    title: "Outros",
    image:  "https://www.unicesumar.edu.br/blog/wp-content/uploads/2018/12/estetica-e-cosmetica.jpg",
   },
   {
    title: "",
    image:  "hhttps://htmlcolorcodes.com/assets/images/colors/light-gray-color-solid-background-1920x1080.png",
   }
];

const datas = [
  {
    Data: "10/10/2024",
    Horário: "10:30",
    Serviço: "Depilação de perna",
  }
]

const openChannel = () => {
    Linking.openURL('https://www.youtube.com/c/NOME_DO_CANAL');
};

const renderDatas = ({ item }) => (
  <View>
    <TouchableOpacity  onPress={() => openChannel}>
      <View style={{flexDirection:'row',}}>
        <Text>{item.Serviço} |</Text>
        <Text> {item.Horário} | </Text>
        <Text> {item.Data}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const renderItem = ({ item }) => (
  <View style={styles.item}>
    <TouchableOpacity  onPress={() => openChannel}>
      <Image source={{ uri: item.image }} style={styles.banner2} />
      <Text style={styles.subtitle}>{item.title}</Text>
    </TouchableOpacity>
  </View>
);

const Tab = createBottomTabNavigator();

function MainScreen() {
  return (
    <View style={styles.container}>
      <Text style={{marginTop:60, fontSize:30,fontFamily: 'Roboto',  margin: 21}}>Avisos</Text>
      <Image style={styles.banner1} source={{uri:"https://www.sindimetal.com.br/wp-content/uploads/2016/05/feriado-Corpus-Christi.jpg"}}></Image>
      <Text style={styles.servico}>Serviços</Text>
      <FlatList
       data={data}
       renderItem={renderItem}
       keyExtractor={(item, index) => index.toString()}
       numColumns={2}
      />
  </View>
  );
}

function ProfileScreen(){
  return (
    <View style={styles.profileScreen}>
      <View style={styles.userData}>
        <Image style={styles.profilePicture} source={{uri:"https://avatarfiles.alphacoders.com/359/359671.jpeg"}}/>
        <View style={{top:20,}}>
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

export default function App() {
  return (
   <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'user' : 'user';
            }

            // You can return any component that you like here!
            return <FontAwesome name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'purple',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={MainScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
 banner1:{
    width:350,
    height:150,
    borderRadius:10,
  },
  banner2:{
    width:170,
    height:100,
    marginLeft:10,
    borderRadius:10,
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
  servico:{
    textAlign: 'right',
    alignItems: 'flex-start',
    margin: 10,
    fontSize: 24,
    fontFamily: 'Roboto',
  },
  profilePicture:{
    width:80,
    height:80,
    borderRadius:100,
    left:5,
    margin:20,
    marginRight: 20,
    marginTop:5,
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
