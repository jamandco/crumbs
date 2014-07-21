"use strict";

// var spawn = require('child_process').spawn;
var wrench = require('wrench');

var templatePath = __dirname+'/../template/'
var projectPath = process.cwd()+'/';

module.exports.initialize = function () {

    console.log(path.join(__dirname, "locale"))

    wrench.copyDirSyncRecursive(templatePath, projectPath, {
        forceDelete: true
    });

    // spawn('npm', ['install'], { cwd: projectPath });
    // spawn('bower', ['install'], { cwd: projectPath });

}