import { useState } from 'react';
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';

interface Imagem{
  id: string,
  url: string,
  fav: boolean
}



export default function App() {
  const [listaImagens, setListaImagens] = useState<Imagem[]>([])
  const [listaFavoritos, setListaFavoritos] = useState<Imagem[]>([])

  const BuscarImagens = () => {
    axios.get('https://api.thecatapi.com/v1/images/search?limit=10')
    .then(res => {
      setListaImagens(res.data.slice(0,5))
    })
    .catch(err => {
      console.log(err)
    })
  }

  const RemoverFavorito = (id:string) => {
    const imgFav = listaFavoritos.find(fav => fav.id === id)
    imgFav!.fav = false
    setListaFavoritos(listaFavoritos.filter(lista => lista.id !== id))
  }

  const FavoritarImagem = (id:string) => {
    const img = listaImagens.find(fav => fav.id === id)
    if(img!.fav === false || img!.fav == undefined){
      img!.fav = true
      setListaFavoritos([...listaFavoritos, img!])
    }
    else{
      RemoverFavorito(img!.id)
    }
  }



  return (
    <ScrollView>
      <View style={styles.container}>
        <Pressable style={styles.botoes} onPress={BuscarImagens}>
          <Text style={styles.textoBotoes} > Aperte para exibir fotos de gatos </Text>
        </Pressable>
          <FlatList
          style={styles.listaGatos}
            keyExtractor={ item => (item.id)!}
            data={listaImagens}
            renderItem={img => (
              <View style={styles.container}>
                <Pressable style={styles.favoritar} onPress={() => FavoritarImagem(img.item.id)}>
                  <Text> Favoritar Imagem: </Text>
                  <Ionicons name={img.item.fav ? "paw" : "paw-outline"} size={24} color="yellow" />
                </Pressable>
                <Image style={styles.imagens} source={{uri: img.item.url}}/> 
              </View>
              )  
            }
          />
          <Text style={styles.titulo} > Lista de Favoritos </Text>
          <FlatList
            keyExtractor={ item => (item.id)!}
            style={styles.listaFavoritos}
            data={listaFavoritos}
            ListEmptyComponent={
              <Text>Que pena, parece que sua Lista de Favoritos está vazia...</Text>
            }
            renderItem={img => (
              <View style={styles.container}>
                <Pressable style={styles.favoritar} onPress={() => RemoverFavorito(img.item.id)}>
                  <Text> Remover dos Favoritos: </Text>
                  <Ionicons name="trash-outline" size={24} color="red" />
                </Pressable>
                <Image style={styles.imagens} source={{uri: img.item.url}}/> 
              </View>
              )  
            }
          />
      </View>
    </ScrollView>
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
    marginBottom: 8
  },
  textoBotoes: {
    color: 'white',
    textAlign: 'center'
  },
  imagens: {
    width: 350,
    height: 350
  },
  listaGatos: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5
  },
  listaFavoritos: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5
  },
  titulo:{
    borderColor: 'black',
    fontSize: 20
  },
  favoritar: {
    flexDirection: 'row'
  }
});
