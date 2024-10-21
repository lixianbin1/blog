(()=>{
  /*
    Scroll 自执行函数
    name：当前路由名称
    href：当前路由路径
    nums：当前分页请求的页数
  */
    var name=window.location.pathname
    var href=window.location.href
    var nums=window.AD_nums||2
    var isTrue=true
    /*
      绑定函数
      检测到当前页面是archives之后，绑定滚动函数，并执行一次，在不在当前页面的时候进行解绑处理
    */
    if(name=='/blog/archives/'||name=='/blog/'){
        window.document.addEventListener('scroll',scrollTo,false)
        getHtml()
    }else{
        window.document.removeEventListener('scroll',scrollTo)
    }

    /*
      请求Html的函数
      通过路由判断请求哪个HTML数据的函数
    */
    function getHtml(){
      if(isTrue){
        isTrue=false
        $.ajax({
          url:href+"page/"+nums+"/",
          success:function(e){
            isTrue=true
            if(name=='/blog/archives/'){
              setArchives(e)
            }else if(name=='/blog/'){
              setHome(e)
            }
            nums++
            window.AD_nums=nums
          }
        })
      }
    }

    /*
      Archives处理返回的HTML数据
      塞入当前的Archives页面的main元素，并进行渲染
    */
    function setArchives(e){
      var a=e.split('<main>')[1]
      var b=a.split('</main>')[0]
      var d=$(b)
      d.find('h2').remove()
      $('main .timeline').append(d.children())
    }
    /*
      Home处理数据
      塞入当前Home页面的main元素，并进行渲染
    */
    function setHome(e){
      var a=e.split('<main>')[1]
      var b=a.split('</main>')[0]
      $('main').append($(b).find('.clearfix'))
    }

    /*
      滚动函数
      当滚动条滚动到底部的时候触发的函数
    */
    function scrollTo(e){
        var a=$(window).height()
        var b=$(document).scrollTop()
        var c=document.body.scrollHeight
        if(a+b+350>=c){
            getHtml()
        }
    }
    
})()