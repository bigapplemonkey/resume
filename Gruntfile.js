module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                options: {
                    separator: ';',
                },
                src: ['infobox/infobox.js', 'js/helper.js', 'js/resumeBuilder.js'],
                dest: 'js/production.js',
            }
        },
        uglify: {
            build: {
                src: 'js/production.js',
                dest: 'js/production.min.js'
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'css/',
                    ext: '.min.css'
                }]
            }
        },
        responsive_images: {
            myTask: {
                options: {
                    quality: 70
                    // sizes: [{
                    //     name: 'large',
                    //     width: 2048,
                    //     quality: 50
                    // }]
                },
                files: [{
                    expand: true,
                    src: ['**.{jpg,gif,png}'],
                    cwd: 'toOptimize/',
                    dest: 'optimized/'
                }]
            }
        },

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-responsive-images');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'responsive_images']);

};
