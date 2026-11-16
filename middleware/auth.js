function requireAdmin(req,res,next){
 if(!req.session?.adminId){
  if(req.path.startsWith('/api/'))return res.status(401).json({error:'Please sign in.'});
  return res.redirect('/admin/login.html');
 }
 next();
}
module.exports={requireAdmin};
