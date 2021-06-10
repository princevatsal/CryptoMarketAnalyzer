import React, {useState, useEffect} from 'react';
import {Alert, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

const Form = ({
  currency,
  cryptocurrency,
  setCurrency,
  setCryptocurrency,
  setConsultAPI,
}) => {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);

  useEffect(() => {
    const consultAPI = async () => {
      const url =
        'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
      const {data} = await axios.get(url);
      setCryptocurrencies(data.Data);
    };
    consultAPI();
  }, []);

  const getCurrency = coin => {
    setCurrency(coin);
  };

  const getCryptocurrency = cripto => {
    setCryptocurrency(cripto);
  };

  const tradePrice = (coin, crypto) => {
    // if (coin.trim() === '' || crypto.trim() === '') {
    if (!coin.length || !crypto.length) {
      showAlert();
      return;
    }
    setConsultAPI(true);
  };

  const showAlert = () => {
    Alert.alert('Error...', 'Both fields are required', [{text: 'OK'}]);
  };

  return (
    <View>
      <Text style={styles.label}>currency</Text>
      <View
        style={{
          backgroundColor: '#fe5762',
          borderRadius: 20,
          width: '40%',
        }}>
        <Picker
          selectedValue={currency}
          onValueChange={coin => getCurrency(coin)}
          style={{color: 'white', height: 50}}
          itemStyle={styles.itemStyle}>
          <Picker.Item label="- Select -" value="" />
          <Picker.Item label="United States Dollar" value="USD" />
          <Picker.Item label="Chilean Peso" value="CLP" />
          <Picker.Item label="Euro" value="EUR" />
          <Picker.Item label="Pound Sterling" value="GBP" />
        </Picker>
      </View>

      <Text style={styles.label}>cryptocurrency</Text>
      <View
        style={{
          backgroundColor: '#fe5762',
          borderRadius: 20,
          width: '40%',
        }}>
        <Picker
          style={{color: 'white', height: 50, width: '100%'}}
          selectedValue={cryptocurrency}
          onValueChange={cripto => getCryptocurrency(cripto)}
          itemStyle={styles.itemStyle}>
          <Picker.Item label="- Select -" value="" />
          {cryptocurrencies.map(cripto => (
            <Picker.Item
              key={cripto.CoinInfo.Id}
              label={cripto.CoinInfo.FullName}
              value={cripto.CoinInfo.Name}
            />
          ))}
        </Picker>
      </View>
      <TouchableHighlight
        style={styles.btnTrade}
        onPress={() => tradePrice(currency, cryptocurrency)}>
        <Text style={styles.textTrade}>Trade</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    fontSize: 22,
    marginVertical: 20,
    // eslint-disable-next-line no-dupe-keys
    textTransform: 'uppercase',
    color: 'white',
  },
  itemStyle: {
    height: 120,
  },
  btnTrade: {
    backgroundColor: '#fe5762',
    padding: 10,
    marginTop: 30,
    borderRadius: 20,
  },
  textTrade: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});

export default Form;
