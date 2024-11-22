import { useState } from 'react';
import { FlatList, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
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
          <Image source={require('./assets/topoGato.png')}/>
          <Pressable style={styles.botoes} onPress={BuscarImagens}>
            <Text style={styles.botoesText} > Aperte para exibir fotos de gatos </Text>
          </Pressable>
            <FlatList
              keyExtractor={ item => (item.id)!}
              data={listaImagens}
              renderItem={img => (
                <View style={styles.container}>
                  <Pressable style={styles.favoritar} onPress={() => FavoritarImagem(img.item.id)}>
                    <Text style={styles.textos}> Favoritar Imagem: </Text>
                    <Ionicons name={img.item.fav ? "paw" : "paw-outline"} size={24} color="yellow" />
                  </Pressable>
                  <ImageBackground style={styles.imagens} source={{uri: img.item.url}}>
                    <Image style={styles.moldura} source={require('./assets/gatinhosMoldura.png')}  resizeMode="cover"/> 
                  </ImageBackground>
                </View>
                )  
              }
            />
            { listaFavoritos.length > 0?
              <View style={{alignItems: 'center', justifyContent: 'center'}}>   
                <View style={styles.favoritar}>
                  <Text style={styles.titulo} > Lista de Favoritos </Text>
                  <Image source={require('./assets/gatoFavoritos.png')}/>
                </View>
                <FlatList
                  keyExtractor={ item => (item.id)!}
                  style={styles.listaFavoritos}
                  data={listaFavoritos}
                  renderItem={img => (
                    <View style={styles.container}>
                      <Pressable style={styles.favoritar} onPress={() => RemoverFavorito(img.item.id)}>
                        <Text style={styles.textos}> Remover dos Favoritos: </Text>
                        <Ionicons name="trash-outline" size={24} color="red" />
                      </Pressable>
                      <Image style={styles.imagens} source={{uri: img.item.url}}/> 
                    </View>
                    )  
                  }
                />
              </View>
              :
              <Text style={styles.textos}>Ao favoritar uma imagem, sua lista de favoritos será gerada aqui!</Text>
            }
              
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4
  },
  botoes: {
    width: 370, 
    backgroundColor: 'black', 
    padding: 12, 
    borderRadius: 10,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: -1, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    borderWidth: 2,
    borderColor: 'gray',
  },
  botoesText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  moldura:{
    width:350,
    height:350
  },
  imagens: {
    width: 350,
    height: 350,
    marginBottom: 5
  },
  listaFavoritos: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5
  },
  textos:{
    fontFamily: 'cursive',
    textAlign: 'center'
  },
  titulo: {
    fontFamily: 'Roboto',
    fontSize: 24,
    fontWeight: 'bold',
    borderColor: 'black',
    textAlign: 'center',
    marginTop:20,
    marginBottom: 10,
  },
  favoritar: {
    flexDirection: 'row'
  }
});
