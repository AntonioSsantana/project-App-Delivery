const APIURL = 'http://localhost:3001/login';

const apiCallLogin = async (userData) => {
  try {
    const fetchAPI = await fetch(APIURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const result = await fetchAPI.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export default apiCallLogin;
