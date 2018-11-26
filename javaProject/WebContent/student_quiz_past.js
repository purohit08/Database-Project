var n =10;

var questions = new Array(200);
var opts = new Array(200);
function getResponse(qNum, isObjective){
	var qid = questions[qNum];
	$.ajax({
        type: "GET",
        url: "QuizQuesResponse",
        data: {"qzid": qzid, "qid" :qid},
        success: function(data){
        	var data1 = (jQuery.parseJSON(data));
        	if(data1.status){
        	    var ans = "";
        		$.each(data1.data, function(k, v) {
        			ans = v.answer;
        		});
        		if(isObjective == 'true'){
        			var arr = ans.split(" ");
        			for(var i=0;i< arr.length; i++){
        				if(arr[i] != ""){
        					selectOption(qNum, parseInt(arr[i]));
        					document.getElementById(qNum + "o" + arr[i]).checked = true;	
        				}
        			}
        		}
        		else{
        			document.getElementById(""+qNum).innerHTML ='<b>Answer:</b> ' + ans;
        		}
        	}
        	else{
        		console.log(data1.message);
        	}
        }
    });  
}

function optionList(result, qlist, ans, isObjective, qNum)
{
    // Remove current options
    qlist.html('');
    ans.html('');
    if(result != ''){
    	var str = "";
    	if(isObjective == 'true'){
    		opts[qNum] = new Array(n);
    		for(var i=0;i<n;i++){
    			opts[qNum][i]=0;
    		}
    		
    		$.each(result, function(k, v) {
    			str+="<input type=\"checkbox\" disabled name=\"ops\" id ="+ qNum + "o"+ k +" onclick=\"selectOption("+qNum+","+k+")\">"+ v.opt + "<br>" ;
            });
    		str+="<br>";
    		
//    		str+="<form> <button type=\"button\" onclick=\"putResponse("+qNum+", "+ isObjective+ ")\" > Save answer</button> </form><br>";
//    		str+="<div class='separator2'></div>"
    		qlist.html(str);
    		
    	}
    	else{
    		str+="<br>" +"<p  id ="+ qNum +" name=\"ans\">Answer: </p>";
    		str+="<br>";
//    		str+="<form> <button type=\"button\" onclick=\"putResponse("+qNum+", "+ isObjective+ ")\" > Save answer</button> </form><br>";
//    		str+="<div class='separator2'></div>"
    		qlist.html(str);
    	}
    }
}
function questionList(result, list, qzid)
{
    // Remove current options
    list.html('');
    if(result != ''){
    	$.each(result, function(k, v) {
//    		console.log(v);
    		var k1 = k+1;
			var question = "<p>Q."+ k1.toString() + ": " + v.problem +"     [Marks:"+v.maxmarks.toString()+ "] </p>" +
					" <p id = op" + v.qid + " > </p>";
			list.append(question);
			var answer = "<p id = ans" + v.qid + "> </p><br>"+ 
			"<p id= cor"+v.qid+"> Correct answer is </p> " +
			"<p id= mark"+v.qid+"> Correct answer is </p> ";
			questions[k] = v.qid;
			list.append(answer);
    		$.ajax({
		        type: "GET",
		        url: "StudentQuizQuesOptions",
		        data: {"qzid": qzid, "qid": v.qid},
		        success: function(data){
		        	var data1 = (jQuery.parseJSON(data));
		        	if(data1.status){
			            optionList(
			                data1.data,
			                $('#op' + v.qid),
			                $('#ans' + v.qid),
			                v.isobjective,
			                k
			            );
			            getResponse(k, v.isobjective);
		        	}
		        	else{
		        		alert(data1.message);
		        		window.location.replace("illegalAccess.html");
		        	}
		        }
		    }); 
    		$.ajax({
		        type: "GET",
		        url: "StudentCorrectAnswer",
		        data: { "qid": v.qid},
		        success: function(data){
		        	var data1 = (jQuery.parseJSON(data));
		        	if(data1.status){
			            correctList(
			                data1.data,
			                $('#cor' + v.qid)
			            );
		        	}
		        	else{
		        		alert(data1.message);
		        		window.location.replace("illegalAccess.html");
		        	}
		        }
		    });
    		
    		$.ajax({
		        type: "GET",
		        url: "MarksObtained",
		        data: { "qid": v.qid, "qzid": qzid},
		        success: function(data){
		        	var data1 = (jQuery.parseJSON(data));
		        	if(data1.status){
			            markObtained(
			                data1.data,
			                $('#mark' + v.qid)
			            );
		        	}
		        	else{
		        		alert(data1.message);
		        		window.location.replace("illegalAccess.html");
		        	}
		        }
		    });
    		
        });
    }
}

