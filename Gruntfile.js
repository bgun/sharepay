module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      development: {
        // Compile all targeted LESS files individually
        options: {
          compress: true
        },
        // target name
        files: {
          "public/css/setup.css"  : "public/css/setup.less",
          "public/css/styles.css" : "public/css/styles.less",
          "public/css/cart.css"   : "public/css/cart.less"
        }
      }
    },
    watch: {
      styles: {
        // Which files to watch
        files: ['public/css/*.less'],
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['watch']);

};
