import {createClient} from '@supabase/supabase-js';
import {createHash} from 'crypto';
import nodemailer from 'nodemailer';
export const db=createClient(process.env.SUPABASE_URL,process.env.SUPABASE_SERVICE_KEY,{auth:{persistSession:false}});
export const tok=()=>crypto.randomUUID().replace(/-/g,'');
export const adm=()=>createHash('sha256').update(String(process.env.ADMIN_PASSWORD)+'hl').digest('hex');
export const mail=async(to,subject,html)=>{try{const u=process.env.GMAIL_USER||'aashirbelal@gmail.com';
const t=nodemailer.createTransport({host:'smtp.gmail.com',port:465,secure:true,auth:{user:u,pass:process.env.GMAIL_APP_PASSWORD}});
await t.sendMail({from:`"Harbour Light" <${u}>`,replyTo:u,to,subject,html});return {ok:true}}catch(e){return {ok:false,status:e.message}}};
