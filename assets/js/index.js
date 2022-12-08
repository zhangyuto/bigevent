$(function () {
    //获取用户信息
    getuserInfo()
    //点击退出按钮 跳转到登录页
    $('.quit').on('click', function () {
        let layer = layui.layer
        layer.confirm('确认退出？', { icon: 3, title: '提示' }, function (index) {
            // console.log('ok')
            localStorage.removeItem('token')
            location.href = '/大事件项目/login.html'
            layer.close(index);
        });
    })
})
//获取用户信息
function getuserInfo() {
    $.ajax({
        type: "get",
        url: "/my/userinfo",
        //请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            console.log(res)
            renderAvatar(res.data)
        },
        //无论成功还是失败都会执行这方法，如果获取用户信息失败，则跳转login页面
        //清除token
        // complete: function (res) {
        //     console.log(res)
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token')
        //         location.href = '/大事件项目/login.html'
        //     }
        // }
    });
}
//渲染头像以及欢迎***文字
function renderAvatar(userMsg) {
    let name = userMsg.nickname || userMsg.username
    $('.userInfo .text').html(`欢迎${name}`)
    let first = name[0].toUpperCase()
    if (userMsg.user_pic !== null) {
        $('.layui-nav-img').attr('src', userMsg.user_pic).show()
        $('.avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        $('.avatar').html(first).show()

    }
}