const t=document.querySelector("button[data-start]");console.log(t);const e=document.querySelector("button[data-stop]");console.log(e);let o=null;t.addEventListener("click",(()=>{o=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`,t.setAttribute("disabled","true"),e.removeAttribute("disabled")}),1e3)})),e.addEventListener("click",(()=>{clearInterval(o),t.removeAttribute("disabled"),e.setAttribute("disabled","true")}));
//# sourceMappingURL=01-color-switcher.4d7dfa1b.js.map
