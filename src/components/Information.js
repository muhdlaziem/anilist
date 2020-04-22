/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  ImageBackground,
  Dimensions,
  View,
  Alert,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  List,
  Card,
  StyleService,
  useStyleSheet,
  Input,
  Icon,
  Button,
} from '@ui-kitten/components';

const AnimeList = ({route, navigation}) => {
  const styles = useStyleSheet(themedStyles);
  const {data} = route.params;
  const [search, setSearch] = React.useState('');

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
    item.name.full.toLowerCase().includes(search.toLowerCase()) ? (
      <Card
        // key={item.id}
        style={styles.productItem}
        header={() => renderItemHeader(item.image.large)}>
        <Text category="s1">{item.name.full}</Text>
        {/* <Text appearance="hint" category="c1">
          {item.type}
        </Text> */}
      </Card>
    ) : null;

  return (
    <SafeAreaView>
      <View style={{flex: 1, margin: 10, flexDirection: 'row'}}>
        <Input
          placeholder="Search By Character's Name"
          value={search}
          onChangeText={(nextValue) => setSearch(nextValue)}
          style={{width: '69%'}}
        />
        <Button
          onPress={() => {
            Alert.alert(
              `${data.title.userPreferred}`,
              `Popularity: ${data.popularity}\nAverage Score: ${data.averageScore}\nOther Names:\n\t\t\tRomaji: ${data.title.romaji}\n\t\t\tEnglish: ${data.title.english}\n\t\t\tNative: ${data.title.native}`,

              [{text: 'OK', onPress: () => console.log('OK Pressed')}],
              {cancelable: false},
            );
          }}
          status="primary"
          style={{marginLeft: 10, width: '25%'}}
          accessoryLeft={(props) => <Icon {...props} name="info" />}>
          INFO
        </Button>
      </View>
      <View style={{height: 30, margin: 2}} />
      <ScrollView>
        <View style={{flex: 1, margin: 10}}>
          <View style={{flexDirection: 'row', flex: 1, flexWrap: 'wrap'}}>
            <List
              data={data.characters.nodes}
              style={styles.container}
              contentContainerStyle={styles.productList}
              numColumns={2}
              renderItem={renderProductItem}
            />
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
    height: 200,
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
  icon: {
    position: 'absolute',
    width: 32,
    height: 32,
    top: 0,
    left: 0,
  },
});
export default AnimeList;
