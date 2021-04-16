(()=>{
    var name=window.location.pathname
    var href=window.location.href
    var nums=window.AD_nums||2
    var isTrue=true
    if(name=='/blog/archives/'||name=='/blog/'){
        window.document.addEventListener('scroll',scrollTo,false)
    }else{
        window.document.removeEventListener('scroll',scrollTo)
    }

    /*滚动请求html*/
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

    /*archives处理数据*/
    function setArchives(e){
      var a=e.split('<main>')[1]
      var b=a.split('</main>')[0]
      var d=$(b)
      d.find('h2').remove()
      $('main .timeline').append(d.children())
    }
    /*home处理数据*/
    function setHome(e){
      var a=e.split('<main>')[1]
      var b=a.split('</main>')[0]
      $('main').append($(b).find('.clearfix'))
    }

    /*滚动函数*/
    function scrollTo(e){
        var a=$(window).height()
        var b=$(document).scrollTop()
        var c=document.body.scrollHeight
        if(a+b+350>=c){
            getHtml()
        }
    }
    
})()