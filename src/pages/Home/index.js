import React from "react";
import { ScrollView, ActivityIndicator } from "react-native";

import {
  Container,
  SearchContainer,
  SearchButton,
  Input,
  Title,
  BannerButton,
  Banner,
  SliderMovie,
} from "./styles";

import Header from "../../components/Header";
import SliderItem from "../../components/SliderItem";

import { Feather } from "@expo/vector-icons";

import api, { key } from "../../services/api";

import { getListMovies, randomBanner } from "../../utils/movie";
import { useNavigation } from "@react-navigation/native";

function Home() {
  const [nowMovies, setNowMovies] = React.useState([]);
  const [popularMovies, setPopularMovies] = React.useState([]);
  const [topMovies, setTopMovies] = React.useState([]);
  const [bannerMovie, setBannerMovie] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);

  const navigation = useNavigation();

  React.useEffect(() => {
    let isActive = true;
    const ac = new AbortController();

    async function getMovies() {
      const [nowData, popularData, topData] = await Promise.all([
        api.get("/movie/now_playing", {
          params: {
            api_key: key,
            language: "pt-BR",
            page: 1,
          },
        }),
        api.get("/movie/upcoming", {
          params: {
            api_key: key,
            language: "pt-BR",
            page: 1,
          },
        }),
        api.get("/movie/top_rated", {
          params: {
            api_key: key,
            language: "pt-BR",
            page: 1,
          },
        }),
      ]);

      if (isActive) {
        const nowList = getListMovies(10, nowData.data.results);
        const popularList = getListMovies(5, popularData.data.results);
        const topList = getListMovies(5, topData.data.results);

        setBannerMovie(
          nowData.data.results[randomBanner(nowData.data.results)]
        );

        setNowMovies(nowList);
        setPopularMovies(popularList);
        setTopMovies(topList);

        setIsLoading(false);
      }
    }

    getMovies();

    return () => {
      isActive = false;
      ac.abort();
    };
  }, []);

  function natigationDetailPage(item) {
    navigation.navigate("Detail", { id: item.id });
  }

  if (isLoading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="#fff" />
      </Container>
    );
  }

  return (
    <Container>
      <Header title="React Prime" />

      <SearchContainer>
        <Input placeholder="Ex vingadores" placeholderTextColor="#ddd" />
        <SearchButton>
          <Feather name="search" size={30} color="#fff" />
        </SearchButton>
      </SearchContainer>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Em cartaz</Title>

        <BannerButton
          activeOpacity={0.9}
          onPress={() => natigationDetailPage(bannerMovie)}
        >
          <Banner
            resizeMethod="resize"
            source={{
              uri: `https://image.tmdb.org/t/p/original${bannerMovie.backdrop_path}`,
            }}
          />
        </BannerButton>

        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={nowMovies}
          renderItem={({ item }) => (
            <SliderItem
              data={item}
              navigatePage={() => natigationDetailPage(item)}
            />
          )}
          keyExtractor={(item) => String(item.id)}
        />

        <Title>Em breve</Title>

        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={popularMovies}
          renderItem={({ item }) => (
            <SliderItem
              data={item}
              navigatePage={() => natigationDetailPage(item)}
            />
          )}
          keyExtractor={(item) => String(item.id)}
        />

        <Title>Mais Votados</Title>

        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={topMovies}
          renderItem={({ item }) => (
            <SliderItem
              data={item}
              navigatePage={() => natigationDetailPage(item)}
            />
          )}
          keyExtractor={(item) => String(item.id)}
        />
      </ScrollView>
    </Container>
  );
}

export default Home;
