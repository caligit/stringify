var myWindowId;
const contentBox = document.getElementById("content");
const customerNumberBox = document.getElementById("number");
const regex = new RegExp("(\\b[A-Za-z0-9]+\\/{1}[A-Za-z0-9]*\\.|\\b\\w{0,5}\\.)")
document.getElementById("clear").addEventListener("click", clear);
document.getElementById("number").addEventListener("input", setCustomerNumber);
document.getElementById("xid").addEventListener("change", stringify);
document.getElementById("customer").addEventListener("change", stringify);
document.getElementById("content").addEventListener("input", stringify);
document.getElementById("number").addEventListener("input", stringify);
function clear(){
	contentBox.value = "";
}

function stringify(){
	var resultArr = [];
	var userInput = contentBox.value.split('\n');
	var xidBoxVal = document.getElementById("xid").value;
	var addCustNumBoxVal = document.getElementById("customer").value;
	var string;
	var res;
	var domainName;
	if(addCustNumBoxVal === "1"){
		var customerNumber = document.getElementById("number").value;
	}else{
		customerNumber = "";
	}
	switch(xidBoxVal){
		case "xid":
			for(var i = 0; i  < userInput.length; i++){
				string = userInput[i];
				if(string.trim() === "+" || string.toUpperCase().trim() === "ADD TO FAVORITES" || string.trim() === ""){
					continue;
				}else{
					domainName = hasDomain(string);
					if(domainName != null){
						res = string.split(domainName)[1];
					}else{
						res = string;
					}
					if(addCustNumBoxVal === "1"){
						res = customerNumber + "_" + res;
					}
					resultArr.push(res);
					res = "";
				}
			}
			break;
		case "gid":
			for(var i = 0; i  < userInput.length; i++){
				string = userInput[i];
				if(string.trim() === "+" || string.toUpperCase().trim() === "ADD TO FAVORITES" || string.trim() === ""){
					continue;
				}else{
					if(addCustNumBoxVal === "1"){
						res = customerNumber + "_" + string;
					}else{
						res = string;
					}
					resultArr.push(res);
					res = "";
				}
			}
			break;
		case "all":
			for(var i = 0; i  < userInput.length; i++){
				string = userInput[i];
				if(string.trim() === ""){
					continue;
				}else {
					if (addCustNumBoxVal === "1") {
						res = customerNumber + "_" + string;
					} else {
						res = string;
					}
					resultArr.push(res);
					res = "";
				}
			}
			break;
	}
	document.getElementById("string").value = resultArr.join(",");
}

function getCustomerNumber(){
	try{
		if(!localStorage.getItem('customer')){
			localStorage.setItem('customer', 'enter number')
			document.getElementById("number").value = localStorage.getItem('customer');
		}else{
			document.getElementById("number").value = localStorage.getItem('customer');
		}
	}catch(error){
		alert("Error getting or setting custy number: " + error);
	}
}

function setCustomerNumber(){
	try{
		var number = document.getElementById("number").value;
		localStorage.setItem('customer', number);
	}catch(error){
		alert("Error getting or setting custy number: " + error);
	}
}

function hasDomain(string){
	var match = string.match(regex);
	if(match === null){
		return null;
	}
	return match[0];
}


getCustomerNumber();
