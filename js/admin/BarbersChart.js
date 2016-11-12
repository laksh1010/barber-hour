import React, {Component,PropTypes} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
  ScrollView,
  ActivityIndicator
} from 'react-native'

import { connect } from 'react-redux';

import Toolbar from '../common/Toolbar';
import BarbersChartFilters from '../admin/BarbersChartFilters';
import EmptyResults from '../common/EmptyResults';

import { getChart } from '../actions/barbersChart';

class BarbersChart extends Component {
  componentDidMount() {
    this.props.dispatch(getChart());
  }

  componentDidUpdate(prevProps) {
    var fromDateChanged = prevProps.fromDate !== this.props.fromDate;
    var toDateChanged = prevProps.toDate !== this.props.toDate;
    var cityIDChanged = prevProps.cityID !== this.props.cityID;
    var barberIDChanged = prevProps.barberID !== this.props.barberID;

    if (fromDateChanged || toDateChanged || cityIDChanged || barberIDChanged) {
      this.props.dispatch(getChart());
    }
  }

  _openFilters() {
    this.props.navigator.push({
      component: BarbersChartFilters,
      title: 'Editar filtros'
    });
  }

  getWidth(data) {
    const deviceWidth = Dimensions.get('window').width;
    const maxWidth = 350;
    const maxValue = this._getMaxValue();
    const indicators = ['scheduled', 'canceled', 'finished']
    const unit = {
      scheduledUnit: Math.floor(maxWidth / maxValue),
      canceledUnit: Math.floor(maxWidth / maxValue),
      finishedUnit: Math.floor(maxWidth / maxValue)
    }
    let width = {};
    let widthCap;
    indicators.forEach(item => {
      widthCap = data[`${item}_appointments_count`] * unit[`${item}Unit`] || 5;
      width[item] = widthCap <= (deviceWidth - 50) ? widthCap : (deviceWidth - 50);
    })

    return width;
  }

  _integerValues(array) {
    return Object.values(array).filter(value => parseInt(value));
  }

  _getMaxValue() {
    const chartValues = this.props.chartData.reduce((prev, current) => prev.concat(this._integerValues(current)), []);
    return Math.max(...chartValues);
  }

  render() {
    const {isLoading, error, chartData, statuses} = this.props;
    const scheduledStatus = statuses.find(status => status.name === 'scheduled');
    const canceledStatus = statuses.find(status => status.name === 'canceled');
    const finishedStatus = statuses.find(status => status.name === 'finished');

    var loadingContent;
    if (isLoading) {
      loadingContent = <View style={styles.loading}><ActivityIndicator /></View>;
    }

    var chartContent;
    if (chartData.length > 0) {
      chartContent = (
        <View>
          {chartData.map((data, i) => {
            const width = this.getWidth(data);

            return (
              <View key={i}>
                <Text style={[styles.label, styles.title]}>{data.barber_name}</Text>

                {scheduledStatus.selected &&
                  <View style={styles.item}>
                    <Text style={styles.label}>Agendados</Text>
                    <View style={styles.data}>
                      <View style={[styles.bar, styles.scheduled, {width: width.scheduled}]} />
                      <Text style={styles.dataNumber}>{data.scheduled_appointments_count}</Text>
                    </View>
                  </View>
                }

                {canceledStatus.selected &&
                  <View style={styles.item}>
                    <Text style={styles.label}>Cancelados</Text>
                    <View style={styles.data}>
                      <View style={[styles.bar, styles.canceled, {width: width.canceled}]} />
                      <Text style={styles.dataNumber}>{data.canceled_appointments_count}</Text>
                    </View>
                  </View>
                }

                {finishedStatus.selected &&
                  <View style={styles.item}>
                    <Text style={styles.label}>Finalizados</Text>
                    <View style={styles.data}>
                      <View style={[styles.bar, styles.finished, {width: width.finished}]} />
                      <Text style={styles.dataNumber}>{data.finished_appointments_count}</Text>
                    </View>
                  </View>
                }

              </View>
            )
          })}
        </View>
      );
    } else if (!isLoading) {
      chartContent = <EmptyResults icon='profile' message='Nenhum resultado encontrado' />;
    }

    return (
      <ScrollView style={styles.container} automaticallyAdjustContentInsets={false}>
        <StatusBar backgroundColor='#C5C5C5' networkActivityIndicatorVisible={isLoading} />
        <Toolbar backIcon border
          navigator={this.props.navigator}
          title='Desempenho das barbearias barbearias'
          actions={[
            {title: 'Filtros', show: 'always', iconName: 'filter-list'}
          ]}
          onActionSelected={this._openFilters.bind(this)} />
        <View style={styles.innerContainer}>
          {loadingContent}
          {chartContent}
        </View>
      </ScrollView>
    )
  }
}

function select(store) {
  return {
    chartData: store.barbersChart.chartData,
    isLoading: store.barbersChart.isLoading,
    error: store.barbersChart.error,
    fromDate: store.barbersChart.period.fromDate,
    toDate: store.barbersChart.period.toDate,
    cityID: store.barbersChart.selectedCity && store.barbersChart.selectedCity.id,
    barberID: store.barbersChart.selectedBarber && store.barbersChart.selectedBarber.id,
    statuses: store.barbersChart.statuses
  };
}

export default connect(select)(BarbersChart);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: Platform.OS === 'ios' ? 70 : 0,
    flex: 1,
    backgroundColor: 'white'
  },
  innerContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  item: {
    flexDirection: 'column',
    marginBottom: 5,
    paddingHorizontal: 10
  },
  label: {
    color: '#CBCBCB',
    flex: 1,
    fontSize: 12,
    position: 'relative',
    top: 2,
  },
  title: {
    color: '#6B7C96',
    fontSize: 16,
    textAlign: 'center'
  },
  data: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 2
  },
  dataNumber: {
    color: '#CBCBCB',
    fontSize: 11
  },
  bar: {
    alignSelf: 'center',
    borderRadius: 5,
    height: 8,
    marginRight: 5,
  },
  canceled: {
    backgroundColor: '#F55443'
  },
  scheduled: {
    backgroundColor: '#FCBD24'
  },
  finished: {
    backgroundColor: '#59838B'
  },
  loading: {
    marginBottom: 10
  }
})
