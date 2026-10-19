// 只绑定本机，只读静态服务器，无第三方依赖。
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.md':'text/plain; charset=utf-8','.json':'application/json; charset=utf-8'};
const server=http.createServer((req,res)=>{
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);return res.end();}
  let url;try{url=new URL(req.url,'http://localhost');}catch{res.writeHead(400);return res.end();}
  if(url.pathname==='/'){res.writeHead(302,{Location:'/learn/index.html'});return res.end();}
  let relative;try{relative=decodeURIComponent(url.pathname);}catch{res.writeHead(400);return res.end();}
  const file=path.resolve(root,'.'+(relative==='/'?'/learn/index.html':relative));
  if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}
  fs.readFile(file,(err,data)=>{if(err){res.writeHead(404);return res.end('Not found');}res.writeHead(200,{'Content-Type':types[path.extname(file)]||'text/plain; charset=utf-8','X-Content-Type-Options':'nosniff'});res.end(req.method==='HEAD'?undefined:data);});
});
server.listen(8765,'127.0.0.1',()=>console.log('Open http://localhost:8765/learn/index.html (Ctrl+C to stop)'));
server.on('error',err=>{console.error(err.message);process.exitCode=1;});
