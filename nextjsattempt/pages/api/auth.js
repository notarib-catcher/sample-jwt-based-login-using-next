const jwt = require('jsonwebtoken')

export default function handler(req,res){
    if(req.method == 'POST'){
        try{
            let creds = JSON.parse(req.body)
            if(creds.username == 'ribcatcher' && creds.password == 'ribcatcher0001'){
                let auth = jwt.sign({"username":creds.username},"__DEVSECRET__",{expiresIn:'1d'})
                res.status(200)
                res.send(auth)
                return;
            }
            else{
                res.status(403)
                res.send('Incorrect credentials.')
                return;
            }
        }
        catch(error){
            res.status(418)
            res.send("Go fuck yourself.")
        }
        
    }
    else
    {
        res.status(418)
        res.send("Go fuck yourself.")
    }
}