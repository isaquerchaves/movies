import React, { useContext, useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { MovieContext } from "../../contexts/MoviesContext";
import { api } from "../../services/api";
import { CaretLeft } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import CardFavoriteMovies from "../../components/CardFavoriteMovies";

type MovieDetails = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  runtime: string;
  release_date: string;
  vote_average: number;
};

const MyList = () => {
  const { favoriteMovies } = useContext(MovieContext);
  const [ listFavoriteMovies, setListFavoriteMovies] = useState<MovieDetails[]>([]);
  const navigation = useNavigation();

  useEffect (() => {
    const fetchMovieFavorite = async () => {
      try {
        const moviesData = await Promise.all(
          favoriteMovies.map( async (movieId) => {
            const response = await api.get(`/movie/${movieId}`);
            return response.data;
          })
        );
        setListFavoriteMovies(moviesData)
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovieFavorite();
  }, [favoriteMovies]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <CaretLeft color="#fff" size={32} weight="thin" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Favoritos</Text>
        <View></View>
      </View>

      <FlatList 
        data={listFavoriteMovies}
        renderItem={({item}) => (
          <CardFavoriteMovies movie={item} />
        )}
      />
    </View>
  );
};

export default MyList;