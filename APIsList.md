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
-POST /request/send/status/:userId

-Status : ignored, interested, accepted, rejected

-POST /request/recview/status/:requestId
-POST /request/recview/status/:requestId
-  status: accepted, rejected

 
##userRouter
-GET /user/requests/recieved
-GET /user/connections

-GET /user/feed -Get you the profiles of other users on platform




