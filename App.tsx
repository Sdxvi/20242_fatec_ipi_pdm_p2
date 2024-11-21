import { useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface Imagem{
  id: string,
  url: string
}

export default function App() {
  const [listaImagens, setListaImagens] = useState<Imagem[]>([])

  const ExibirImagens = () => {
    const ListaFixa: Imagem[] = [
    { id: '1',
     url:'https://cdn2.thecatapi.com/images/4pv.gif'},
     {id: '2',
     url:'https://cdn2.thecatapi.com/images/be6.gif'},
     {id: '3',
     url:'https://cdn2.thecatapi.com/images/bte.jpg'},
    { id: '4',
     url:'https://cdn2.thecatapi.com/images/dlh.jpg'},
    { id: '5',
     url:'https://cdn2.thecatapi.com/images/e3f.jpg'}
  ];
    setListaImagens(ListaFixa)
  }

  return (
    <View style={styles.container}>
    <Pressable style={styles.botoes} onPress={ExibirImagens}>
      <Text style={styles.textoBotoes} > Aperte Para Exibir gatinhos </Text>
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
