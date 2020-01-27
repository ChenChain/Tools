;(function ($, window, document, undefined) {
    'use strict';
    function Paging(element, options) {
        this.element = element;
        this.options = {
            url: options.url,
            nowPage:  1, // 当前页码
            pageNum: 2, // 总页码
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
        $.extend(this.options,options);

        this.init();
        $("#nowPageAjaxInit").click();//第一次刷新加载数据
    }
    Paging.prototype =  {
        constructor : Paging,
        init : function() {
            this.createHtml();
            this.bindClickEvent();
            this.disabled();
        },
        createHtml : function(){
            var me = this;
            var nowPage = this.options.nowPage;
            var pageNum = this.options.pageNum;
            var canJump = this.options.canJump;
            var showOne = this.options.showOne;
            // alert("this==nowpage:"+nowPage);
            var content = [];
            //对nowPage进行判断
            nowPage = nowPage > pageNum ? pageNum : nowPage;
            nowPage = nowPage < 1 ? 1 : nowPage;
            //如果只有一页并且设置为不显示，则不进行渲染
            if(showOne && pageNum === 1){
                return '';
            }
            content.push("<ul>");
            content.push("<li id='firstPage' >首页：1</li>")
            content.push("<li class='xl-prevPage'>上一页</li>");
            //页面总数小于等于当前要展示页数总数，展示所有页面

            content.push("<li id='nowPageAjaxInit'> "+nowPage+"</li>")

            content.push("<li class='xl-nextPage'>下一页</li>");
            content.push("<li id='lastPage'>尾页："+pageNum+"</li>")
            if(canJump){
                content.push("<li class='xl-jumpText xl-disabled'>跳转到<input type='number' id='xlJumpNum'>页</li>");
                content.push("<li class='xl-jumpButton'>确定</li>");
            }
            content.push("</ul>");
            me.element.html(content.join(''));
            // DOM重新生成后每次调用是否禁用button
            setTimeout(function () {
                me.disabled();
            }, 20);

        },
        bindClickEvent: function(){
            var me = this;
            me.element.off('click', 'li');
            me.element.on('click', 'li', function () {
                var cla = $(this).attr('class');
                var id=$(this).attr('id');
                var num = parseInt($(this).html());
                var nowPage = me.options.nowPage;
                if( $(this).hasClass('xl-disabled') || cla === 'xl-jumpText'){
                    return '';
                }


                if (cla == 'xl-prevPage') {
                    if (nowPage !== 1) {
                        me.options.nowPage -= 1;
                    }
                } else if (cla == 'xl-nextPage') {
                    if (nowPage !== me.options.pageNum) {
                        me.options.nowPage += 1;
                    }
                }else if(cla == 'xl-jumpButton'){
                    var jumpNum=Number($('#xlJumpNum').val());
                    if (jumpNum<1||jumpNum>me.options.pageNum){
                        alert("页码错误");
                        return ;
                    }
                    me.options.nowPage =  jumpNum;

                }else{
                    me.options.nowPage = num;
                }

                //首页尾页判断
                if(id=='firstPage'){
                    me.options.nowPage=1;

                }else if(id=='lastPage'){
                    me.options.nowPage=me.options.pageNum;
                }


                me.createHtml();

                var datajson;//返回查询数据
                $.ajax({
                    url:me.options.url,
                    type:"GET",
                    datatype:"text",
                    data:{
                        //搜索条件
                        search1:me.options.search1,
                        search2:me.options.search2,
                        search3:me.options.search3,
                        search4:me.options.search4,
                        search5:me.options.search5,
                        pageNum:me.options.nowPage,//对应pageHelper的参数pageNum为当前页码
                        pageSize:me.options.pageSize
                    },
                    beforeSend:function(){

                    },
                    success:function(data){
                        var pages=data.total; //pageHelp的pageInfo的数据中的总页码数
                        me.options.pageNum=pages;//更新总页码数
                        //请求成功后，更新总页码
                        $("#lastPage").text("尾页："+pages);//页码渲染

                        var b = JSON.stringify(data);//即数据 此时转换成了json字符串
                        datajson=b;
                        if(me.options.dataBox==''){
                            // alert("当前dataBox为空")
                        }else {
                            //不建议在此处使用渲染
                            // 渲染方法
                            //var idbox=me.options.dataBox;
                            //$(idbox).text(b);
                        }
                        if (me.options.callback) {
                            if(datajson==null){
                                me.options.callback("无数据");
                            }
                            me.options.callback(datajson);
                        }

                    },

                });

            });

        },
        disabled: function () {
            var me = this;
            var nowPage = me.options.nowPage;
            var pageNum = me.options.pageNum;
            if (nowPage == 1) {
                me.element.children().children('.xl-prevPage').addClass('xl-disabled');
            }
            if (nowPage == pageNum) {
                me.element.children().children('.xl-nextPage').addClass('xl-disabled');
            }
        }
    }
    $.fn.paging = function (options) {
        return new Paging($(this), options);
    }
})(jQuery, window, document);