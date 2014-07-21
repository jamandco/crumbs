module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  var pkg = grunt.file.readJSON('package.json');

  var hbs_filepath = function (filepath) {
    return filepath.split('/').slice(1).join('/').replace('.hbs', '')
  }
  var hbs_processName = function (filepath) {
    return hbs_filepath(filepath)
  }
  var hbs_processPartialName = function (filepath) {
    return hbs_filepath(filepath).replace('_', '')
  }

  var path = require('path');

  var mountFolder = function (connect, dir) {
    return connect.static(path.resolve(dir));
  };

  grunt.initConfig({

    pkg: pkg,

    compass: {
      dist: {
        options: {
          relativeAssets: true,
          basePath: '',
          sassDir: 'styles',
          cssDir: 'css',
          imagesDir: 'images'
        }
      }
    },

    handlebars: {
      templates: {
        options: {
          wrapped: true,
          namespace: 'template',
          processName: hbs_processName,
          processPartialName: hbs_processPartialName,
        },
        files: {
          'js/templates.js': 'templates/**/*.hbs'
        }
      }
    },

    jshint: {
      files: ['/js/**/*.js'],
      options: {
        jshintrc: '.jshintrc',
        ignores: [
          'js/templates.js',
          'js/appOptimized.js'
        ]
      }
    },

    requirejs: {
      compile: {
        options: {
          baseUrl: "js",
          mainConfigFile: "js/main.js",
          name: 'app',
          out: "js/appOptimized.js",
          optimize: 'none'
        }
      }
    },

    clean: ['.sass-cache', 'css', 'js/templates.js'],

    watch: {
      livereload: {
        options: {
          livereload: true,
        },
        files: ['styles/**/*.scss', '<%= jshint.files %>', 'js/appOptimized.js', 'js/index.js', 'js/templates.js']
      },
      styles: {
        files: 'styles/**/*.scss',
        tasks: ['compass']
      },
      scripts: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint']
      },
      templates: {
        files: ['templates/**/*.js'],
        tasks: ['handlebars']
      }
    },

    connect: {
      dev: {
        options: {
          port: 9000,
          hostname: 'localhost'
        }
      }
    }

  });


  //----------------------------------
  //
  // Tasks
  //
  //----------------------------------

  grunt.loadTasks('tasks');

  grunt.registerTask('default', [
    'clean',
    'jshint',
    'handlebars',
    'compass',
    'di:index'
  ]);

  grunt.registerTask('dev', [
    'clean',
    'jshint',
    'handlebars',
    'compass',
    'di:index',
    'connect',
    'watch'
  ]);

};
