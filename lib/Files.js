'use client';
import {useState} from 'react';
const MAX=4*1024*1024;
const squeeze=f=>new Promise(res=>{if(!f.type.startsWith('image/')||f.size<600*1024)return res(f);const i=new Image();i.onload=()=>{const s=Math.min(1,1800/Math.max(i.width,i.height));const c=document.createElement('canvas');c.width=i.width*s;c.height=i.height*s;c.getContext('2d').drawImage(i,0,0,c.width,c.height);c.toBlob(b=>res(b?new File([b],f.name.replace(/\.\w+$/,'')+'.jpg',{type:'image/jpeg'}):f),'image/jpeg',.82)};i.onerror=()=>res(f);i.src=URL.createObjectURL(f)});
export default function Files({f,form,list=[],off,url,onChange}){const [busy,setBusy]=useState('');const [err,setErr]=useState('');
const add=async e=>{setErr('');let cur=list;const fs=[...e.target.files];e.target.value='';
for(const raw of fs){setBusy('Uploading '+raw.name+'...');const file=await squeeze(raw);if(file.size>MAX){setErr(raw.name+' is too large (max 4 MB). Please use a smaller file or take a smaller photo.');continue}
const fd=new FormData();fd.append('form',form);fd.append('field',f.k);fd.append('file',file);const r=await fetch(url,{method:'POST',body:fd});
if(!r.ok){let m='';try{m=(await r.json()).error}catch{}setErr(m||('Could not upload '+raw.name));continue}cur=[...cur,await r.json()];onChange(cur)}setBusy('')};
const rm=async x=>{await fetch(url,{method:'DELETE',body:JSON.stringify({path:x.path})});onChange(list.filter(y=>y.path!==x.path))};
return <div><label>{f.l}{f.o?' (optional)':''}</label>{list.map(x=><div key={x.path} className="fl">{x.name} ({Math.max(1,Math.round(x.size/1024))} KB){!off&&<a href="#" onClick={e=>{e.preventDefault();rm(x)}}> remove</a>}</div>)}
{!off&&<input type="file" multiple accept="image/*,.pdf" onChange={add} disabled={!!busy}/>}{busy&&<p role="status">{busy}</p>}{err&&<p role="alert" style={{color:'#b3382c'}}>{err}</p>}</div>}
