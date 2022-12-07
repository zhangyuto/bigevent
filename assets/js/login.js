$(function () {
    //点击去登录页面切换
    $('#login').on('click', function () {
        $('.register-box').show()
        $('.login-box').hide()

    })
    //点击去注册页面切换
    $('#register').on('click', function () {
        $('.register-box').hide()
        $('.login-box').show()
    })
    // 密码校验
    let form = layui.form
    let layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        reg: function (value) {
            let pwd = $('#password').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })
    //监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: "post",
            url: "/api/reguser",
            data: {
                username: $('.register-box [name=username]').val(),
                password: $('.register-box [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功')
                $('#register').click()
            }
        });
    })
    //监听登录表单的提交事件
    $('#form_login').submit(function (e) { 
        e.preventDefault()
        // console.log($(this).serialize())
        // let msg = $(this).serialize()
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if(res.status!==0) {
                    return layer.msg('登陆失败')
                }
                layer.msg('登录成功')
                console.log(res.token)
                localStorage.setItem('token',res.token)
                location.href ='/大事件项目/index.html'
            }

        })
     })
})