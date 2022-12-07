//在执行$.ajax或$.get,$.post时会先执行$.ajaxPrefilter,将url拼接起来
$.ajaxPrefilter(function (options) {
    console.log(options.url)
    options.url = 'http://www.liulongbin.top:3007' + options.url
})