module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            app: {
                src: [
                    './assets/javascripts/app.js',
                    './assets/javascripts/game.js'
                ],
                dest: './public/assets/javascripts/application.js'
            },
            phaser: {
                src: [
                    './bower_components/phaser/build/phaser.min.js'
                ],
                dest: './public/assets/javascripts/lib/phaser.min.js'
            },
        },
        sass: {
            dist: {
                files: {
                  "./public/assets/stylesheets/application.css": "./assets/sass/application.scss"
                },
                options: {
                    style: "expanded"
                }
            },
            production: {
                files: {
                  "./public/assets/stylesheets/application.css": "./assets/sass/application.scss"
                },
                options: {
                    style: "compressed"
                }
            }
        },
        watch: {
            js: {
                files: [
                    './assets/javascripts/**/*.js'
                ],
                tasks: ['concat', /*'uglify:js'*/]
            },
            sass: {
                files: ['./assets/sass/**/*.scss'],
                tasks: ['sass:dist'],
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('dist', ['concat', 'sass:production']);
};

