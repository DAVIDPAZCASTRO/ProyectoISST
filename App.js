import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { DrawerNavigator, DrawerItems } from 'react-navigation'
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Input
} from 'native-base'
import Expo from 'expo'
import * as firebase from 'firebase'
import ListComponent from './app/components/ListComponent'

import ConfigurationScreen from './app/components/ConfigurationScreen'
import PublicarScreen from './app/components/PublicarScreen'
import HomeScreen from './app/components/HomeScreen'
import ListPrueba from './app/components/ListPrueba'
import PensamientosScreen from './app/components/PensamientosScreen'

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.actualizaPosicion = this.actualizaPosicion.bind(this);
    this.state = {
        latitude: 0,
        longitude: 0,
        error: null,
    };
}

componentDidMount() {
  
this.actualizaPosicion();

}

  actualizaPosicion(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  render () {
    return (
      <MyApp screenProps={this.actualizaPosicion}/>
    )
  }
}

const CustomDrawerContentComponent = (props) => (
  <Container>
    <Header style={{height: 200, backgroundColor: 'white'}}>
      <Body>
      <Text>Elige donde quieres ir</Text>
      </Body>
    </Header>
    <Content>
      <DrawerItems {...props}/>


    </Content>

  </Container>
)
const MyApp = DrawerNavigator({
  Home: {
    screen: HomeScreen
  },
  Publicar: {
    screen: PublicarScreen
  },
  Configuracion: {
    screen: ConfigurationScreen
  },
  Pensamientos: {
    screen: PensamientosScreen
  },
  ListaPrueba: {
    screen: ListPrueba
  }
}, {
  initialRouteName: 'Home',
  drawerPosition: 'left',
  contentComponent: CustomDrawerContentComponent,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle'
})

export default App
