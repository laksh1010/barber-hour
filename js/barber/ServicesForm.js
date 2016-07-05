import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  Switch
} from 'react-native';

import { connect } from 'react-redux';

import Button from '../common/Button';
import ImageChooser from './ImageChooser';
import formStyle from '../forms/style';

import { createServices, toggleService, changeServicePrice, addError, setEditMode } from '../actions/services';

class ServicesForm extends Component {
  _createServices() {
    var selectedServices = this.props.form.services.filter(service => service.selected);

    if (selectedServices.length) {
      var data = this.props.form.services.map(service => {
        return {
          id: service.id,
          name: service.name,
          price: this._formatPrice(service.price),
          _destroy: !service.selected
        }
      });
      this.props.dispatch(createServices(data));
    } else {
      this.props.dispatch(addError());
    }
  }

  _formatPrice(price) {
    if (price) {
      return price.replace(',', '.');
    }
  }

  componentDidMount() {
    if (this.props.edit) {
      this.props.dispatch(setEditMode());
    }
  }

  componentDidUpdate() {
    if (this.props.form.success) {
      if (this.props.edit) {
        this.props.navigator.pop();
      } else {
        this.props.navigator.resetTo({
          component: ImageChooser
        });
      }
    }
  }

  toggleService(name, value) {
    this.props.dispatch(toggleService(name, value));
  }

  changeServicePrice(name, price) {
    this.props.dispatch(changeServicePrice(name, price));
  }

  render() {
    var errorMessage;

    if (this.props.form.error) {
      errorMessage = <Text style={formStyle.errorBlock}>Por favor, selecione pelo menos um serviço.</Text>;
    }

    var buttonLabel = this.props.edit ? 'Alterar' : 'Avançar';

    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5'/>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Serviços</Text>
          <Text style={styles.info}>Selecione os serviços que você realiza:</Text>
          <View style={styles.formContainer}>
            {this.props.form.services.map((service) => {
              var errorBlock = service.error ? (
                <Text style={formStyle.errorBlock}>{service.error}</Text>
              ) : <View />;

              var price = service.selected ? (
                <View style={styles.servicePrice}>
                  <TextInput
                    style={formStyle.textbox.normal}
                    onChangeText={(text) => {this.changeServicePrice(service.name, text)}}
                    value={service.price}
                    placeholder='preço (R$)'
                    keyboardType='numeric' />
                  {errorBlock}
                </View>
              ) : <View />;

              return(
                <View key={service.name} style={styles.row}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Switch
                    style={styles.serviceSwitch}
                    onValueChange={(value) => {this.toggleService(service.name, value)}}
                    value={service.selected} />
                  {price}
                </View>
              )
            })}
          </View>
          {errorMessage}
          <Button containerStyle={styles.button} text={buttonLabel} onPress={this._createServices.bind(this)} />
        </View>
      </View>
    );
  }
}

function select(store) {
  return {
    form: store.services
  };
}

export default connect(select)(ServicesForm);

var styles = StyleSheet.create({
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
  info: {
    fontSize: 16,
    textAlign: 'center'
  },
  button: {
    marginTop: 20
  },
  formContainer: {
    marginTop: 10
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  serviceName: {
    fontSize: 16,
    flex: .5
  },
  servicePrice: {
    flex: .3
  },
  serviceSwitch: {
    flex: .2
  }
});
