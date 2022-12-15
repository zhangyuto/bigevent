$(function () {
    let layer = layui.layer
    let form = layui.form
    initCates()
    initEditor()
    //定义加载文章分类的方法
    function initCates() {
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            success: function (res) {
                // console.log(res)
                if (res.status !== 0) {
                    return layer.msg('获取文章分类失败')
                }
                let strHTML = template('cates_tpl', res)
                $('#art_cates').html(strHTML)
                form.render()
            }
        });
    }
    //实现裁剪功能
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
    //实现选择封面功能
    $('#chooseImg').on('click', function () {
        $('#uploadFile').click()
    })
    //实现跟据上传的图片完成裁剪区域图片更换功能
    $('#uploadFile').on('change', function (e) {
        let files = e.target.files
        // console.log(file)
        if (files.length === 0) {
            return layer.msg('请选择图片')
        }
        //跟据文件创建对应的url地址
        let newImgURL = URL.createObjectURL(files[0])
        // 先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域：
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })
    let art_state = '已发布'
    //当点击保存草稿时状态变为草稿
    $('#artDraft').on('click', function () {
        art_state = '草稿'
    })
    //为表单提供提交事件
    $('#artCreate').on('submit', function (e) {
        e.preventDefault()
        let fd = new FormData($(this)[0])
        fd.append('state', art_state)
        //将剪裁后的图片，输出为文件
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                // fd.forEach(function (v, k) {
                //     console.log(v, k)
                // })
                publishArticle(fd)
            })
    })
    // 发布文章的方法
    function publishArticle(fd) {
        $.ajax({
            type: 'post',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('发布文章失败')
                }
                layer.msg('发布文章成功')
                location.href = '/大事件项目/article/art_list.html'
            }
        })
    }

})
