(()=>{

  //设置 set-li 的 marginn负数；通过css媒体查询设置屏幕低于769的都为 transform 缩放
  function resize(){
    if(window.innerWidth<=769){
      $('.set-li').map(function(e,a){
        var height=$(a).height()/2
        $(a).css('margin-bottom',-height)
      })
    }else{
      $('.set-li').css('margin-bottom','auto')
    }
    // 设置table样式
    $('.passage-article>table').map(function(index,a){
      let fwidth=$('.passage-article').width()
      let cwidth=$(a).width()+2
      let cheight=$(a).height()+2
      let ratio=fwidth/cwidth
      let minus=cheight-(cheight*fwidth/cwidth)
      $(a).css({
        'transform':'scale('+ ratio +')',
        'margin-bottom':- minus,
        'transform-origin': '0 0'
      })
    })
  }
  resize()
  $(window).resize(function(){
    resize()
  })
})()