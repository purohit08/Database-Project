
function buildList(result, list)
{
    console.log("Came into build list1");
    // Remove current options
    list.html('');
    if(result != ''){
    	$.each(result, function(k, v) {
        	console.log(v);
            list.append("<h3> <a href = \"InstructorSection?secid=" + v.secid + "\"> " +
            		v.courseid + " : " + v.coursename + ", " + v.semester +  ", " + v.year + 
            		"</a></h3>");
        });
    }
}
function goBack(){ 
	window.location.replace("Home.jsp");
}
$(document).ready(function() {
    document.getElementById("content").innerHTML =
    	"<button type=\"button\" class=\"btn-primary\" onclick=\"location.href='InstructorDB';\">  View Question Database </button><br><br>" +
        "<h4>Your Sections :</h4>"+
        "<div id = \"contentList\"> </div><br>"+
        "<button type=\"button\" class=\"btn-primary\" onclick=\"displayCreateSection()\">Create Section</button><br>"+
        "<div id=\"form1\"></div>";
    loadSections();
    showCreateSection();
    document.getElementById("form1").style.display = "none";
    $("#course").autocomplete({
        source : function(request,response){
            var xhttp;
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function(){
                 if (this.readyState == 4 && this.status == 200){
                     json= JSON.parse(this.responseText);
                     response(json.data);
                 }
            }
            xhttp.open("GET", "AutoCompleteSection?partial="+request.term, true);
            xhttp.send();
        }
    });
});

function loadSections(){
	$('#contentList').html('');
	$.ajax({
        type: "GET",
        url: "InstructorSections",
        success: function(data){
        	var data1 = (jQuery.parseJSON(data));
        	if(data1.status){
	            buildList(
	                data1.data,
	                $('#contentList')
	            );
        	}
        	else{
        		window.location.replace("illegalAccess.html");
        		console.log(data1.message);
        	}
        }
    }); 
}

function displayCreateSection() {
    var x = document.getElementById("form1");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
} 

function showCreateSection()
{
    var currentHTML =
    "<br><form id=\"newconversation\" onsubmit=\"createNewSection(this.course.value, this.year.value, this.semester.value)\">" +
    " Courseid: <input type=\"text\" id = \"course\" name=\"courseid\" >"+
    " Year: <input type=\"text\" id = \"year\" name=\"year\">"+
    " Semester: <input type=\"text\" id = \"semester\" name=\"semester\"><br><br>"+
    //"<input type=\"submit\""
    "<input class=\"btn-primary\" name=\"submit\" type=\"submit\" " + "value=\"Submit\" />"+
    "</form>";
    document.getElementById("form1").innerHTML = currentHTML;
    $("#course").autocomplete({
        source : function(request,response){
            var xhttp;
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function(){
                 if (this.readyState == 4 && this.status == 200){
                     json= JSON.parse(this.responseText);
                     response(json.data);
                 }
                 }
            xhttp.open("GET", "AutoCompleteSection?partial="+request.term+"&location=bottom", true);
              xhttp.send();}
    });
}

function createNewSection(courseid, year, semester)
{
	var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
         if (this.readyState == 4 && this.status == 200){
		    json_object = JSON.parse(this.responseText);
		    if(!(json_object.status)){
		        alert("Section not created due to some error");
		    }
		    else{
		        alert("Section created successfully!");
		    }
		    loadSections();
         }
    }
    xhttp.open("GET", "CreateSection?courseID="+courseid+"&year="+year+"&semester="+semester, true);
    xhttp.send();
}

