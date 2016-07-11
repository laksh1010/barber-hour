import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  TouchableNativeFeedback,
  Switch
} from 'react-native';

import { connect } from 'react-redux';

import Button from '../common/Button';
import Toolbar from '../common/Toolbar';
import BarberIcon from '../common/BarberIcon';
import formStyle from '../forms/style';

import { toggleActive, updateBarber, setEditMode } from '../actions/admin';

class ReviewBarber extends Component {
  _toggleActive(barberID, value) {
    this.props.dispatch(toggleActive(this.props.barberID, value));
  }

  _update() {
    const {barberID, navigator} = this.props;
    const barber = this.props.form.barbers.find(barber => barber.id === barberID);
    var data = { active: barber.active };
    this.props.dispatch(updateBarber(barberID, data));
  }

  componentDidMount() {
    this.props.dispatch(setEditMode());
  }

  componentDidUpdate() {
    if (this.props.form.success) {
      this.props.navigator.pop();
    }
  }

  _getImageURL(images) {
    if (images.length) {
      return {uri: images[0].url};
    }
  }

  _getAddress(address) {
    if (address) {
      return `${address.street}, ${address.number} - ${address.district}`;
    }
  }

  render() {
    const {barberID, navigator} = this.props;
    const barber = this.props.form.barbers.find(barber => barber.id === barberID);
    const {address, images, services} = barber;

    var errorMessage;
    if (this.props.form.error) {
      errorMessage = <Text style={formStyle.errorBlock}>não foi possível alterar a barbearia.</Text>;
    }

    const buttonLabel = this.props.form.isLoading ? 'Alterando...' : 'Alterar';

    return(
      <View style={styles.container}>
        <ScrollView>
          <StatusBar backgroundColor='#C5C5C5'/>
          <Toolbar backIcon border title={barber.name} navigator={navigator} />
          <Image source={this._getImageURL(images)} style={styles.image} />
          <View style={styles.separator} />
          <View style={styles.innerContainer}>
            <Text style={styles.title}>{barber.name}</Text>
            <View style={styles.infoContainer}>
              <BarberIcon name='location' size={24} color='#003459' style={styles.icon} />
              <Text style={styles.info}>{this._getAddress(address)}</Text>
            </View>
          </View>
          <View style={styles.separator} />
          <View style={styles.innerContainer}>
            {services.map((service) => {
              const icon = service.name === 'Corte de Cabelo' ? 'scissor-4' : 'razor';
              return(
                <View key={service.id} style={styles.serviceContainer}>
                  <BarberIcon name={icon} size={24} color='#003459' style={styles.icon} />
                  <Text style={styles.price}>{service.name}: {service.formatted_price}</Text>
                </View>
              )
            })}
          </View>
          <View style={styles.separator} />
          <View style={styles.activeContainer}>
            <Text>Ativado:</Text>
            <Switch
              onValueChange={(value) => {this._toggleActive(barberID, value)}}
              disabled={this.props.form.isLoading}
              value={barber.active} />
          </View>
          <View style={styles.separator} />
          <View style={styles.innerContainer}>
            {errorMessage}
            <Button
              containerStyle={styles.button}
              text={buttonLabel}
              onPress={this._update.bind(this)}
              disabled={this.props.form.isLoading} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

function select(store) {
  return {
    form: store.admin
  };
}

export default connect(select)(ReviewBarber);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  innerContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: '#111111'
  },
  info: {
    fontSize: 16,
    textAlign: 'center',
    flex: 1
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    width: null,
    height: 200,
    flex: 1,
    resizeMode: 'cover'
  },
  separator: {
    backgroundColor: '#DCDCDC',
    height: 1,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  icon: {
    marginRight: 5
  },
  serviceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  activeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  }
});