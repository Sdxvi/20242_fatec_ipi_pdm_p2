import { useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

interface Imagem{
  id: string,
  url: string
}



export default function App() {
  const [listaImagens, setListaImagens] = useState<Imagem[]>([])

  const BuscarImagens = () => {
    axios.get('https://api.thecatapi.com/v1/images/search?limit=10')
    .then(res => {
      setListaImagens(res.data.slice(0,5))
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <View style={styles.container}>
    <Pressable style={styles.botoes} onPress={BuscarImagens}>
      <Text style={styles.textoBotoes} > Aperte para exibir gatinhos </Text>
    </Pressable>
      <FlatList
        keyExtractor={ item => (item.id)!}
        data={listaImagens}
        renderItem={img => (
          <View style={styles.container}>
            <Image style={styles.imagens} source={{uri: img.item.url}} />
          </View>
          )  
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4
  },
  botoes: {
    width: '50%', 
    backgroundColor: 'black', 
    padding: 12, 
    borderRadius: 4,
  },
  textoBotoes: {
    color: 'white',
    textAlign: 'center'
  },
  imagens: {
    width: 350,
    height: 350
  }
});
