import React from "react";
import { Image, Text, View } from "react-native";
import { styles } from "./styles";
import { CalendarBlank, Clock, Star } from "phosphor-react-native";

interface MovieDetailsProps {
  movie: {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    runtime: string;
    release_date: string;
    vote_average: number;
  };
}

const CardFavoriteMovies = ({ movie }: MovieDetailsProps) => {
  
  function getYear(data: string) {
    const ano = new Date(data).getFullYear();
    return ano;
  };

  return (
    <View style={styles.container}>
      {/*IMAGEM*/}
      <Image 
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }} 
        style={styles.cardImage}
      />

      {/*INFORMAÇÕES*/}
      <View style={styles.info}>

        <Text style={styles.infoText}>{movie.title}</Text>

        <View style={styles.containerInfo}>
          {/*Estrelas*/}
          <View style={styles.infoDetails}>
            <Star
              color={
                movie?.vote_average.toFixed(2) >= "7"
                  ? "#FF8700"
                  : "#92929D"
              }
              size={16}
              weight={
                movie?.vote_average.toFixed(2) >= "7"
                  ? "duotone"
                  : "thin"
              }
            />
            <Text
              style={[
                movie?.vote_average.toFixed(2) >= "7"
                  ? styles.infoDetailsText1
                  : styles.infoDetailsText,
              ]}
            >
              {movie?.vote_average.toFixed(1)}
            </Text>
          </View>
          {/*ANO*/}
          <View style={styles.infoDetails}>
            <CalendarBlank color="#fff" size={16} />
            <Text style={styles.infoDetailsText}>{getYear(movie.release_date)}</Text>
          </View>
          {/*TEMPO*/}
          <View style={styles.infoDetails}>
            <Clock color="#fff" size={16} />
            <Text style={styles.infoDetailsText}>{movie.runtime} minutos</Text>
          </View>
        </View>

      </View>

    </View>
  );
};

export default CardFavoriteMovies;
