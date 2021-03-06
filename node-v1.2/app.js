/**
 * app.js(npm install express jade moment mongoose)
 * @authors Your Name (you@example.org)
 * @date    2015-12-29 11:47:32
 * @version $Id$
 */
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var _ = require('underscore');
var Movie = require('./models/movie');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var app = express();

mongoose.connect('mongodb://localhost/wuwangcheng');

app.set('views', './views/pages');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port);

console.log('node started on port ' + port);

/*
	--------------------------自定义路由规则----------------------------
*/
// index page
app.get('/', function(req, res) {
    Movie.fetch(function(err, movies) {
        if (err) {
            console.log(err);
        }
        res.render('index', {
            title: 'node 首页',
            movies: movies
        });
    });
});

// detail page
app.get('/movie/:id', function(req, res) {
	//获取通过url传递过来的id的值
	var id = req.params.id;
	Movie.findById(id, function(err, movie){
		res.render('detail', {
	        title: 'node ' + movie.title,
	        movie: movie
	    });
	});
});
//admin  update movie
app.get('/admin/uodate/:id',function(req,res){
	var id = req.params.id;
	if(id){
		Movie.findById(id,function(err, movie){
			res.render('admin', {
				title:'node 后台更新页面',
				movie: movie
			});
		});
	}
});
// admin post movie
app.post('/admin/movie/new', function(req,res){
	var id = req.body.movie._id;
	var movieObj = req.body.movie;
	var _movie

	if(id !== 'undefined'){
		Movie.findById(id, function(err, movie){
			if(err){
				console.log(err);
			}
			_movie = _.extend(movie, movieObj);
			_movie.save(function(err,movie){
				if(err){
					console.log(err);
				}

				res.redirect('/movie/' + movie._id);
			})
		})
	}else{
		_movie = new Movie({
			doctor: movieObj.doctor,
			title: movieObj.title,
			country: movieObj.country,
			language: movieObj.language,
			year: movieObj.year,
			poster: movieObj.poster,
			summary: movieObj.summary,
			flash: movieObj.flash
		});
		_movie.save(function(err, movie){
			if(err){
				console.log(err);
			}

			res.redirect('/movie/' + movie._id);
		});
	}
});
// list page
app.get('/admin/list', function(req, res) {
	Movie.fetch(function(err, movies) {
        if (err) {
            console.log(err);
        }
        res.render('list', {
	        title: 'node 列表页',
	        movies: movies
    	});
    });
});
// list delete movie
app.delete('/admin/list',function(req,res){
	var id = req.query.id;
	if(id){
		Movie.remove({_id: id}, function(err, movie){
			if(err){
				console.log(err);
			}else{
				res.json({success: 1});
			}
		});
	}
});
// admin page
app.get('/admin/movie', function(req, res) {
    res.render('admin', {
        title: 'node 后台录入页',
        movie: {
            title: '',
            doctor: '',
            country: '',
            year: '',
            poster: '',
            flash: '',
            summary: '',
            language: ''
        }
    });
});
