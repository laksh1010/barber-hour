import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView
} from 'react-native';

import Toolbar from '../common/Toolbar';

export default class ServiceTerms extends Component {
  render() {
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5'/>
        <Toolbar backIcon border navigator={this.props.navigator} title='Termos de uso' />
        <ScrollView>
          <View style={styles.innerContainer}>
            <Text style={styles.info}>
             Silvio Santos Ipsum É bom ou não éam? Wellintaaammmmmmmmm. Mah ooooee vem pra cá. Vem pra cá. É fácil ou não éam? Você veio da caravana de ondeammm? Eu só acreditoammmm.... Vendoammmm. O arriscam tuduam, valendo um milhão de reaisuam. Patríciaaammmm... Luiz Ricardouaaammmmmm. É por sua conta e riscoamm? Um, dois três, quatro, PIM, entendeuam?

             Um, dois três, quatro, PIM, entendeuam? É fácil ou não éam? Eu não queria perguntar isso publicamente, ma vou perguntar. Carla, você tem o ensino fundamentauam? É namoro ou amizadeemm? Ma quem quer dinheiroam? É bom ou não éam? Ma tem ou não tem o celular do milhãouamm? Qual é a musicamm?

             É bom ou não éam? Ma não existem mulher feiam, existem mulher que não conhece os produtos Jequitiamm. Ma você está certo dissoam? Ma quem quer dinheiroam? É por sua conta e riscoamm? O arriscam tuduam, valendo um milhão de reaisuam. Mah você mora com o papai ou com a mamãem? É dinheiro ou não éam? Mah você mora com o papai ou com a mamãem? Ma! Ao adquirir o carnê do Baú, você estará concorrendo a um prêmio de cem mil reaisam. Wellintaaammmmmmmmm.

             Estamos em ritmo de festamm. É bom ou não éam? Ma não existem mulher feiam, existem mulher que não conhece os produtos Jequitiamm. Ha haeeee. Hi hi. O prêmio é em barras de ouro, que vale mais que dinheiroam. Ma vai pra lá. Mah ooooee vem pra cá. Vem pra cá. Ma vai pra lá. Mah é a porta da esperançaam. É com você Lombardiam.

             Ha hai. Bem boladoam, bem boladoam. Bem gozadoam. O arriscam tuduam, valendo um milhão de reaisuam. É bom ou não éam? Ma não existem mulher feiam, existem mulher que não conhece os produtos Jequitiamm. Mah você não consegue né Moisés? Você não consegueam. É namoro ou amizadeemm? Mah ooooee vem pra cá. Vem pra cá. Vem pra lá, mah você vai pra cá. Agora vai, agora vem pra láamm. Mah ooooee vem pra cá. Vem pra cá.
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  innerContainer: {
    padding: 20,
  },
  info: {
    fontSize: 16,
  },
});
