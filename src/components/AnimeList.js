/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {
  ImageBackground,
  Dimensions,
  View,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {
  Text,
  List,
  Card,
  StyleService,
  useStyleSheet,
  Input,
  Spinner,
} from '@ui-kitten/components';

import Loading from './ActivityIndicator';
const GET_ANIME = gql`
  {
    Page {
      media(sort: POPULARITY_DESC) {
        coverImage {
          large
          color
        }
        title {
          romaji
          english
          native
          userPreferred
        }
        type
        popularity
        averageScore
        id
        characters(sort: FAVOURITES_DESC) {
          nodes {
            image {
              large
            }
            name {
              full
            }
          }
        }
      }
    }
  }
`;

const AnimeList = ({navigation}) => {
  const {loading, error, data} = useQuery(GET_ANIME);
  const [anime, setAnime] = useState();
  const [search, setSearch] = useState('');
  const [load, setLoad] = useState(false);
  const styles = useStyleSheet(themedStyles);

  useEffect(() => {
    if (data) {
      setAnime(data.Page.media);
    }
    // console.log(data.Page.media.length);
  }, [data]);

  useEffect(() => {
    setLoad(true);
    let arr = [];
    if (data) {
      data.Page.media.map((item) => {
        if (
          item.title.userPreferred.toLowerCase().includes(search.toLowerCase())
        ) {
          arr.push(item);
        }
      });
      setAnime(arr);
    }
    setLoad(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  if (loading) {
    return (
      <View style={styles.loadContainer}>
        <Spinner />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.loadContainer}>
        <Text>Couldnt Load Data :(</Text>
      </View>
    );
  }

  //   return anime.Page.media.map((item) => (
  //     <Layout>
  //       <Layout key={item.id}>
  //         <Text>{item.id}</Text>
  //         <Text>{item.coverImage.extraLarge}</Text>
  //         <Text>{item.coverImage.color}</Text>
  //         <Text>{item.title.userPreferred}</Text>
  //         <Text>{item.type}</Text>
  //         <Text>{item.popularity}</Text>
  //         <Text>{item.averageScore}</Text>
  //       </Layout>
  //       <Layout style={{height: 30}} />
  //     </Layout>
  //   ));
  const renderItemHeader = (item) => (
    <ImageBackground style={styles.itemHeader} source={{uri: item}} />
  );

  // const renderItemFooter = (item) => (
  //   <View style={styles.itemFooter}>
  //     <Text category="s1" style={{padding: 5, textAlign: 'center'}}>
  //       Polularity: {item.popularity}
  //     </Text>
  //   </View>
  // );
  const renderProductItem = ({item}) => (
    <Card
      key={item.id}
      style={styles.productItem}
      header={() => renderItemHeader(item.coverImage.large)}
      // footer={() => renderItemFooter(item)}
      onPress={() => {
        navigation.navigate('Characters & Informations', {
          data: item,
        });
      }}>
      <Text category="s1">{item.title.userPreferred}</Text>
      <Text appearance="hint" category="c1">
        {item.type}
      </Text>
    </Card>
  );

  return (
    <SafeAreaView>
      <Loading load={load} />
      <View style={{flex: 1, margin: 10}}>
        <Input
          placeholder="Search By Name"
          value={search}
          onChangeText={(nextValue) => setSearch(nextValue)}
          // style={{position: 'absolute', top: 0, left: 0}}
        />
      </View>
      <View style={{height: 30, margin: 2}} />
      <ScrollView>
        <View style={{flex: 1, margin: 10}}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
            {anime ? (
              anime.length !== 0 ? (
                <List
                  data={anime}
                  style={styles.container}
                  contentContainerStyle={styles.productList}
                  numColumns={2}
                  renderItem={renderProductItem}
                />
              ) : (
                <Text>No Such That !</Text>
              )
            ) : (
              <View style={styles.loadContainer}>
                <Spinner />
              </View>
            )}
          </View>
        </View>
        <View style={{height: 30}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-2',
    // flexDirection: '',
  },
  productList: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  productItem: {
    flex: 1,
    margin: 8,
    maxWidth: Dimensions.get('window').width / 2 - 24,
    backgroundColor: 'background-basic-color-1',
  },
  itemHeader: {
    height: 140,
    // width: Dimensions.get('window').width / 2 - 24,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    paddingHorizontal: 0,
  },
  loadContainer: {
    flex: 1,
    padding: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default AnimeList;
