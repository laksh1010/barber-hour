import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  StatusBar,
  TextInput,
  RecyclerViewBackedScrollView,
  ListView,
  ScrollView
} from 'react-native';

import { connect } from 'react-redux';

import { listCities, selectCity, updateQuery } from '../actions/cities';
import Toolbar from '../common/Toolbar';
import Touchable from '../common/Touchable';
import formStyle from '../forms/style';

import Geocoder from 'react-native-geocoder';

CHARS_TO_SEARCH = 3;

class SelectCity extends Component {
  componentDidUpdate(prevProps) {
    var {isLoading, query} = this.props;

    if (!isLoading && query.length >= CHARS_TO_SEARCH && query !== prevProps.query) {
      this.props.dispatch(listCities({query}));
    }
  }

  selectCity(cityId) {
    this.props.dispatch(selectCity(cityId));
  }

  renderCity(rowData, sectionID, rowID) {
    return(
      <View key={rowData.id}>
        <Touchable
          style={styles.item}
          onPress={() => {this.selectCity(rowData)}}>
          <Text style={styles.subtitle}>{rowData.name} - {rowData.state.initials}</Text>
        </Touchable>
      </View>
    );
  }

  onChangeText(text) {
    this.props.dispatch(updateQuery(text));
  }

  render() {
    var {dataSource, isLoading, error, query} = this.props;

    if (isLoading) {
      content = <ActivityIndicator />;
    } else if (dataSource.getRowCount() === 0) {
      var text = query >= CHARS_TO_SEARCH ? '' : 'Nenhuma cidade foi encontrada.';
      content = <Text>{query}</Text>;
    } else {
      content =
        <ListView
          style={styles.list}
          dataSource={dataSource}
          renderRow={this.renderCity.bind(this)}
          renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}/>;
    }

    return(
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <StatusBar backgroundColor='#C5C5C5'/>
          <Toolbar backIcon navigator={this.props.navigator} />
          <View style={styles.innerContainer}>
            <Text style={styles.title}>Escolher cidade</Text>
            <View style={styles.formContainer}>
              <TextInput
                style={formStyle.textbox.normal}
                onChangeText={(text) => {this.onChangeText(text)}}
                value={query}
                placeholder='digite sua cidade'
                autoCapitalize='none'
                returnKeyType='search' />
            </View>
            <View style={styles.listContainer}>{content}</View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id });

function select(store) {
  return {
    dataSource: dataSource.cloneWithRows(store.cities.cities),
    query: store.cities.query,
    isLoading: store.cities.isLoading,
    error: store.cities.error
  };
}

export default connect(select)(SelectCity);

var styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  innerContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center'
  },
  formContainer: {
    marginTop: 10
  },
  listContainer: {
    flex: 1,
  },
  item: {
    borderColor: '#DCDCDC',
    borderBottomWidth: 1,
    padding: 10,
    flexWrap: 'wrap'
  },
  subtitle: {
    fontSize: 18
  },
  list: {
    borderColor: '#DCDCDC',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3
  }
});
