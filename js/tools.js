(()=>{

  //设置 set-li 的 marginn负数；通过css媒体查询设置屏幕低于769的都为 transform锁放
  function resize(){
    if(window.innerWidth<=769){
      $('.set-li').map(function(e,a){
        var height=$(a).height()/2
        $(a).css('margin-bottom',-height)
      })
    }else{
      $('.set-li').css('margin-bottom','auto')
    }
  }
  resize()
  $(window).resize(function(){
    resize()
  })
})()