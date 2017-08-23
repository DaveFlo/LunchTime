if(localStorage.getItem("user")!=null){
    	$.mobile.navigate( "#inicio", {transition:"pop" });
}
var user="";
    var school="";
    var ban = false;
    function login(){
    	var form = new FormData($("#logForm")[0]);
    	
    	form.append("regID",localStorage.getItem('registrationId'));
    	$.ajax({
	url: "http://www.icone-solutions.com/tlunch/sqlOP.php",
	type: "POST",
	data: form,
	contentType: false,
	cache: false,
	processData:false,
	async: false,
	success: function(data){
		$(".loads").hide();
	    if(data.toString()!=="0"){
	    	var datos = data.toString().split(",");
	    	user = datos[0];
	    	school = datos[1];
	    	credit = datos[2];
	    	localStorage.setItem("user",user);
            localStorage.setItem("school",school);
            localStorage.setItem("credit",credit);
            $(".usuario").text(localStorage.getItem("user"));
            
	    	$.mobile.navigate( "#inicio", { transition : "slide",info: "info about the #foo hash" });


	    }else{
           
	    	$("#mess").text("Usuario o contraseña incorrectos");
	    	$("#mess").show();
	    }
	    $("#enter").prop("disabled",false);
	}

        });
    }
$(document).ready(function(){
    
    $("#logForm").submit(function(e){
    	e.preventDefault();
	$("#mess").hide();
	var form = this;
	$("#enter").prop("disabled",true);
	$(".loads").show();
	
	setTimeout("login()",3000);
   });
   
    var iFrequency = 5000; // expressed in miliseconds
      var myInterval = 0;

      // STARTS and Resets the loop if any
 function getCredit(){
 	var user = localStorage.getItem("user");
	$.ajax({
	url: "http://www.icone-solutions.com/tlunch/sqlOP.php",
	type: "POST",
	data: {correo: user},
	success: function(data){
		$(".loads").hide();
		
	    	var jsonObj = jQuery.parseJSON(data);
	    	
	    	credit = jsonObj[0];
            localStorage.setItem("credit",credit);
            $(".credit").text("$"+localStorage.getItem("credit"));
            
	    	
	}

        });
	}
function startLoop() {
    
    myInterval = setInterval( getCredit, iFrequency ); 
 
}



startLoop();

});
