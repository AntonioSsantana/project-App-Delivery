const APIURL = 'http://localhost:3001/';
const apiPOSTCheckout = async (ENDPOINT, userData, token) => {
  try {
    const fetchAPI = await fetch(`${APIURL}${ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
      body: JSON.stringify(userData),
    });
    const result = await fetchAPI.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export default apiPOSTCheckout;
