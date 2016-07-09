import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
} from 'react-native';

export default class ReviewBarberListItem extends Component {
  _openDetails() {
    this.props.navigator.push({
      component: HaircutDetails,
      passProps: {appointment: this.props.appointment}
    });
  }

  render() {
    const { barber } = this.props;
    const active = barber.active ? 'Ativado' : 'Desativado';
    const activeStyle = barber.active ? {color: 'green'} : {color: 'red'};

    return(
      <TouchableNativeFeedback onPress={this._openDetails.bind(this)}>
        <View style={styles.card}>
          <View>
            <Text style={styles.name}>{barber.name}</Text>
            <Text style={styles.barber}>{barber.email}</Text>
            <Text style={[styles.barber, activeStyle]}>{active}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

var styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    backgroundColor: 'white',
    borderColor: '#E8E8E8',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 2,
    elevation: 2,
    flex: 1
  },
  name: {
    fontWeight: 'bold',
    color: '#292929',
    fontSize: 18
  },
  barber: {
    color: '#A2A2A2',
    fontSize: 18
  }
});
