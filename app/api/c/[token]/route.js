import {db} from '../../../../lib/db';import {FORMS,nowUK} from '../../../../lib/forms';
const get=t=>db.from('candidates').select('*').eq('token',t).maybeSingle();
export async function GET(_,{params}){const {data:c}=await get(params.token);if(!c)return Response.json({},{status:404});const {data:r}=await db.from('responses').select('*').eq('candidate_id',c.id);return Response.json({name:c.name,forms:Object.fromEntries((r||[]).map(x=>[x.form_key,x]))})}
export async function POST(req,{params}){const b=await req.json();const {data:c}=await get(params.token);if(!c||!FORMS.some(f=>f.key===b.form))return Response.json({},{status:404});
const {data:o}=await db.from('responses').select('status').eq('candidate_id',c.id).eq('form_key',b.form).maybeSingle();if(o&&o.status==='submitted')return Response.json({},{status:409});
await db.from('responses').upsert({candidate_id:c.id,form_key:b.form,data:b.submit?{...b.data,signedAt:nowUK(),signedAtISO:new Date().toISOString()}:b.data,status:b.submit?'submitted':'draft',note:null,updated_at:new Date().toISOString()});return Response.json({ok:1})}
