module.exports = function (grunt) {

    //require('load-grunt-tasks')(grunt); //加载所有的任务
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    var rewrite = require( "connect-modrewrite" );
    //require('time-grunt')(grunt); 如果要使用 time-grunt 插件
    grunt.initConfig({
        connect: {
            options: {
                open:true,
                middleware: function ( connect, options, middlewares ) {
                    var rules = [
                        "!\\.html|\\.js|\\.css|\\.otf|\\.eot|\\.svg|\\.ttf|\\.woff|\\.jpg|\\.bmp|\\.gif|\\.png|\\.txt$ /index.html"
                    ];
                    middlewares.unshift( rewrite( rules ) );
                    return middlewares;
                }
            },
            server: {
                options: {
                    port: 5000,
                    base: "./"
                }
            }
        },
        watch: {
            livereload: {
                options: {
                    livereload: '<%=connect.options.livereload%>'  //监听前面声明的端口  35729
                },

                files: [  //下面文件的改变就会实时刷新网页
                    '*'

                ]

            }
        },
        uglify:{
            options: {
                banner: '/*! <%= pkg.file %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'//添加banner
            },
            build: {
                src: 'app/<%=pkg.file %>.js',
                dest: 'dest/<%=pkg.file %>.min.js'
            }


        }

    });

    grunt.registerTask('default', [
        'connect:server',
        'watch',
        'uglify'
    ]);
};