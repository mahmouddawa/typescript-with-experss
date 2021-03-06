import {Router ,Request, Response, NextFunction } from 'express';

interface RequestWithBody extends Request{
body: {[key:string]:string|undefined};
}

function requireAuth(req:Request, res:Response, next:NextFunction):void{
if(req.session && req.session.LoggedIn){
  next();
  return;
}
else{
  res.status(403);
  res.send('Not Premitted');
}
}

const router = Router();

router.get('/login',(req:Request,res:Response)=>{
  res.send(`
    <form method="POST">
    <div>
    <label>Email</label>
    <input name="email" />
    </div>
    <div>
    <label>password</label>
    <input name="password"  type="password" />
    </div>
    <button>submit</button>
    </form>
  `);
});

router.post('/login', (req:RequestWithBody, res:Response)=>{
  const {email, password} = req.body;
  if(email && password && email === 'hi' && password === '12'){
      req.session = {LoggedIn : true};
      res.redirect('/');
  }
  else{
    res.send('invalid eamil or password');
  }
  
});
router.get('/', (req: Request, res:Response, requireAuth)=>{
  if(req.session && req.session.LoggedIn){
    res.send(`
      <div>
      <div>you are loggedin </div>
      <a href="/logout">logout</a>
      </div>
      `);
  }else{
    res.send(`
      <div>
      <div>you are not loggedin </div>
      <a href="/login">login</a>
      </div>
      `);
  }  
});

router.get('/logout',(req:Request, res:Response)=>{
  req.session = undefined;
  res.redirect('/');
});

router.get('/protected',requireAuth, (req:Request, res:Response)=>{
  res.send('protected route');
})

export {router};