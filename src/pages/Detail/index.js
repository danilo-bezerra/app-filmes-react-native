import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  HeaderButton,
  Banner,
  ButtonLink,
  Title,
  ContentArea,
  Rate,
  ListGenres,
  Description,
} from "./styles";

import Stars from "react-native-stars";

import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

import api, { key } from "../../services/api";
import Genres from "../../components/Genres";
import { ScrollView, Modal } from "react-native";
import WebView from "react-native-webview";
import ModalLink from "../../components/ModalLink";

function Detail({ id }) {
  const natigation = useNavigation();
  const route = useRoute();

  const [movie, setMovie] = useState({});
  const [openLink, setOpenLink] = useState(false);

  useEffect(() => {
    let isActive = true;
    const ac = new AbortController();

    async function getMovie() {
      const response = await api
        .get(`/movie/${route.params?.id}`, {
          params: {
            api_key: key,
            language: "pt-BR",
          },
        })
        .catch(() => {
          console.log("erro");
        });

      if (isActive) {
        setMovie(response.data);
      }
    }

    if (isActive) {
      getMovie();
    }

    return () => {
      isActive = false;
      ac.abort();
    };
  }, []);

  return (
    <Container>
      <Header>
        <HeaderButton onPress={() => natigation.goBack()}>
          <Feather name="arrow-left" size={28} color="#fff" />
        </HeaderButton>

        <HeaderButton>
          <Ionicons name="bookmark" size={28} color="#fff" />
        </HeaderButton>
      </Header>

      <Banner
        resizeMethod="resize"
        source={{
          uri: `https://image.tmdb.org/t/p/original${movie?.backdrop_path}`,
        }}
      />

      <ButtonLink onPress={() => setOpenLink(true)}>
        <Feather name="link" size={28} color="#fff" />
      </ButtonLink>

      <Title numberOfLines={2}>{movie.title}</Title>

      <ContentArea>
        <Stars
          default={movie.vote_average}
          count={10}
          half={true}
          starSize={20}
          fullStar={<Ionicons name="md-star" size={24} color="#e7a74e" />}
          emptyStar={
            <Ionicons name="md-star-outline" size={24} color="#e7a74e" />
          }
          halfStar={<Ionicons name="md-star-half" size={24} color="#e7a74e" />}
          disable={true}
        />
        <Rate>{movie.vote_average}/10</Rate>
      </ContentArea>
      <ListGenres
        data={movie?.genres}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Genres data={item} />}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Descrição</Title>

        <Description>{movie?.overview}</Description>
      </ScrollView>

      <Modal animationType="slide" visible={openLink} transparent={true}>
        <ModalLink
          link={movie?.homepage}
          title={movie?.title}
          closeModal={() => setOpenLink(false)}
        />
      </Modal>
    </Container>
  );
}

export default Detail;
