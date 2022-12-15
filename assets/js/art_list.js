$(function () {
    let form = layui.form
    let laypage = layui.laypage
    let layerIndex = null
    //分页
    let q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    initList()
    initCate()
    //调用模板引擎渲染文章列表
    function initList() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                // console.log(res)
                if (res.status !== 0) {
                    return layer.msg('获取文章列表数据失败')
                }
                let htmlStr = template('list_tpl', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }
        })
    }
    //时间美化过滤器
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)
        let y = padZero(dt.getFullYear())
        let m = padZero(dt.getMonth() + 1)
        let d = padZero(dt.getDate())
        let hh = padZero(dt.getHours())
        let mm = padZero(dt.getMinutes())
        let ss = padZero(dt.getSeconds())
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }
    //定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    //动态获取文章分类数据
    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            method: 'get',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章分类数据失败')
                }
                let strHtml = template('cates_tpl', res)
                $('[name=cate_id]').html(strHtml)
                form.render()
            }
        })
    }
    //实现筛选功能
    $('#screenList').on('submit', function (e) {
        e.preventDefault()
        q.cate_id = $('[name=cate_id]').val()
        q.state = $('[name=state]').val()
        initList()
    })
    //实现分页功能
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',//分页容器的id
            count: total, //数据总数，从服务端得到
            limit: q.pagesize,//每页显示几条数据
            curr: q.pagenum,//设置默认被选中得分页
            //触发jump有两种方式:
            //1.首次加载 第二个参数值为true
            //2.点击分页 第二个参数值为undifined
            jump: function (obj, first) {
                // console.log(obj.curr)
                // console.log(first)
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    initList()
                }
            },
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 4, 6, 8, 10]

        });
    }
    //事件委托实现删除文章功能
    $('tbody').on('click', '#deleteBtn', function () {
        let id = $(this).attr('data-id')
        //统计删除按钮个数
        let delength = $('.layui-btn-danger').length
        console.log(delength)
        console.log(id)
        layerIndex = layer.confirm('确定删除此篇文章吗?', function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {

                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    if (delength == 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }

                    initList()
                }
            })

            layer.close(layerIndex);
        });

    })

})