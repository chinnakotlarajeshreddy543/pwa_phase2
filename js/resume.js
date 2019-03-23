var param;
var paramValue;
var query;
query=window.location.search.substring(1).split("?");
for(i in query){
  param=query[i].split("=");
  paramValue=parseInt(param[1]);
}

//communication with index data base
var request;
var idb=window.indexedDB || window.mozIndexedDB || window.msIndexedDB || window.webitIndexedDB;
if(!idb in navigator){
  alert("Browser is not supporting");
}
var open=idb.open("MyDatabase",1);
console.log("IndexedDB is created");

open.onupgradeneeded=function(event){
  var request=event.target.result;
  var storeDB=request.createObjectStore("Formdata",{keyPath:"id",autoIncrement:true});
}
open.onerror=function(error){
  console.log("Object store is not created",+error);
}
open.onsuccess=function(event){
  request=event.target.result;
  var transaction=request.transaction("Formdata","readwrite");
  var storeDB=transaction.objectStore("Formdata");
  var info=storeDB.get(paramValue);
  info.onsuccess=function(data){
    console.log(data.target.result);
    display(data.target.result);
  }
}

var left=document.querySelector(".left");
var right=document.querySelector(".right");
function display(data){
  var img=document.createElement("img");
  img.src="images/boy.svg";
  left.append(img);

  var h3=document.createElement("h1");
  h3.textContent=data.name;
  left.append(h3);

  var role=document.createElement("h4");
  role.textContent=data.role;
  left.append(role);

  var email=document.createElement("h4");
  email.textContent=data.email;
  left.append(email);

  var mobile=document.createElement("h4");
  mobile.textContent=data.mobile;
  left.append(mobile);



  var summary=document.createElement("h1");
  summary.textContent="Carrier Objective:";
  right.append(summary);

  var table=document.createElement('table');
  let row='';
  row +="<tr>"+"<th>"+"Degree"+"</th>"+
  "<th>"+"Institute" +"</th>"+
  "<th>"+"Course" +"</th>"+
  "<th>"+"Percentage"+"</th>"
  "</tr>";
  for(i in data.education){
    row +="<tr>"+"<td>"+data.education[i].degree+"</td>"+
    "<td>"+data.education[i].college +"</td>"+
    "<td>"+data.education[i].branch +"</td>"+
    "<td>"+data.education[i].marks +"</td>"
    "</tr>";
    table.innerHTML=row;
    right.appendChild(table);
  }
  var skills=document.createElement("h1");
  skills.textContent="Skills:";
  right.append(skills);

  var mob=document.createElement("h4");
  mob.textContent=data.skills;
  right.append(mob);


}
