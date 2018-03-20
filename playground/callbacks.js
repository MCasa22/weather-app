//KEY FOR USING GOOGLE API'S: add "&key=AIzaSyAGFm69f20xcCN5nNN1_C5LLN6rF9NCV-8" in url query

var getUser = (id, callback) => {
  var user = {
    id: id,
    name: 'matteo'
  };
  setTimeout(() => {
    callback(user);
  },3000);
};


getUser(31, (userObject) => {
  console.log(userObject);
});
