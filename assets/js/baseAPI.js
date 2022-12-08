//在执行$.ajax或$.get,$.post时会先执行$.ajaxPrefilter,将url拼接起来
$.ajaxPrefilter(function (options) {
    console.log(options.url)
    options.url = 'http://www.liulongbin.top:3007' + options.url
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
       //无论成功还是失败都会执行这方法，如果获取用户信息失败，则跳转login页面
        //清除token
    options.complete = function (res) {
        console.log(res)
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/大事件项目/login.html'
        }
    }

})