import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  View,
  ImageBackground,
} from 'react-native';
import Form from './components/Form';
import Header from './components/Header';
import axios from 'axios';
import MarketPrice from './components/MarketPrice';
import Background from './assets/img/graph.jpeg';
const App = () => {
  const [currency, setCurrency] = useState([]);
  const [cryptocurrency, setCryptocurrency] = useState([]);
  const [consultAPI, setConsultAPI] = useState(false);
  const [tradingResult, setTradingResult] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const tradeCryptocurrency = async () => {
      if (consultAPI) {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptocurrency}&tsyms=${currency}`;
        const {data} = await axios.get(url);

        setLoading(true);

        setTimeout(() => {
          setTradingResult(data.DISPLAY[cryptocurrency][currency]);
          setConsultAPI(false);
          setLoading(false);
        }, 3000);
      }
    };
    tradeCryptocurrency();
  }, [consultAPI, cryptocurrency, currency]);

  return (
    <>
      <ImageBackground style={{flex: 1}} source={Background}>
        <ScrollView>
          <Header />

          <Image
            style={styles.bgImage}
            source={require('./assets/img/Bitcoin2.png')}
          />
          <View style={styles.content}>
            <Form
              currency={currency}
              cryptocurrency={cryptocurrency}
              setCurrency={setCurrency}
              setCryptocurrency={setCryptocurrency}
              setConsultAPI={setConsultAPI}
            />
          </View>

          <View style={styles.contentTradingResult}>
            {loading ? (
              <ActivityIndicator size="large" color="#5E49E2" />
            ) : (
              <MarketPrice tradingResult={tradingResult} />
            )}
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    height: 150,
    width: 250,
    alignSelf: 'center',
  },
  content: {
    marginHorizontal: '2.5%',
    paddingBottom: 20,
  },
});

export default App;
