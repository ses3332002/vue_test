import axios from 'axios';

const API_KEY =
  'e6375532abf45c9e1664d823fd5f2232266c144ff706ac2ec95a46bd1101f7fd';
const API_BASE_URL = 'https://min-api.cryptocompare.com';
const API_BASE_URL_WS = 'wss://streamer.cryptocompare.com/v2';
const priceEP = '/data/price';
const priceRequestOptions = { fsym: 'BTC', tsyms: 'USD' };
const subscriptionOn = {
  action: 'SubAdd',
  subs: ['5~CCCAGG~BTC~USD']
};
const subscriptionOff = {
  action: 'SubRemove',
  subs: ['5~CCCAGG~BTC~USD']
};

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    authorization: `Apikey ${API_KEY}`
  }
});

let socket = new WebSocket(`${API_BASE_URL_WS}?api_key=${API_KEY}`);

export const getStreamData = (arr) => {
  socket.onmessage = function (event) {
    const res = JSON.parse(event.data);
    if (res.TYPE === '5') {
      arr.push(res.PRICE);
    }
  };
};

export const unsubscribe = () => {
  socket.send(JSON.stringify(subscriptionOff));
  socket.close();
};

export const getCurrentPrice = async () => {
  try {
    const { data } = await api.get(priceEP, { params: priceRequestOptions });
    return data.USD;
  } catch (err) {
    console.error(err);
  }
};

socket.onopen = function () {
  console.log('connection established');
  socket.send(JSON.stringify(subscriptionOn));
};

socket.onerror = function (error) {
  console.error(error.message);
};

socket.onclose = function () {
  console.log('connection closed');
};
