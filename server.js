
const path = require('path');
const Koa = require('koa');
const serve = require('koa-static');

const port = 9877;

const app = new Koa();
app.use(serve(path.join(__dirname, 'tmp')));
app.use(serve(path.join(__dirname, 'stub')));
app.use(serve(path.join(__dirname, 'dist')));
app.listen(port);
console.log(`app listening on port ${ port }.`);
