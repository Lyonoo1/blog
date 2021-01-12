let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  let htmlDom = document.getElementsByTagName('html')[0]
  if(htmlWidth >750) htmlWidth = 750
  htmlDom.style.fontSize = htmlWidth/20 + 'px'