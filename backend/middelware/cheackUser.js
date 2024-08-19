module.exports.cheackUser=(req,res,next)=>{
     const currUser=req.user
     if(currUser.username===process.env.siteuser && currUser.email===process.env.userMail){
        next()
     }else{
        res.redirect('/')
     }
}