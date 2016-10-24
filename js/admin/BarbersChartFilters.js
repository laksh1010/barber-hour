import React, {Component,PropTypes} from 'react'
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Platform
} from 'react-native'

import { connect } from 'react-redux';

import SearchCity from './SearchCity';
import Button from '../common/Button';
import Toolbar from '../common/Toolbar';
import SearchBarber from './SearchBarber';
import StatusSelector from './StatusSelector';
import PeriodSelector from './PeriodSelector';

import { resetFilters } from '../actions/barbersChart';

class BarbersChartFilters extends Component {
  _resetFilters() {
    this.props.dispatch(resetFilters());
  }

  render () {
    const {cities, cityQuery, selectedCity, isLoading, error, dispatch, barbers, barberQuery, selectedBarber, statuses, period} = this.props;

    return (
      <ScrollView automaticallyAdjustContentInsets={false} style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5' networkActivityIndicatorVisible={isLoading} />
        <Toolbar backIcon border navigator={this.props.navigator} title='Editar filtros' />
        <View style={styles.innerContainer}>
          <SearchCity
            items={cities}
            query={cityQuery}
            isLoading={isLoading}
            error={error}
            dispatch={dispatch}
            selected={selectedCity} />
          <SearchBarber
            items={barbers}
            query={barberQuery}
            isLoading={isLoading}
            error={error}
            dispatch={dispatch}
            selected={selectedBarber} />
          <View style={styles.row}>
            <View style={styles.halfColumn}>
              <PeriodSelector period={period} dispatch={dispatch} />
            </View>
            <View style={styles.halfColumn}>
              <StatusSelector statuses={statuses} dispatch={dispatch} />
            </View>
          </View>
          <Button
            text='OK'
            containerStyle={styles.button}
            onPress={() => this.props.navigator.pop()} />
          <Button
            outline
            text='Limpar filtros'
            containerStyle={styles.button}
            onPress={this._resetFilters.bind(this)} />
        </View>
      </ScrollView>
    )
  }
}

function select(store) {
  return {
    cities: store.barbersChart.cities,
    cityQuery: store.barbersChart.cityQuery,
    selectedCity: store.barbersChart.selectedCity,
    barbers: store.barbersChart.barbers,
    barberQuery: store.barbersChart.barberQuery,
    selectedBarber: store.barbersChart.selectedBarber,
    period: store.barbersChart.period,
    statuses: store.barbersChart.statuses,
    isLoading: store.barbersChart.isLoading,
    error: store.barbersChart.error
  };
}

export default connect(select)(BarbersChartFilters);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: Platform.OS === 'ios' ? 70 : 0,
    backgroundColor: 'white',
  },
  innerContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  halfColumn: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: .5,
  },
  button: {
    marginTop: 20
  },
})
