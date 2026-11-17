const session=require('express-session');
class PostgresSessionStore extends session.Store {
 constructor(pool){super();this.pool=pool;this.gc=setInterval(()=>this.pool.query('DELETE FROM sessions WHERE expires<=?',[Math.floor(Date.now()/1000)]).catch(()=>{}),900000);this.gc.unref()}
 get(id,callback){this.pool.query('SELECT data,expires FROM sessions WHERE session_id=? LIMIT 1',[id]).then(([rows])=>{if(!rows.length)return callback(null,null);if(rows[0].expires<=Math.floor(Date.now()/1000)){this.destroy(id,()=>callback(null,null));return}callback(null,JSON.parse(rows[0].data))}).catch(callback)}
 set(id,value,callback){const exp=value.cookie&&value.cookie.expires?Math.floor(new Date(value.cookie.expires).getTime()/1000):Math.floor(Date.now()/1000+((value.cookie&&value.cookie.maxAge)||3600000)/1000);this.pool.query('INSERT INTO sessions(session_id,expires,data) VALUES(?,?,?) ON CONFLICT(session_id) DO UPDATE SET expires=EXCLUDED.expires,data=EXCLUDED.data',[id,exp,JSON.stringify(value)]).then(()=>callback&&callback(null)).catch(e=>callback&&callback(e))}
 touch(id,value,callback){const exp=value.cookie&&value.cookie.expires?Math.floor(new Date(value.cookie.expires).getTime()/1000):Math.floor(Date.now()/1000+((value.cookie&&value.cookie.maxAge)||3600000)/1000);this.pool.query('UPDATE sessions SET expires=? WHERE session_id=?',[exp,id]).then(()=>callback&&callback(null)).catch(e=>callback&&callback(e))}
 destroy(id,callback){this.pool.query('DELETE FROM sessions WHERE session_id=?',[id]).then(()=>callback&&callback(null)).catch(e=>callback&&callback(e))}
 close(){clearInterval(this.gc)}
}
module.exports=PostgresSessionStore;
