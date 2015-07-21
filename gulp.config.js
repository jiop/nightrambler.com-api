module.exports = function() {
  var temp = './.tmp/';
  var root = './';
  var server = root;

  var config = {
    /**
     * File paths
     */
    alljs: [
      './**/*.js',
      './*.js',
      '!./node_modules/**/*.js',
    ],
    root: root,
    server: server,
    temp: temp,

    /**
     * Node settings
     */
    nodeServer: server + 'app.js',
    defaultPort: '8089'
  };
  return config;
};
