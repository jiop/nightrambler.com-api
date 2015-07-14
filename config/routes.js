var posts = require('app/controllers/posts');

module.exports = function (app) {
  app.get('/posts', posts.index);
  app.get('/posts/:post_id', posts.show);

  // assume 404 since no middleware responded
  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use(function(err, req, res, next) {
    var res_err = {};
    if (app.get('env') === 'development') res_err = err;
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: res_err
    });
  });
};
