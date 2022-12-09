$(function () {
    let layer = layui.layer
    var $image = $('#image')
    // 1.2 配置选项 
    const options = {
        // 纵横比 
        aspectRatio: 1,
        // 指定预览区域 
        preview: '.img-preview'
    }
    // 1.3 创建裁剪区域 
    $image.cropper(options)
    $('#upload').on('click', function () {
        $('#file').click()
    })
    //监听文件选择框的change事件
    $('#file').on('change', function (e) {
        // console.log(e.target.files)
        if (e.target.files.length === 0) {
            return layer.msg('请选择图片')
        }
        //拿到用户选择的文件
        let files = e.target.files[0]
        // 将文件转化为路径
        let newFileUrl = URL.createObjectURL(files)
        // console.log(newFileUrl)
        // 初始化裁剪区域
        $image.cropper('destroy')//销毁旧的
            .attr('src', newFileUrl)//路径赋值
            .cropper(options)//传新的
    })
    $('#uploadBtn').on('click', function () {
        // 转换为base64格式
        var dataURL = $image.cropper
            ('getCroppedCanvas',
                { // 创建一个 Canvas 画布 
                    width: 100, height: 100
                })
            .toDataURL('image/png')
            $.ajax({
                type: "post",
                url: "/my/update/avatar",
                data: {
                    avatar:dataURL
                },
                success: function (res) {
                    console.log(res)
                    if(res.status!==0) {
                        return layer.msg('更新头像失败')
                    }
                    layer.msg('更新成功')
                    window.parent.getuserInfo()

                }
            });
    })
})