import express, {Response, Request } from 'express';
import {router} from './routes/loginRoutes';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';


const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieSession({keys:['something']}));
app.use(router);

app.listen(3000, ()=>{
  console.log('Listning on port 3000');
})