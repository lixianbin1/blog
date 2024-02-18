(() => {
  function openGoogle(keywords) {
    keywords = `site:${window.location.hostname} ${decodeURIComponent(keywords)}`;
    let href = `https://www.google.com/search?q=${keywords}`;
    window.open(href);
  }

  const searchBtn = document.querySelector('#site-search'),
    nav = document.querySelector('#site-nav'),
    //搜索
    navBtn = document.querySelector('#site-nav-btn'),
    layer = document.querySelector('#site-layer'),
    layerContent = layer.querySelector('.site-layer-content'),
    title = document.querySelector('#site-layer-title'),
    searchDOM = document.querySelector('#site-layer-search');

  const inputDOM = searchDOM.querySelector('input'),
    iconDOM = searchDOM.querySelector('i');

  searchBtn.addEventListener('click', (e) => {
    layer.style.display = 'block';
    searchDOM.style.display = 'flex';
    inputDOM.focus();
    title.innerHTML = '搜索';

    window.AD_CONFIG.layer.add(() => {
      title.innerHTML = '';
      inputDOM.blur();
      searchDOM.style.display = 'none';
    });
  });

  inputDOM.addEventListener('keypress', (e) => {
    let key = e.which || e.keyCode,
      value = inputDOM.value.trim();

    if(key === 13 && value.length > 0) {
      openGoogle(value);
    }
  });

  iconDOM.addEventListener('click', (e) => {
    inputDOM.focus();
    let value = inputDOM.value.trim();
    if(value.length > 0) {
      openGoogle(value);
    }
  });

  navBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    layer.style.display = 'block';
    layerContent.style.display = 'none';
    nav.style.right = '0';

    window.AD_CONFIG.layer.add(() => {
      nav.style.right = '';
      layer.style.display = 'none';
      layerContent.style.display = '';
    });
  });


  //登录JS
  const { passwords, root } = window.AD_CONFIG;
  let [password, expires] = atob(window.localStorage.getItem('auth')).split(':'),
    now = new Date().getTime();

  if(passwords.includes(password) && now < expires) {
    $('#site-login').remove()
  }else{
    $('.loginTo').remove()
  }
  $('#canvas').hide()

  $('#site-login').click((e) => {
    function handleStopWheel(e) {
      e.preventDefault();
    }
    $('#site-toLogin').css('display','block')
    window.addEventListener("wheel",handleStopWheel,{passive: false})
    //关闭弹窗
    $('#site-layer-close').click(() => {
      $('#site-toLogin').css('display','none')
      window.removeEventListener("wheel",handleStopWheel)
    });
    //阻止冒泡
    $('.site-toLogin-content').click((e)=>{
      e.stopPropagation()
    })
    //登录
    $('.submit').click(()=>{
      const Password = $("#Password").val();
      if (!!Password) {
        const password = sha256( Password || "");
        const day = 86400000; // 一天的毫秒数
        const expires = new Date().getTime() + day * 3;
        window.localStorage.setItem('auth', btoa(`${password}:${expires}`));
        $("#Password").val("");
      }
      window.location.href = root;
    })
  })
})();