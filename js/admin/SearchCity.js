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
} from 'react-native';

import { connect } from 'react-redux';

import { listCities, selectCity, updateCityQuery } from '../actions/barbersChart';
import Touchable from '../common/Touchable';
import formStyle from '../forms/style';

CHARS_TO_SEARCH = 3;
const DATA_SOURCE = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id });

class SearchCity extends Component {
  componentDidUpdate(prevProps) {
    var {isLoading, query, selected} = this.props;
    var isResultSelected = selected && query === `${selected.name} - ${selected.state.initials}`;

    if (!isLoading && query.length >= CHARS_TO_SEARCH && query !== prevProps.query && !isResultSelected) {
      this.props.dispatch(listCities({query}));
    }
  }

  selectCity(city) {
    this.props.dispatch(selectCity(city));
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
    this.props.dispatch(updateCityQuery(text));
  }

  render() {
    var {items, isLoading, error, query, selected} = this.props;
    var dataSource = DATA_SOURCE.cloneWithRows(items.filter(i => query !== `${i.name} - ${i.state.initials}`));

    if (isLoading) {
      content = <ActivityIndicator />;
    } else if (dataSource.getRowCount() === 0) {
      var isResultSelected = selected && query === `${selected.name} - ${selected.state.initials}`;
      var isQueryEmpty = !query || query.length < CHARS_TO_SEARCH;
      var text = isQueryEmpty || isResultSelected ? '' : 'Nenhuma cidade foi encontrada.';
      content = <Text>{text}</Text>;
    } else {
      content =
        <ListView
          style={styles.list}
          dataSource={dataSource}
          renderRow={this.renderCity.bind(this)} />;
    }

    return(
      <View>
        <View style={styles.formContainer}>
          <TextInput
            style={formStyle.textbox.normal}
            onChangeText={(text) => {this.onChangeText(text)}}
            value={query}
            placeholder='digite a cidade'
            autoCapitalize='none'
            disabled={isLoading}
            returnKeyType='search' />
        </View>
        <View style={styles.listContainer}>{content}</View>
      </View>
    );
  }
}


export default SearchCity;

var styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: 'center'
  },
  formContainer: {
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
