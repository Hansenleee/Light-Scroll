var gulp = require('gulp');
var jshint = require('gulp-jshint');

// 检验js代码
gulp.task('jsLint', function () {
    gulp.src('src/index.js')
    .pipe(jshint())
    .pipe(jshint.reporter()); // 输出检查结果
});