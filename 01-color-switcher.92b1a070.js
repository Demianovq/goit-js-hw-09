const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]");let d=null;t.addEventListener("click",(function(){if(o)return;o=!0,d=setInterval((()=>{const d=`#${Math.floor(16777215*Math.random()).toString(16)}`;document.body.style.backgroundColor=d,t.disabled=!0,e.disabled=!1}),1e3)})),e.disabled=!0;let o=!1;e.addEventListener("click",(()=>{document.body.style.backgroundColor="white",clearInterval(d),e.disabled=!0,t.disabled=!1}));
//# sourceMappingURL=01-color-switcher.92b1a070.js.map
