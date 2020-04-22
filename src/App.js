/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
// Create the client as outlined in the setup guide

// import AnimeList from './components/AnimeList';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import Navigator from './routes/index';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
const App = () => {
  console.disableYellowBox = true;

  const client = new ApolloClient({
    uri: 'https://graphql.anilist.co',
  });

  return (
    <ApolloProvider client={client}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Navigator />
      </ApplicationProvider>
    </ApolloProvider>
  );
};

export default App;
