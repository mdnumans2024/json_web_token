const express = require('express');
const app = express();
const PORT= 8000 || 8080;
const jwt = require('jsonwebtoken');

//Route to issue a json web token 
app.post("/user/generateToken", (req, res) =>{
    const secret_key = 'supersecretkey';

    const user = {
        time: new Date(),
        id:15,
    }


    const token = jwt.sign(user, secret_key);

    res.send(token);

});


app.get('/user/validateToken', (req, res) =>{


    const secret_key = 'supersecretkey';

    const token = req.header.authorization.split(' ')[1];

    try{
        const verified = jwt.verify(token, secret_key);

        if(verified){
            res.json("User Successfully Verified.");
        }else{
            res.status(401).send("User not authorized");
        }

    }catch(error){
        res.status(500).send("Internal Server Error");

    }
});




app.listen(PORT, () =>{
    console.log(`Connected to port ${PORT}`);
});