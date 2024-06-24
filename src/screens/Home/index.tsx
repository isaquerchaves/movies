import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { styles } from "./styles";
import { MagnifyingGlass } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import CardMovies from "../../components/CardMovies";
import { useNavigation } from "@react-navigation/native";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

export function Home() {
  const [discoveryMovies, setDiscoveryMovies] = useState<Movie[]>([]);
  const [searchResultMovies, setSearchResultMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [search, setSearch] = useState("");

  // Busca todos os filmes na API
  useEffect(() => {
    loadMoreData();
  }, []);

  const loadMoreData = async () => {
    if (loading || (totalPages > 0 && page > totalPages)) return; // Evita múltiplas chamadas simultâneas e para na última página

    setLoading(true);
    try {
      const response = await api.get("/movie/popular", {
        params: { page },
      });
      setDiscoveryMovies((prevMovies) => [...prevMovies, ...response.data.results]);
      setPage((prevPage) => prevPage + 1);
      setTotalPages(response.data.total_pages); // Armazena o número total de páginas
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  // Busca filmes digitados no INPUT
  const searcheMovies = async (query: string) => {
    setLoading(true);
    const response = await api.get("/search/movie", {
      params: {
        query,
      },
    });

    if (response.data.results.length === 0) {
      setNoResult(true);
      setLoading(false);
      setSearchResultMovies([])
    } else {
      setNoResult(false);
      setSearchResultMovies(response.data.results);
      setLoading(false);
    }
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text.length > 2) {
      searcheMovies(text);
    } else {
      setSearchResultMovies([]);
    }
  };

  const navigation = useNavigation();

  const renderMovieItem = ({item}: {item: Movie}) => (
    <CardMovies data={item} onPress={() => navigation.navigate("Details", {movieId: item.id}) } />
  );

  const movieData = search.length > 2 ? searchResultMovies : discoveryMovies;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>O que você quer assistir hoje?</Text>
        <View style={styles.containerInput}>
          <TextInput
            placeholderTextColor="#FFF"
            placeholder="Buscar"
            style={styles.input}
            value={search}
            onChangeText={handleSearch}
          />
          <MagnifyingGlass color="#FFf" size={25} weight="light" />
        </View>

        {noResult && (
          <Text style={styles.noResult}>
            Nenhum filme encontrado para "{search}"
          </Text>
        )}
      </View>

      <View>
        <FlatList
          data={movieData}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          renderItem={renderMovieItem}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            padding: 35,
            paddingBottom: 100,
          }}
          onEndReached={() => loadMoreData()} // Carrega nova página de filmes
          onEndReachedThreshold={0.5} // Carrega nova página de filmes que chegar na metade da lista
        />

        {loading && <ActivityIndicator size={50} color="#0296e5" />}
      </View>
    </View>
  );
}
