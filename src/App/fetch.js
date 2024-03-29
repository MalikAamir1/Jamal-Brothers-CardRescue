// import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const postRequest = async (api, body) => {
  var myHeaders = new Headers();
  myHeaders.append('Cookie', 'sessionid=1qg58avyasqn5io3o5adtzbjv18f2vrn');
  const res = await fetch(api, {
    method: 'POST',
    headers: myHeaders,
    body: body,
    redirect: 'follow',
  });
  return await res.json();
};

export const postRequestWithToken = async (api, body, token) => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Token ${token}`);
  const res = await fetch(api, {
    method: 'POST',
    headers: myHeaders,
    body: body,
    redirect: 'follow',
  });
  return await res.json();
};

export const postRequestWithTokenAndCookie = async (api, body, token) => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Token ${token}`);
  myHeaders.append('Cookie', 'sessionid=1qg58avyasqn5io3o5adtzbjv18f2vrn');
  const res = await fetch(api, {
    method: 'POST',
    headers: myHeaders,
    body: body,
    redirect: 'follow',
  });
  return await res.json();
};

export const getRequestWithOutBody = async (api, token) => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Token ${token}`);
  const res = await fetch(api, {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  });
  // console.log('res ',res)
  return res.json();
};

export const getRequestWithCookie = async (api, token) => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Token ${token}`);
  myHeaders.append('Cookie', 'sessionid=1qg58avyasqn5io3o5adtzbjv18f2vrn');
  const res = await fetch(api, {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  });
  // console.log('res ',res)
  return res.json();
};

export const deleteRequest = async (api, token) => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Token ${token}`);
  const res = await fetch(api, {
    method: 'DELETE',
    headers: myHeaders,
  });
  // return await res.json();
  // return res.json();
  if (!res.ok) {
    // Handle non-successful response (status other than 2xx)
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  // Check if the response body is not empty before trying to parse JSON
  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return await res.json();
  } else {
    // If the response is not in JSON format, return an empty object or handle accordingly
    return {};
  }
};

export const putRequestWithToken = async (api, body, token) => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Token ${token}`);
  const res = await fetch(api, {
    method: 'PUT',
    headers: myHeaders,
    body: body,
    redirect: 'follow',
  });
  return await res.json();
};
