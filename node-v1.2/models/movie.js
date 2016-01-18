/**
 * movie.js
 * @authors Your Name (you@example.org)
 * @date    2015-12-30 14:27:00
 * @version $Id$
 */

var mongoose = require('mongoose');
var MovieSchema = require('../schemas/movie');
var Movie = mongoose.model('Movie',MovieSchema);
module.exports = Movie;