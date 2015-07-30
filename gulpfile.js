'use strict';

var Config = {
        tmpDir: './.tmp',
        outputDir: './dist'
    },

    __ = function(string) {
        if(string.match(/\{\{.*\}\}/ig)) {
            for(var i in Config) {
                var _regex = new RegExp('{{( )*' + i + '( )*}}', 'ig');
                string = string.replace( _regex, Config[i]);
            }
        }

        return string;
    };


var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var plumber = require('gulp-plumber');
var stringReplace = require('gulp-regex-replace');

// Firefox
gulp.task('firefox-addon-sdk', function () {
    console.log('Start building for [Firefox Addon SDK] ...');

    return gulp.src([
            'custom/firefox.js',
            'src/common.js',
            'src/kryptos/kryptos.js',
            'src/kryptos/Cipher/AES.js',
            'src/kryptos/Cipher/Blowfish.js',
            'src/kryptos/Cipher/DES3.js',
            'src/kryptos/Cipher/ARC4.js',
            'src/kryptos/Hash/baseHash.js',
            'src/kryptos/Hash/SHA.js',
            'src/kryptos/Hash/SHA256.js',
            'src/kryptos/Hash/MD5.js',
            'src/kryptos/Hash/HMAC.js',
            'src/kryptos/PublicKey/RSA.js',
            'src/kryptos/PublicKey/DSA.js',
            'src/kryptos/Random/_UserFriendlyRNG.js',
            'src/kryptos/Random/Fortuna/SHAd256.js',
            'src/kryptos/Random/Fortuna/FortunaAccumulator.js',
            'src/kryptos/Random/Fortuna/FortunaGenerator.js',
            'src/kryptos/Random/OSRNG/browser.js',
            'src/python_shim.js',
            'src/BigInteger.js',
            'src/agent.js',
            'src/auth_handler.js',
            'src/ber.js',
            'src/channel.js',
            'src/client.js',
            'src/compress.js',
            'src/dsskey.js',
            'src/file.js',
            'src/hostkeys.js',
            'src/kex_gex.js',
            'src/kex_group1.js',
            'src/kex_group14.js',
            'src/message.js',
            'src/packet.js',
            'src/pkey.js',
            'src/rsakey.js',
            'src/sftp_attr.js',
            'src/sftp_client.js',
            'src/sftp_file.js',
            'src/sftp.js',
            'src/ssh_exception.js',
            'src/transport.js',
            'src/unknown_key.js',
            'src/util.js',
            'src/win_pageant.js',
            'custom/exporter.js',
        ])
        .pipe(stringReplace({regex:'Components.classes', replace:'Cc'}))
        .pipe(stringReplace({regex:'Components.interfaces', replace:'Ci'}))
        .pipe(stringReplace({regex:'Components.utils', replace:'Cu'}))
        .pipe(stringReplace({regex:'Components', replace:'components'}))
        //.pipe(sourcemaps.init())
        .pipe(concat('paramikojs.js'))
        //.pipe(plumber())
        //.pipe(babel())
        //.pipe(sourcemaps.write("../dist-map/"))
        //.pipe(uglify())
        .pipe(gulp.dest('dist/firefox-addon-sdk'));
});

gulp.task('clean', function() {

});

gulp.task('default', ['clean'], function() {
    gulp.start('firefox-addon-sdk');
});
