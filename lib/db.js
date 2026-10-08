import {createClient} from '@supabase/supabase-js';
import {createHash} from 'crypto';
export const db=createClient(process.env.SUPABASE_URL,process.env.SUPABASE_SERVICE_KEY,{auth:{persistSession:false}});
export const tok=()=>crypto.randomUUID().replace(/-/g,'');
export const adm=()=>createHash('sha256').update(String(process.env.ADMIN_PASSWORD)+'hl').digest('hex');
export const mail=(to,subject,html)=>fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+process.env.RESEND_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({from:'Harbour Light <hr@mail.harbourlight.uk>',reply_to:'hr@mail.harbourlight.uk',to:[to],subject,html})});