$(document).ready(function() {
//	document.title = "Course:"
    document.getElementById("content").innerHTML =
    	"<div id = \"max\"></div><br>"+
    	"<div id = \"marksObtained\"></div><br>"+
            "<div id = \"questions\"></div><br>";
    document.getElementById("heading").innerHTML =  "Quiz";
    console.log("sdfsaf");
    console.log(qzid);
    $.ajax({
        type: "GET",
        url: "StudentQuizQuestions",
        data: {"qzid": qzid},
        success: function(data){
//        	console.log(data);
        	var data1 = (jQuery.parseJSON(data));
        	if(data1.status){
	            questionList(
	                data1.data,
	                $('#questions'),
	                qzid
	            );
        	}
        	else{
        		alert(data1.message);
        		//window.location.replace("illegalAccess.html");
        	}
        }
    }); 
    
    
    
    $.ajax({
        type: "GET",
        url: "QuizMaximumMarks",
        data: {"qzid": qzid},
        success: function(data){
        	var data1 = (jQuery.parseJSON(data));
        	if(data1.status){
	            MaxMarks(
	                data1.data,
	                $('#max')
	            );
        	}
        	else{
        		alert(data1.message);
        		window.location.replace("illegalAccess.html");
        	}
        }
    });
    
    
    $.ajax({
        type: "GET",
        url: "StudentQuizMarks",
        data: {"qzid": qzid},
        success: function(data){
//        	console.log(data);
        	var data1 = (jQuery.parseJSON(data));
        	if(data1.status){
	            quizmarksObtained(
	                data1.data,
	                $('#marksObtained')
	            );
        	}
        	else{
        		alert(data1.message);
        		//window.location.replace("illegalAccess.html");
        	}
        }
    }); 
   
});

function MaxMarks(result, list)
{
    // Remove current options
    list.html('');
    if(result != ''){
    	var str = 'Maximum marks:';
		$.each(result, function(k, v) {
			if(v.s != null)
					{
				str+= v.s + "<br>";
					}
			else{
				str+=  + "0<br>Please add a question";
			}
			
        });
		list.html(str);
    }
}

function selectOption(qNum,optNum)
{
	opts[qNum][optNum] = 1- opts[qNum][optNum];
}

function putResponse(qNum, isObjective)
{
	c = currTime();
	var s="";
	var qid = questions[qNum];
	if(isObjective){
		for(var i=0;i<n;i++)
		{
			if(opts[qNum][i]==1)
				{
				s+=i+ " ";
			}
		}
	}
	else{
		s = document.getElementById(""+qNum).value;
	}
	$.ajax({
        type: "GET",
        url: "PutResponse",
        data: {"qzid": qzid, "qid" :qid, "answer" : s, "time" : c},
        success: function(data){
//        	console.log(data);
        	var data1 = (jQuery.parseJSON(data));
        	if(data1.status){
	            alert("Successful");
        	}
        	else{
        		alert(data1.message);
        		//window.location.replace("illegalAccess.html");
        	}
        }
    }); 
	
	
}

function currTime()
{
	d = new Date()
	var  h = (d.getHours()<10?'0':'') + d.getHours();
	  var  m = (d.getMinutes()<10?'0':'') + d.getMinutes();
	  var s = (d.getSeconds()<10?'0':'') + d.getSeconds();
	  time = h + ':' + m+':'+s;
	y = new Date().toLocaleDateString();
	date = y[6]+y[7]+y[8]+y[9]+'-'+y[0]+y[1]+'-'+y[3]+y[4]
	s = date + ' '+time
	console.log(s)
	return s
}

function correctList(result, list)
{
    // Remove current options
    if(result != ''){
    	var str = '<b>Correct Answer is </b>';
		$.each(result, function(k, v) {
			str+= v.opt + "<br>";
        });
		list.html(str);
    }
}

function markObtained(result,list)
{
	var str = '<b> Marks obtained: </b>';
	if(result != ''){
    	
		$.each(result, function(k, v) {
			if(v.marksobtained!=-1)
			{str+= v.marksobtained + "<br>";}
			else{
				str+="Not corrected yet."
			}
			
        });
		
    }
	else{
		str+='Question not attempted. Hence 0 marks';
	}
	
	list.html(str);
	}

function quizmarksObtained(result,list)
{
	var str = '<b> Marks obtained in checked answers: </b>';
	if(result != ''){
    	
		$.each(result, function(k, v) {
			if(v.s!=-1)
			{str+= v.s + "<br>";}
			
			
        });
		
    }
	else{
		str+='Question not attempted. Hence 0 marks';
	}
	str +='Kindly refer to each question for details';
	list.html(str);
	}


