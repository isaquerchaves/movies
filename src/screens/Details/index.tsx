import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";
import { api } from "../../services/api";
import { styles } from "./styles";
import {
  BookmarkSimple,
  CalendarBlank,
  CaretLeft,
  Clock,
  Star,
} from "phosphor-react-native";
import { MovieContext } from "../../contexts/MoviesContext";

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

type RouterProps = {
  movieId: number;
};

const Details = () => {
  //criar estado movieDetails
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const { movieId } = route.params as RouterProps;
  const navigation = useNavigation();

  const { addFavoriteMovies } = useContext(MovieContext);

  //criar useEffect de buscar o movie
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/movie/${movieId}`);
        setMovieDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  function getYear(data: string) {
    const ano = new Date(data).getFullYear();
    return ano;
  };

  const handleAddFavorite = () => {
    if (movieDetails) {
      addFavoriteMovies(Number(movieDetails.id));
    }
  };;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <CaretLeft color="#fff" size={32} weight="thin" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Detalhes</Text>
        <TouchableOpacity onPress={handleAddFavorite}>
          <BookmarkSimple color="#fff" size={32} weight="thin" />
        </TouchableOpacity>
      </View>

      {loading === true ? <ActivityIndicator size="large" color="#fff" /> : <>
        <View>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movieDetails?.backdrop_path}`,
          }}
          style={styles.detailsImage}
        />
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`,
          }}
          style={styles.detailsPosterImage}
        />
        <Text style={styles.titleMovie}>{movieDetails?.title}</Text>
        <View style={styles.description}>
          <View style={styles.descriptionGroup}>
            <CalendarBlank color="#92929D" size={25} weight="thin" />
            <Text style={styles.descriptionText}>
              {getYear(movieDetails?.release_date)}
            </Text>
          </View>
          <View style={styles.descriptionGroup}>
            <Clock color="#92929D" size={25} weight="thin" />
            <Text
              style={styles.descriptionText}
            >{`${movieDetails?.runtime} minutos`}</Text>
          </View>
          <View style={styles.descriptionGroup}>
            <Star
              color={
                movieDetails?.vote_average.toFixed(2) >= "7"
                  ? "#FF8700"
                  : "#92929D"
              }
              size={25}
              weight={
                movieDetails?.vote_average.toFixed(2) >= "7"
                  ? "duotone"
                  : "thin"
              }
            />
            <Text
              style={[
                movieDetails?.vote_average.toFixed(2) >= "7"
                  ? styles.descriptionText1
                  : styles.descriptionText,
              ]}
            >
              {movieDetails?.vote_average.toFixed(1)}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.about}>
        <Text style={styles.aboutText}>Sinopse</Text>
        <Text style={styles.aboutText}>
          {movieDetails?.overview === ""
            ? "Ops! Parece que esse filme ainda não tem sinopse :-("
            : movieDetails?.overview}
        </Text>
      </View>
      </>}
    </View>
  );
}

export default Details;
