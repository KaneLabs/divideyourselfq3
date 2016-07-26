app.factory('UsersService', $http => {
  return {
    sign: (type, email, password, username, callback) => {
      $http.post(`/users/sign${type}`, {email, password, username}).then(data => {
        console.log("Back on the client", data);
        if(!data.data.token) return localStorage.removeItem("userToken");
        callback(data.data);
      });
    },

    get: (id) => {
      $http.get(`/users/${id}`).then(data => {
      //TODO Do something with user data
      console.log(data.data);
      });
    }
  }
});
