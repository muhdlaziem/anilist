/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
// Create the client as outlined in the setup guide

import AnimeList from './components/AnimeList';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
const App = () => {
  console.disableYellowBox = true;

  const client = new ApolloClient({
    uri: 'https://graphql.anilist.co',
  });

  return (
    <ApolloProvider client={client}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <SafeAreaView>
          <ScrollView>
            <View style={{flex: 1, margin: 10}}>
              <AnimeList />
            </View>
          </ScrollView>
        </SafeAreaView>
      </ApplicationProvider>
    </ApolloProvider>
  );
};

export default App;
