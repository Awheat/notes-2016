// 载入外挂
var gulp = require('gulp'),
    //sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload');

var wwwroot;
if(gulp.env._[0]=='mobile'){
    wwwroot = './mobile/';
}else{
    wwwroot = './client/';
}
// 样式处理
gulp.task('css', function() {
    return  gulp.src(wwwroot+'src/css/*.css')
            //.pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
            .pipe(concat('style.css'))
            .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
            .pipe(gulp.dest(wwwroot+'dist/css'))
            .pipe(rename({ suffix: '.min' }))
            .pipe(minifycss())
            .pipe(gulp.dest(wwwroot+'dist/css'));
});
// js处理
gulp.task('js', function() {
    return   gulp.src(wwwroot+'src/js/*.js')
            .pipe(concat('all.js'))
            .pipe(gulp.dest(wwwroot+'dist/js'))
            .pipe(rename({ suffix: '.min' }))
            .pipe(uglify())
            .pipe(gulp.dest(wwwroot+'dist/js'))
            .pipe(notify({ message: 'js task ok' }));
});
// angularjs处理
gulp.task('angularJs',function(){
    return  gulp.src(['app.js'])
            //.pipe(concat('app.js'))
            .pipe(gulp.dest(wwwroot+'dist/js'))
            .pipe(rename({ suffix: '.min' }))
            .pipe(uglify())
            .pipe(gulp.dest(wwwroot+'dist/js'))
            .pipe(notify({ message: 'js task ok' }));
})
// 图片处理
gulp.task('images', function() {
    return   gulp.src(wwwroot+'src/images/**/*')
            .pipe(imagemin())
            .pipe(gulp.dest(wwwroot+'dist/images'));
})
// 清空图片、样式、js
gulp.task('clean', function() {
    return  gulp.src([wwwroot+'dist/css', wwwroot+'dist/js', wwwroot+'dist/images'], { read: false })
            .pipe(clean());
});
// 默认任务 清空图片、样式、js并重建 运行语句 gulp
gulp.task('mobile', ['clean'], function() {
    gulp.start('css','js','images');
});
gulp.task('default', ['clean'], function() {
    gulp.start('css','js','images');
});
