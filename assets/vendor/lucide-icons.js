(()=>{var u={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};var B=([e,a,o])=>{let r=document.createElementNS("http://www.w3.org/2000/svg",e);return Object.keys(a).forEach(t=>{r.setAttribute(t,String(a[t]))}),o?.length&&o.forEach(t=>{let s=B(t);r.appendChild(s)}),r},M=(e,a={})=>{let r={...u,...a};return B(["svg",r,e])};var D=(...e)=>e.filter((a,o,r)=>!!a&&a.trim()!==""&&r.indexOf(a)===o).join(" ").trim();var F=e=>{for(let a in e)if(a.startsWith("aria-")||a==="role"||a==="title")return!0;return!1};var L=e=>{let a="",o=!1;for(let r of e){if(r==="-"||r==="_"||r<=" "){o=a.length>0;continue}a.length===0?a+=r.toLowerCase():a+=o?r.toUpperCase():r,o=!1}return a};var R=e=>{let a=L(e);return a.charAt(0).toUpperCase()+a.slice(1)};var O=e=>Array.from(e.attributes).reduce((a,o)=>(a[o.name]=o.value,a),{}),y=e=>typeof e=="string"?e:!e||!e.class?"":e.class&&typeof e.class=="string"?e.class.split(" "):e.class&&Array.isArray(e.class)?e.class:"",d=(e,{nameAttr:a,icons:o,attrs:r})=>{let t=e.getAttribute(a);if(t==null)return;let s=R(t),f=o[s];if(!f)return console.warn(`${e.outerHTML} icon name was not found in the provided icons object.`);let l=O(e),T=F(l)?{}:{"aria-hidden":"true"},P={...u,"data-lucide":t,...T,...r,...l},q=y(l),b=y(r),A=D("lucide",`lucide-${t}`,...q,...b);A&&Object.assign(P,{class:A});let U=M(f,P);return e.parentNode?.replaceChild(U,e)};var p=[["path",{d:"M12 5v14"}],["path",{d:"m19 12-7 7-7-7"}]];var m=[["path",{d:"m12 19-7-7 7-7"}],["path",{d:"M19 12H5"}]];var x=[["path",{d:"M5 12h14"}],["path",{d:"m12 5 7 7-7 7"}]];var i=[["path",{d:"M7 7h10v10"}],["path",{d:"M7 17 17 7"}]];var n=[["path",{d:"m5 12 7-7 7 7"}],["path",{d:"M12 19V5"}]];var c=[["path",{d:"M20 4v7a4 4 0 0 1-4 4H4"}],["path",{d:"m9 10-5 5 5 5"}]];var C=[["path",{d:"m15 10 5 5-5 5"}],["path",{d:"M4 4v7a4 4 0 0 0 4 4h12"}]];var h=[["path",{d:"m10 15 5 5 5-5"}],["path",{d:"M4 4h7a4 4 0 0 1 4 4v12"}]];var S=[["path",{d:"M20 20v-7a4 4 0 0 0-4-4H4"}],["path",{d:"M9 14 4 9l5-5"}]];var g=[["path",{d:"m15 14 5-5-5-5"}],["path",{d:"M4 20v-7a4 4 0 0 1 4-4h12"}]];var w=[["path",{d:"M12 15V3"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["path",{d:"m7 10 5 5 5-5"}]];var k=({icons:e={},nameAttr:a="data-lucide",attrs:o={},root:r=document,inTemplates:t}={})=>{if(!Object.values(e).length)throw new Error(`Please provide an icons object.
If you want to use all the icons you can import it like:
 \`import { createIcons, icons } from 'lucide';
lucide.createIcons({icons});\``);if(typeof r>"u")throw new Error("`createIcons()` only works in a browser environment.");if(Array.from(r.querySelectorAll(`[${a}]`)).forEach(f=>d(f,{nameAttr:a,icons:e,attrs:o})),t&&Array.from(r.querySelectorAll("template")).forEach(l=>k({icons:e,nameAttr:a,attrs:o,root:l.content,inTemplates:t})),a==="data-lucide"){let f=r.querySelectorAll("[icon-name]");f.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(f).forEach(l=>d(l,{nameAttr:"icon-name",icons:e,attrs:o})))}};k({icons:{Download:w,ArrowLeft:m,ArrowUp:n,ArrowDown:p,ArrowUpRight:i,ArrowRight:x,CornerRightDown:h,CornerDownLeft:c,CornerDownRight:C,CornerUpLeft:S,CornerUpRight:g}});})();
/*! Bundled license information:

lucide/dist/esm/defaultAttributes.mjs:
lucide/dist/esm/createElement.mjs:
lucide/dist/esm/shared/src/utils/mergeClasses.mjs:
lucide/dist/esm/shared/src/utils/hasA11yProp.mjs:
lucide/dist/esm/shared/src/utils/toCamelCase.mjs:
lucide/dist/esm/shared/src/utils/toPascalCase.mjs:
lucide/dist/esm/replaceElement.mjs:
lucide/dist/esm/icons/arrow-down.mjs:
lucide/dist/esm/icons/arrow-left.mjs:
lucide/dist/esm/icons/arrow-right.mjs:
lucide/dist/esm/icons/arrow-up-right.mjs:
lucide/dist/esm/icons/arrow-up.mjs:
lucide/dist/esm/icons/corner-down-left.mjs:
lucide/dist/esm/icons/corner-down-right.mjs:
lucide/dist/esm/icons/corner-right-down.mjs:
lucide/dist/esm/icons/corner-up-left.mjs:
lucide/dist/esm/icons/corner-up-right.mjs:
lucide/dist/esm/icons/download.mjs:
lucide/dist/esm/lucide.mjs:
  (**
   * @license lucide v1.47.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
