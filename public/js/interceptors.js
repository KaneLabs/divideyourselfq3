app.factory('apiInterceptor', () => {
  return {
    request: (config) => {
      if(config.url.indexOf("maps") > -1){
        return config;
      }
      var token = localStorage.getItem('userToken');
      if(token){
        config.headers.Authorization = "Bearer " + token;
      }
      return config;
    }
  }
});
