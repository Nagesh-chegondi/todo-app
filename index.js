const express =require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const JWT_SECRET = "ILOVESAMYUKTHA";




app.use(express.json());
app.use(cors())
let info=[];

app.post('/signup', (req, res) => {
    const {email,password} = req.body;
    if(!email || !password || email.trim() === '' || password.trim() === ''){
        return res.status(400).json({error: 'Email and password are required'}); 
       
    }
    else{
        const user ={email,password};
        info.push(user);
        console.log(icnfo);
        return res.status(201).json({message: 'User signed up successfully', user});
        
    }
        
} );
let usere =null
app.post('/signin',(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password || email.trim() === '' || password.trim() === ''){
        return res.status(400).json({error: 'Email and password are required'});
    }
    else{
    for(let i=0;i<info.length;i++){
        if(info[i].email === email &&info[i].password === password ){
            
            usere=info[i];

            
        }



            
        
        if(usere){
            const token = jwt.sign({
                email:email
            },JWT_SECRET);
            // usere.token = token;
            // console.log(token);
            return res.status(201).json({token:token});
            
        }
        else{
            return res.status(401).json({error: 'Invalid email or password'});
        }

    }
    

}
    });
    app.get('/me',(req,res)=>{
        let token =req.headers.token;
        if(token){
        let decodedinfo = jwt.verify(token,JWT_SECRET);
        for(let i=0;i<info.length;i++){
            if(decodedinfo.email===info[i].email){
                return res.status(201).json({email:info[i].email,
                    password:info[i].password,
                    todo:info[i].todo

                })
            }
        }
    }
    else{
        return res .status(401).json({message:"user not signed in please first sign in"});
    }


    });

    app.post('/adtodo',(req,res)=>{
         let token =req.headers.token;
         let tada = req.body.todo;
         
         
        if(token){
        let decodedinfo = jwt.verify(token,JWT_SECRET);
        for(let i=0;i<info.length;i++){
            if(decodedinfo.email===info[i].email){
                
  if (!info[i].todo) {
    info[i].todo = [];  // Initialize if missing
  }
  info[i].todo.push(tada);
  return res.status(201).json({todo:info[i].todo})  // Add task
}
                

                }
            
        }
            
        
    
        else{
            return res .status(401).json({message:"user not signed in please first sign in"});
        }   
       res.json({message:"yeah this is me"});
    })

app.listen(5000);
console.log('Server is running on http://localhost:5000/');