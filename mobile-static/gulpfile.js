var gulp = require("gulp");
var livereload = require("gulp-livereload");
var sass = require("gulp-ruby-sass");
var htmlmin = require('gulp-minify-html'),
    imagemin = require('gulp-imagemin'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify');


gulp.task("sass", function() {

    return sass("src/sass/**/*.scss")
        .pipe(gulp.dest("src/css2"))
        .pipe(livereload());
})


gulp.task('sasswatch', function() {

    gulp.watch('src/sass/**/*.scss', ["sass"]

    );
});



gulp.task('live', function() {
    livereload.listen();
    gulp.watch('src/**/*.*', function(file) {
        livereload.changed(file.path);
    });
});

// 压缩html
gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dest'))
});

//压缩图片
// gulp.task('img', function() {
//     return gulp.src('src/img/*')
//         .pipe(imagemin({
//             progressive: true,
//             svgoPlugins: [{ removeViewBox: false }],
//             optimizationLevel: 3

//         }))
//         .pipe(gulp.dest('./dest/img/'))
// });

// 合并、压缩、重命名css
gulp.task('css', function() {
    return gulp.src('src/css2/**')
        .pipe(minifycss())
        .pipe(gulp.dest('dest/css2'))

});


// 合并、压缩js文件
gulp.task('js', function() {
    return gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dest/js'))

});

// 默认任务
gulp.task('default', ["js", "css", "html" ], function() {
    console.log("finish")
})





