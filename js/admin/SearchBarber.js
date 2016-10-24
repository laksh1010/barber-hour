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

import { listBarbers, selectBarber, updateBarberQuery } from '../actions/barbersChart';
import Touchable from '../common/Touchable';
import formStyle from '../forms/style';

CHARS_TO_SEARCH = 3;
const DATA_SOURCE = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id });

class SearchBarber extends Component {
  componentDidUpdate(prevProps) {
    var {isLoading, query, selected} = this.props;
    var isResultSelected = selected && query === selected.name;

    if (!isLoading && query.length >= CHARS_TO_SEARCH && query !== prevProps.query && !isResultSelected) {
      this.props.dispatch(listBarbers({query}));
    }
  }

  selectBarber(city) {
    this.props.dispatch(selectBarber(city));
  }

  renderBarber(rowData, sectionID, rowID) {
    return(
      <View key={rowData.id}>
        <Touchable
          style={styles.item}
          onPress={() => {this.selectBarber(rowData)}}>
          <Text style={styles.subtitle}>{rowData.name}</Text>
        </Touchable>
      </View>
    );
  }

  onChangeText(text) {
    this.props.dispatch(updateBarberQuery(text));
  }

  render() {
    var {items, isLoading, error, query, selected} = this.props;
    var dataSource = DATA_SOURCE.cloneWithRows(items.filter(i => query !== i.name));

    if (isLoading) {
      content = <ActivityIndicator />;
    } else if (dataSource.getRowCount() === 0) {
      var isResultSelected = selected && query === selected.name;
      var isQueryEmpty = !query || query.length < CHARS_TO_SEARCH;
      var text = isQueryEmpty || isResultSelected ? '' : 'Nenhuma barbearia foi encontrada.';
      content = <Text>{text}</Text>;
    } else {
      content =
        <ListView
          style={styles.list}
          dataSource={dataSource}
          renderRow={this.renderBarber.bind(this)} />;
    }

    return(
      <View>
        <View style={styles.formContainer}>
          <TextInput
            style={formStyle.textbox.normal}
            onChangeText={(text) => {this.onChangeText(text)}}
            value={query}
            placeholder='digite a barbearia'
            autoCapitalize='none'
            disabled={isLoading}
            returnKeyType='search' />
        </View>
        <View style={styles.listContainer}>{content}</View>
      </View>
    );
  }
}


export default SearchBarber;

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
