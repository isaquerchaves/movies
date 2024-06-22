import { View, Text, TextInput, FlatList } from "react-native";
import { styles } from "./styles";
import { MagnifyingGlass } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import CardMovies from "../../components/CardMovies";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string
}

export function Home() {
  const [discoveryMovies, setDiscoveryMovies] = useState<Movie[]>([])

  useEffect(() => {
    const loadingMoreData = async () => {
      const response = await api.get("/movie/popular");
      setDiscoveryMovies(response.data.results)
    }

    loadingMoreData();
  }, [])

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
      <Text style={styles.headerText}>O que você quer assistir hoje?</Text>
      <View style={styles.containerInput}>
        <TextInput placeholderTextColor="#FFF" placeholder="Buscar" style={styles.input} />
        <MagnifyingGlass color="#FFf" size={25} weight="light" />
      </View>
      </View>

      <View>
        <FlatList 
          data={discoveryMovies}
          numColumns={3}
          renderItem={ (item) => (
            <CardMovies 
              data={item.item} 
            />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            padding: 35,
            paddingBottom: 100,
          }}
        />
      </View>

    </View>
  )
}