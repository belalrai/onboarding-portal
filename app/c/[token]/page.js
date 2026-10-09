'use client';
import {useEffect,useState} from 'react';
import {FORMS,calc} from '../../../lib/forms';import Field from '../../../lib/Field';import Files from '../../../lib/Files';
export default function C({params}){const u=`/api/c/${params.token}`;const [s,setS]=useState(null);const [cur,setCur]=useState(0);const [d,setD]=useState({});const [m,setM]=useState('');
const load=async()=>{const r=await fetch(u);if(!r.ok)return setS(false);setS(await r.json())};useEffect(()=>{load()},[]);
const F=FORMS[cur];const R=s&&s.forms[F.key];useEffect(()=>{setD((R&&R.data)||{});setM('')},[cur,s]);
if(s===null)return <p>Loading...</p>;if(s===false)return <div className="card">This link is not valid. Please contact HR.</div>;
const off=R&&R.status==='submitted';const set=(k,v)=>setD({...d,[k]:v});
const vis=f=>!f.s||d[f.s[0]]===f.s[1];
const send=async sub=>{if(sub){const miss=F.f.filter(f=>vis(f)&&!f.o&&!(f.t==='file'?(d[f.k]||[]).length:d[f.k]));if(miss.length||!d.sig)return setM('Please complete every required field and type your full name as your signature.')}
const x={...d};if(sub)x.signedAt=new Date().toLocaleDateString('en-GB');const r=await fetch(u,{method:'POST',body:JSON.stringify({form:F.key,data:x,submit:sub})});if(r.ok){setM(sub?'Submitted. Thank you.':'Saved.');load()}else setM('Could not save. Please try again.')};
const saveNow=x=>fetch(u,{method:'POST',body:JSON.stringify({form:F.key,data:x,submit:false})});const done=FORMS.filter(f=>s.forms[f.key]&&s.forms[f.key].status==='submitted').length;const pct=calc({...s.forms,[F.key]:{data:d,status:R?R.status:'draft'}});
return <div><h1>Welcome, {s.name}</h1><div className="card"><b>{pct}% complete</b><div className="bar"><i style={{width:pct+'%'}}/></div></div>
<div className="g"><div>{FORMS.map((f,i)=>{const r=s.forms[f.key];const st=r?r.status:'';return <button key={f.key} className={'step'+(i===cur?' on':'')} onClick={()=>setCur(i)}>{f.title} {st==='submitted'?'(done)':st==='returned'?'(returned)':''}</button>})}</div>
<div className="card"><h2>{F.title}</h2>{R&&R.status==='returned'&&<p style={{color:'#b3382c'}}><b>HR asks you to update this form:</b> {R.note}</p>}
{F.f.filter(vis).map(f=>f.t==='file'?<Files key={f.k} f={f} form={F.key} list={d[f.k]} off={off} url={u+'/upload'} onChange={l=>{const x={...d,[f.k]:l};setD(x);saveNow(x)}}/>:<Field key={f.k} f={f} v={d[f.k]} set={set} off={off}/>)}
{!off&&<><label>Signature: type your full name</label><input value={d.sig||''} onChange={e=>set('sig',e.target.value)}/><small>The date and time are recorded automatically when you submit.</small></>}
{off&&<p>Signed by {d.sig} on {d.signedAt}</p>}
{!off&&<div><button className="alt" onClick={()=>send(false)}>Save draft</button><button onClick={()=>send(true)}>Submit this form</button></div>}<p role="status">{m}</p></div></div></div>}
