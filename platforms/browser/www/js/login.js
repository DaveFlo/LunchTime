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
	    	nombre = datos[3];
	    	localStorage.setItem("user",user);
	    	localStorage.setItem("nombre",nombre);
            localStorage.setItem("school",school);
            localStorage.setItem("credit",credit);
            $(".usuario").text(localStorage.getItem("nombre"));
            
	    	$.mobile.navigate( "#inicio", { transition : "slide",info: "info about the #foo hash" });


	    }else{
           
	    	$("#mess").text("Usuario o contraseña incorrectos");
	    	$("#mess").show();
	    }
	    $("#enter").prop("disabled",false);
	}

        });
    }
    function register(){
    	var form = new FormData($("#regForm")[0]);
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
	    if(data.toString()=="0"){
	    	var datos = data.toString().split(",");
	    	
            swal("Listo","Tu usuario ha sido registrado exitosamente.","success");
	    	$.mobile.navigate( "#login", { transition : "slide",info: "info about the #foo hash" });


	    }else{
           swal("Error",data.toString(),"error");
	    }
	    $("#rega").prop("disabled",false);
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
   
   $("#regForm").submit(function(e){
    	e.preventDefault();
	$("#mess").hide();
	var form = this;
	$("#rega").prop("disabled",true);
	$(".loads").show();
	
	setTimeout("register()",3000);
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
	
	function getSchools(){
	$.ajax({
	url: "http://www.icone-solutions.com/tlunch/sqlOP.php",
	type: "POST",
	data: {school: 1},
	
	success: function(data){
            
		var jsonObj = jQuery.parseJSON(data);
		var id = jsonObj[0].split(",");
		var nombres = jsonObj[1].split(",");
		if(nombres[0]!=""){
		for(var i=0;i<nombres.length;i++){
			
			$("#schoolList").append('<option value="'+id[i]+'">'+nombres[i]+'</option>');
		}
       }
    }
   
    });
    }
function startLoop() {
    
    myInterval = setInterval( getCredit, iFrequency ); 
 
}

getSchools();

startLoop();
});
