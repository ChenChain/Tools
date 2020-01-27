#### 1. 说明

该插件是基于 [link](https://www.jq22.com/jquery-info22105)  插件 进行开发 ，因为 我对前端插件了解不多，在针对自己的项目需求上对 [link]( https://www.jq22.com/jquery-info22105)资源的学习与参考下，整合完善出符合自己需求的插件 。 相对于原来插件内容上删除了页面按钮等部分内容，增加了ajax异步查询后台数据并返回前台的功能。[参考项目link](// https://www.jq22.com/jquery-info22105), 参考项目作者昵称**懒羊羊**。

#### 2. 使用

引入  ` jquery.js pageAjax.js pageAjax.css `后即可使用

配置部分代码如下

```html
<div id="page"></div>
</body>
<script src="/js/jquery-3.4.1.js"></script>
<script type="text/javascript" src="/js/pageAjax.js"></script>
<script>
    // pageAjax.js 使用方法
    $("#page").paging({
        url:"admin/testjs", //ajax请求路由
        nowPage: 6, // 当前页码
        pageNum: 30, // 总页码
        buttonNum: 6, //要展示的页码数量
        canJump: 1,// 是否能跳转。0=不显示（默认），1=显示
        showOne: 0,//只有一页时，是否显示。0=不显示,1=显示（默认）
        callback:function (data) {
            //data 即为ajax传递过来的查询数据
            alert(data);
            //此处针对data进行数据处理或者渲染
        }
    });
</script>
```

可选与默认配置如下

```html
  this.options = {
            url: options.url,
            nowPage:  1, // 当前页码
            pageNum: options.pageNum, // 总页码
            canJump:  0, // 是否能跳转。0=不显示（默认），1=显示
            showOne:  1,//只有一页时，是否显示。0=不显示,1=显示（默认）
            callback: options.callback , // 回调函数
            //搜索条件
            search1:'',
            search2:"",
            search3:"",
            search4:'',
            search5:'',
            pageSize:5, //一页显示数据数目
            dataBox:'' //返回数据存放html的id或者class
        };
	//可以针对查询需求修改搜索附加条件的数量
```

#### 3.更新记录

- 1.26 解决第一次刷新页面不加载数据 需要点击按钮的情况
- 1.27 增加对分页插件`pageHelper`的整合使用，完善页面总页码的显示，不需要手动赋值控制 

