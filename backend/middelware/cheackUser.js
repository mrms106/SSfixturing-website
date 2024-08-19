module.exports.cheackUser=(req,res,next)=>{
     const currUser=req.user
     if(currUser.username==="ShubhamShinde" && currUser.email==="ssfixturing1@gmail.com"){
        next()
     }else{
        res.redirect('/')
     }
}