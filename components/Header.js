import React from 'react';
import {Text, StyleSheet, Platform} from 'react-native';

const Header = () => <Text style={styles.header}>Crypto Market Analyser</Text>;

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    fontFamily: 'Lato-Black',
    backgroundColor: '#5E49E2',
    paddingVertical: 20,
    textTransform: 'uppercase',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    color: '#FFF',
  },
});

export default Header;
