/*处理页面顶部进度条*/
(() => {
  const handleScoll = (() => { //处理滚动事件的函数
    const process = document.querySelector('#site-process');
    let isRunning = false; // 用于防止滚动事件处理函数重复执行的标志

    return () => { // 返回的滚动事件处理函数
      if (isRunning) return; // 如果正在执行中，直接返回，避免重复执行
      isRunning = true; // 标记为正在执行

      window.requestAnimationFrame(ts => { // 使用 requestAnimationFrame 确保在浏览器重绘之前完成计算
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop, // 获取页面滚动的顶部距离
          scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight, // 获取页面总高度
          clientHeight = document.documentElement.clientHeight || document.body.clientHeight; // 获取视口高度

        isRunning = false; // 完成计算后，标记为未执行状态

        let percent = 100 * scrollTop / (scrollHeight - clientHeight); // 计算滚动进度百分比
        if(percent > 99) { // 如果滚动到页面底部
          percent = 100; // 进度设置为 100%
        } else if (percent < 1) { // 如果滚动到页面顶部
          percent = 0; // 进度设置为 0%
        }

        process.style.width = `${percent}%`; // 更新进度条的宽度
      });
    };
  })();

  // 刷新页面时，触发一次滚动事件处理函数，确保进度条正确显示
  handleScoll();

  // 监听全局滚动事件，当页面滚动时调用 handleScoll 函数
  document.addEventListener('scroll', handleScoll, false);
})();