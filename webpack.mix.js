const mix = require('laravel-mix');

mix.options({
    terser: {
        extractComments: false,
        terserOptions: {
            compress: {
                drop_console: true,
            },
        },
    },
})
    .setPublicPath('public')
    .js('resources/src/js/app.js', 'public/assets/js/app.js')
    .version()

mix.disableSuccessNotifications();
