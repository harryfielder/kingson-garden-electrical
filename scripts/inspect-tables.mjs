import './seed-env.mjs'
import pg from 'pg'
const { Pool } = pg
const pool = new Pool({ connectionString: process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL })
const r = await pool.query(`
  select table_name from information_schema.tables
  where table_schema='public' and (table_name like '%txt_media%' or table_name like '%tstmnls%' or table_name like '%hero%' or table_name like '%cards%')
  order by table_name`)
console.log(r.rows.map(x => x.table_name).join('\n'))
const fk = await pool.query(`
  select tc.table_name, kcu.column_name, ccu.table_name as refs
  from information_schema.table_constraints tc
  join information_schema.key_column_usage kcu on tc.constraint_name = kcu.constraint_name
  join information_schema.constraint_column_usage ccu on ccu.constraint_name = tc.constraint_name
  where tc.constraint_type='FOREIGN KEY' and tc.table_name in ('txt_media','hero','cards')`)
console.log('\nFKs:'); fk.rows.forEach(x => console.log(` ${x.table_name}.${x.column_name} -> ${x.refs}`))
await pool.end()
