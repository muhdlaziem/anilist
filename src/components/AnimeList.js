/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {
  ImageBackground,
  Dimensions,
  View,
  Alert,
  ScrollView,
} from 'react-native';
import {
  Layout,
  Text,
  List,
  Card,
  StyleService,
  useStyleSheet,
  Input,
  Spinner,
} from '@ui-kitten/components';

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
      }
    }
  }
`;

const AnimeList = (props) => {
  const {loading, error, data} = useQuery(GET_ANIME);
  const [anime, setAnime] = useState(null);
  const [search, setSearch] = useState('');
  const styles = useStyleSheet(themedStyles);

  useEffect(() => {
    setAnime(data);
    // console.log(data.Page.media.length);
  }, [data]);

  if (loading || !anime) {
    return (
      <View style={styles.loadContainer}>
        <Spinner />
      </View>
    );
  }
  if (error) {
    return (
      <Layout>
        <Text>Error: :(</Text>
      </Layout>
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
  const renderProductItem = ({item}) =>
    item.title.userPreferred.toLowerCase().includes(search.toLowerCase()) ? (
      <Card
        key={item.id}
        style={styles.productItem}
        header={() => renderItemHeader(item.coverImage.large)}
        // footer={() => renderItemFooter(item)}
        onPress={() => {
          // eslint-disable-next-line no-alert
          Alert.alert(
            'Information',
            `Popularity: ${item.popularity}\nAverage Score: ${item.averageScore}\nOther Names:\n\t\t\tRomaji: ${item.title.romaji}\n\t\t\tEnglish: ${item.title.english}\n\t\t\tNative: ${item.title.native}`,

            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
        }}>
        <Text category="s1">{item.title.userPreferred}</Text>
        <Text appearance="hint" category="c1">
          {item.type}
        </Text>
      </Card>
    ) : null;

  return (
    <View>
      <Input
        placeholder="Search By Name"
        value={search}
        onChangeText={(nextValue) => setSearch(nextValue)}
        // style={{position: 'absolute', top: 0, left: 0}}
      />
      <View style={{flexDirection: 'row', flex: 1, flexWrap: 'wrap'}}>
        <List
          data={anime.Page.media}
          style={styles.container}
          contentContainerStyle={styles.productList}
          numColumns={2}
          renderItem={renderProductItem}
        />
      </View>
    </View>
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
