$(function () {
    let layer = layui.layer
    let form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/,'密码必须6到12位且不能出现空格'],
        newPwd: function (value) {
            if(value === $('.layui-form [name=oldPwd]').val()) {
                return '新密码不能与原密码相同'
            }
        },
        rePwd: function(value) {
            if(value !== $('.layui-form [name=newPwd]').val()) {
                return '两次密码不一致'
            }
        }
    })
    $('#changePwd').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type:'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if(res.status!==0) {
                    return layer.msg('更新密码失败')
                }
                console.log(res)
                layer.msg('更新密码成功')
                $('.layui-form')[0].reset()
             }
        })
    })
})