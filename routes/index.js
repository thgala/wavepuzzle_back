/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var restful = require('restful-keystone')(keystone);
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);
var ApiError = require('./apiError');

// Common Middleware
keystone.pre('routes', keystone.middleware.api, middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
  api: importRoutes('./api')
};


// Handle 404 errors
keystone.set('404', function(req, res, next) {
  return ApiError.notFound(res)
});
 
// Handle other errors
keystone.set('500', function(err, req, res, next) {
  return ApiError.common(err, res)
});

keystone.set('cors allow origin', true);
// Setup Route Bindings
exports = module.exports = function (app) {
  // Api
  app.all('/api*', keystone.middleware.cors);

  app.get('/api/v1/text_field', routes.api.textfield.list);
  app.get('/api/v1/text_field/:id', routes.api.textfield.get);

  app.get('/api/v1/work', routes.api.work.list);
  app.get('/api/v1/work/:id', routes.api.work.get);

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

};
