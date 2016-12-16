module.exports = function (grunt) {
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({
    // Project settings
    config: {
      // Configurable paths
      app: 'src',
      inputBase : 'src/',
      outputBase : 'build/'
    },
    /** Less compiler config **/
    less: {
      build: {
        options: {
          cleancss: true,
          strictImports: true,
          relativeUrls: false,
          sourceMap: true,
          compress: true
        },
        files: {
          '<%= config.outputBase %>/css/app.css' : '<%= config.inputBase %>/less/main.less'
        }
      }
    },
    /** JSHint configuration */
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        '<%= config.inputBase %>/javascripts/app/common/**/*.js',
        '<%= config.inputBase %>/javascripts/app/modules/**/*.js'
        //grunt.file.read('.jshintignore').trim().split('\n').map(function(s) { return '!' + s; })
      ],
      test: [ 'test/**/*.js' ]
    },
    /** RequireJS Optimization configuration **/
    requirejs: {
      app : {
        options : {
          baseUrl : '<%= config.inputBase %>/javascripts',
          name : 'main',
          mainConfigFile : ['src/javascripts/main.js'],
          out : '<%= config.outputBase %>/<%= config.buildVersion %>/javascripts/main.js'
        }
      }
    },
    copy: {
      build: {
        files: [
          { flatten: false, expand: true, cwd: '<%= config.inputBase %>',
          src: 'bower_components/requirejs/require.js', dest: '<%= config.outputBase %>' },
          { src: 'bower_components/jwplayer/jwplayer.flash.swf', dest: '<%= config.outputBase %>' },
          { src: 'bower_components/jwplayer/jwplayer.html5.js', dest: '<%= config.outputBase %>' },
          { src: 'bower_components/requirejs/require.js', dest: '<%= config.outputBase %>' },
          { src: 'javascripts/resources/json/mock/rabbitHoles.json', dest: '<%= config.outputBase %>' },
          { src: 'javascripts/resources/json/mock/pathList.json', dest: '<%= config.outputBase %>' }
        ]
      },
      others: {
        files: [{
          src: 'src/js/html5shiv.js',
          dest: 'build/js/html5shiv.js'
        },{
          expand: true,
          src: 'src/img/**',
          flatten: true,
          dest: '<%= config.outputBase %>/img',
          filter: 'isFile'
        }]
      }
    },
    /** karma configuration */
    karma: {
      unit: {
        configFile: './karma.conf.js',
        autoWatch: false,
        singleRun: true
      },
      unit_auto: {
        configFile: './karma.conf.js',
        autoWatch: true,
        singleRun: false
      }
    }
  });

  //single run tests
  grunt.registerTask('test', ['jshint','test:unit']);
  grunt.registerTask('test:unit', ['karma:unit']);

  //autotest and watch tests
  grunt.registerTask('autotest', ['karma:unit_auto']);
  grunt.registerTask('autotest:unit', ['karma:unit_auto']);

  grunt.registerTask('devserver', [
    'server'
  ]);

  grunt.registerTask('build', [
    'jshint',
    'less',
    'copy',
    'requirejs'
  ]);
};

