const APIURL = 'http://localhost:3001/';

const apiPostGeneric = async (ENDPOINT, userData) => {
  try {
    console.log('userdata:', userData);
    const fetchAPI = await fetch(`${APIURL}${ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const result = await fetchAPI.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export default apiPostGeneric;
