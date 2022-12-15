$(function () {
    let layer = layui.layer
    let layerIndex = null
    let form = layui.form
    initArtCateList()
    function initArtCateList() {
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            success: function (res) {
                // console.log(res)
                if (res.status !== 0) {
                    return layer.msg('获取列表失败')
                }
                let str = template('get_tpl', res)
                $('tbody').html(str)
            }
        })
    }
    // 为添加类别绑定弹出层事件
    $('.addbtn').on('click', function () {
        layerIndex = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类'
            , content: $('#dialog_add').html()
        });
    })
    //为弹出层立即添加表单提交事件
    $('body').on('submit', '#form_add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: $('#form_add').serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('添加失败')
                }
                initArtCateList()
                layer.msg('添加成功')
                layer.close(layerIndex)
            }
        })
    })
    //事件委托 点击修改弹出对话框
    $('tbody').on('click', '#changeContent', function () {
        layerIndex = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类'
            , content: $('#dialog_change').html()
        })
        //根据id获取文章分类数据
        let id = $(this).attr('data-id')
        $.ajax({
            method: 'get',
            url: '/my/article/cates/' + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类信息失败')
                }
                form.val('form_edit', res.data)
            }
        })
    })
    //事件委托 点击立即修改 修改文章分类数据
    $('body').on('submit', '#form_change', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                initArtCateList()
                layer.close(layerIndex)

            }
        })
    })
}) 
