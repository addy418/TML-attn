var reasonPhrase = "";
var msg = context.getVariable('response.content');
var flag = false;

if(msg.toLowerCase().indexOf("operationoutcome") != -1){
  flag =  false;
}
else {
  	flag = true;    
    if(statusCode == 400){
      reasonPhrase = "Bad Request";
      if(msg==null || msg==""){
     	 msg = "Resource could not be parsed or failed basic FHIR validation rules.";
      }
    }
 	 else if(statusCode == 404){
      reasonPhrase = "Not Found ";
      if(msg==null || msg==""){
      	msg = "Resource type not supported, or not a FHIR end point."; 
      }
    }
 	 else if(statusCode == 405){
      reasonPhrase = "Method Not allowed ";
      if(msg==null || msg==""){
      	msg = "The resource did not exist prior to the update, and the server does not allow client defined ids"; 
      }
    }  
 	else if(statusCode == 422){
      reasonPhrase = "Unprocessable Entity";
      if(msg==null || msg==""){
       	msg = "The proposed resource violated applicable FHIR profiles or server business rules." ;
      }  
    }
  	else if(statusCode == 500){
      reasonPhrase = "Internal Server Error";
      if(msg==null || msg==""){
      	msg = "Internal Server Error"; 
      }
    }
   //set updated varaibles
   context.setVariable('response.reason.phrase',reasonPhrase);
   context.setVariable('response.content',msg);
}

context.setVariable('flag',flag);
print("statusCode..."+statusCode);
print("reasonPhrase..."+reasonPhrase);
print("msg..."+msg);
