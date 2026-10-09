'use client';
export default function Field({f,v,set,off}){const p={value:v||'',disabled:off,onChange:e=>set(f.k,e.target.value)};let i;
if(f.t==='area')i=<textarea {...p}/>;
else if(f.t==='yn')i=<select {...p}><option value="">Choose</option><option>Yes</option><option>No</option></select>;
else if(f.t.startsWith('select:'))i=<select {...p}><option value="">Choose</option>{f.t.slice(7).split(',').map(o=><option key={o}>{o}</option>)}</select>;
else if(f.t==='check')return <label><input type="checkbox" disabled={off} checked={v==='Yes'} onChange={e=>set(f.k,e.target.checked?'Yes':'')}/>{f.l}</label>;
else i=<input type={f.t} {...p}/>;
return <div><label>{f.l}{f.o?' (optional)':''}</label>{i}</div>}
