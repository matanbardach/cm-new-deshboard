// Dynamic imports aren't supported by ES6,
// so we using require instead of import.
//console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyy: ", process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production'){
  module.exports = require('./configureStore.prod');
}else{
  module.exports = require('./configureStore.dev');
}
