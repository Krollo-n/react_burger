export const API ={
  baseUrl: 'https://norma.education-services.ru/api',
  endpoints: {
    ingredients: '/ingredients',
    orders: '/orders',
    userData: '/auth/user',
    register: '/auth/register',
    login: '/auth/login',
    logout: '/auth/logout',
    tokenRefresh: '/auth/token',
    password: {
      forgot: '/password-reset',
      reset: '/password-reset/reset',
    }
  }
};

export default API; 

export const checkResponse = async (res) => {
  if (res.ok) {return await res.json();}
  let response = await res.json()
  return Promise.reject(`${response.message}`);
}

export const request = (url, options) => {
  return fetch( API.baseUrl + url, options).then(checkResponse)
}

export const refreshToken = () => {
  return request(`api/auth/token`, {
     method: "POST",
     headers: {"Content-Type": "application/json;charset=utf-8"},
     body: JSON.stringify({token: localStorage.getItem("refreshToken")}),
  });
};

export const fetchWithRefresh = async (url, options) => {
  try {
    return await request(url, options);
  } catch (err) {
      if (err === "jwt expired") {
          const refreshData = await refreshToken();
          if (!refreshData.success) {
              return Promise.reject(refreshData);
          }
          const accessToken = refreshData.accessToken.split(' ')[1]
          localStorage.setItem("refreshToken", refreshData.refreshToken);
          localStorage.setItem("accessToken", accessToken);
          options.headers.authorization = refreshData.accessToken;
          return await request(url, options);
      } else {
          return Promise.reject(err);
      }
    }
};
