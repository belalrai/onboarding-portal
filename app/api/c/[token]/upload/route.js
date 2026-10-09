import {db,tok} from '../../../../../lib/db';import {FORMS} from '../../../../../lib/forms';
export const dynamic='force-dynamic';const B='candidate-files';
const cand=t=>db.from('candidates').select('id').eq('token',t).maybeSingle();
const J=(o,s)=>Response.json(o,{status:s||200});
export async function POST(req,{params}){try{const {data:c}=await cand(params.token);if(!c)return J({},404);
const fd=await req.formData();const form=fd.get('form'),field=fd.get('field'),file=fd.get('file');
const F=FORMS.find(x=>x.key===form),fl=F&&F.f.find(x=>x.k===field&&x.t==='file');
if(!fl||!file||typeof file==='string')return J({error:'Invalid upload'},400);
if(!(file.type.startsWith('image/')||file.type==='application/pdf'))return J({error:'Only photos and PDF files are allowed'},400);
if(file.size>4*1024*1024)return J({error:'File is too large (max 4 MB)'},413);
const {data:o}=await db.from('responses').select('status').eq('candidate_id',c.id).eq('form_key',form).maybeSingle();if(o&&o.status==='submitted')return J({error:'This form is already submitted'},409);
const name=String(file.name||'file').replace(/[^\w.\- ]/g,'_').slice(0,80);const path=`${c.id}/${form}/${field}/${tok()}-${name}`;
const {error}=await db.storage.from(B).upload(path,Buffer.from(await file.arrayBuffer()),{contentType:file.type});
if(error)return J({error:'Upload failed: '+error.message},500);return J({path,name,size:file.size})}catch(e){return J({error:'Upload failed: '+e.message},500)}}
export async function DELETE(req,{params}){const {data:c}=await cand(params.token);const b=await req.json();if(!c||!String(b.path).startsWith(c.id+'/'))return J({},404);await db.storage.from(B).remove([b.path]);return J({ok:1})}
