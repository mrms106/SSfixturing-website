module.exports.cheackUser=(req,res,next)=>{
     const currUser=req.user
     if(currUser.username==="demo" && currUser.email==="demo@gmail.com"){
        next()
     }else{
        res.redirect('/')
     }
}