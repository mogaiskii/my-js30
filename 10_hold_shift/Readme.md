# Gulp-driven

Template for projects with gulp task manager

## Config

All configuration is on ``.gulpfile``.
``pathConfig`` object is configuration of build/source/watch file paths.
``serverConfig`` object is configuration of dev-server.

### Default order
1. `build`
    1. `js:build`
        1. browserify
        2. babelify [es2015]
        3. sourcemaps
        4. uglify
        5. rename
        6. dest
        7. reload
    2. `style:build`
        1. sourcemaps
        2. sass
        3. prefixer
        4. cssmin
        5. dest
        6. reload
    3. `image:build`
        1. imagemin [pngquant]
        2. dest
        3. reload
    4. `html:build`
        1. rigger
        2. ~~inject~~
        3. dest
        4. reload
2. `webserver`
3. `watch`


## Folders

* build
output folder
* src 
source code folder
