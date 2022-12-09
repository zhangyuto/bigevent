
$(function () {
    let layer = layui.layer
    let form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度不能超过6位'
            }
        }
    })
    initUserInfo()
    $('#reset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        // console.log($(this).serialize())
        $.ajax({
            url:'/my/userinfo',
            type:'post',
            data:$(this).serialize(),
            success : function (res) {
                if(res.status !== 0) {
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功')
                console.log(res)
                window.parent.getuserInfo()
            }
        })
    })
})
function initUserInfo() {
    $.ajax({
        type: "get",
        url: "/my/userinfo",
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            console.log(res)
            let form = layui.form
            // $('.layui-form-item [name=username]').val(res.data.username)
            //利用layui的方法form.val方法快速为表单赋值
            form.val('formUserInfo', res.data)

        }
    });
}