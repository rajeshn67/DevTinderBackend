#devtinder Apis

##authrouter
-POST  /signup
-Post /login
-POST /logout

##profileRouter
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/password
  
##Connection request router
-POST /request/send/interested/:userId
-POST /request/send/ignored/:userId
-POST /request/recview/accepted/:requestId
-POST /request/recview/rejected/:requestId

33userRouter
-GET /user/connection 
-GET /user/request/
-GET /user/feed -Get you the profiles of other users on platform


-Status : ignored, interested, accepted, rejected
-
