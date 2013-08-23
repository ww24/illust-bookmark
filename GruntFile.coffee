# GruntFile.coffee

server = require "./server"

module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON "package.json"
    less:
      options:
        paths: ["static/css"]
      development:
        files:
          "static/css/style.css": "static/less/style.less"
    coffee:
      development:
        options:
          bare: true
          sourceMap: true
        files:
          "static/js/ui.js": "static/coffee/ui.coffee"
    livereload:
      port: 35729
    regarde:
      less:
        files: "static/less/**"
        tasks: ["less"]
      coffee:
        files: "static/coffee/**"
        tasks: ["coffee"]
      livereload:
        files: ["views/**", "static/css/**", "static/js/**"]
        tasks: ["livereload"]

  grunt.loadNpmTasks "grunt-contrib-less"
  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-livereload"
  grunt.loadNpmTasks "grunt-regarde"

  grunt.registerTask "default", ->
    # express server start
    server.runServer "development"

    grunt.task.run [
      "less",
      "coffee"
      "livereload-start",
      "regarde"
    ]
