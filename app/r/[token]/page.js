'use client';
import {useEffect,useState} from 'react';import Field from '../../../lib/Field';
const F=[['rel','Your job title and relationship to the candidate'],['known','How long have you known the candidate?'],['dates','Dates they worked for you (from, to)'],['why','Reason for leaving'],['cmt','Comments on their suitability for work with children','area'],['re','Would you re-employ them?','yn'],['con','Any concerns about their conduct, disciplinary action or safeguarding? Give details, or write "None"','area'],['sig','Type your full name as signature']].map(([k,l,t])=>({k,l,t:t||'text'}));
export default function R({params}){const u=`/api/r/${params.token}`;const [s,setS]=useState(null);const [d,setD]=useState({});const [m,setM]=useState('');
useEffect(()=>{fetch(u).then(r=>r.ok?r.json():false).then(setS)},[]);
if(s===null)return <p>Loading...</p>;if(!s)return <div className="card">This link is not valid.</div>;if(s.done)return <div className="card"><h1>Thank you</h1><p>Your reference has been received.</p></div>;
const set=(k,v)=>setD({...d,[k]:v});
return <div className="card"><h1>Reference for {s.candidate}</h1><p>Dear {s.name}, thank you for helping. Your answers are confidential.</p>{F.map(f=><Field key={f.k} f={f} v={d[f.k]} set={set}/>)}
<button onClick={async()=>{if(F.some(f=>!d[f.k]))return setM('Please answer every question.');const r=await fetch(u,{method:'POST',body:JSON.stringify({data:{...d,signedAt:new Date().toLocaleDateString('en-GB')}})});if(r.ok)setS({done:1});else setM('Could not send. Please try again.')}}>Submit reference</button><p role="status">{m}</p></div>}
