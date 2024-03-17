import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native';
import { ImageBackground } from 'react-native';
export default function App() {
  const handleSignup = () => {
    // Lógica para navegar para a tela de cadastro
  };

  return (
    <ImageBackground source={require('./imgs/fundo.jpg')} style={styles.background}>
    
     <View style={styles.container}>
      <Image style={styles.imgConf} source={require('./imgs/download.png')}/>
      
      <View style={{marginBottom:20,width:270,justifyContent:'center',alignItems: 'center'}}>
      <TouchableOpacity style={styles.button} onPress={() => console.log('Botão pressionado')}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      </View>

      <View style={styles.lineStr}>
        <Text style={{marginRight:5}}>Não possui conta?</Text>
        <TouchableOpacity onPress={handleSignup}>
          <Text style={{ color: 'blue' }}>Clique aqui e cadastre-se</Text>
         </TouchableOpacity>
      </View>
      <View style={styles.footerx}>
        <Text style={{color: 'white'}}>Trabalho realizado pela turma de desenvolviment mobile</Text>
        <Text style={{color: 'white'}}>Augusto Elizeu,Ramon e Tamires - Abril/2024</Text>
      </View>
      <StatusBar style="auto" />
     </View>
     </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lineStr:{
    flexDirection:'row',
    marginBottom:10,
  },
  imgConf:{
    width: 200,
    height: 200,
    backgroundColor: 'lightblue',
    borderRadius: 50, // Aqui você define o raio da borda
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:100,
  },
  button:{
    width: 200, // Defina a largura do botão aqui
    height: 40, // Defina a altura do botão aqui
    backgroundColor: '#723172', // Cor de fundo do botão
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, // Borda arredondada
  },
  buttonText: {
    color: 'white', // Cor do texto do botão
    fontSize: 18, // Tamanho do texto do botão
  },
  footerx:{
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#723172',
    padding: 10,
    alignItems: 'center',
  }
});
