import {db} from '../../../../lib/db';
const get=async t=>{const {data:r}=await db.from('referees').select('*').eq('token',t).maybeSingle();if(!r)return {};const {data:c}=await db.from('candidates').select('name').eq('id',r.candidate_id).single();return {r,c}};
export async function GET(_,{params}){const {r,c}=await get(params.token);if(!r)return Response.json({},{status:404});return Response.json({name:r.name,candidate:c.name,done:r.status==='received'})}
export async function POST(req,{params}){const {r}=await get(params.token);if(!r||r.status==='received')return Response.json({},{status:409});const b=await req.json();await db.from('referees').update({data:b.data,status:'received'}).eq('token',params.token);return Response.json({ok:1})}
