var myWindowId;
const contentBox = document.getElementById("content");
const customerNumberBox = document.getElementById("number");
const regex = new RegExp("([A-Za-z0-9]+\/{0,1}[A-Za-z0-9]*\.)")
document.getElementById("clear").addEventListener("click", clear);
document.getElementById("number").addEventListener("input", setCustomerNumber);
document.getElementById("content").addEventListener("input", stringify);

function clear(){
	contentBox.value = "";
}

function stringify(){
	var resultArr = [];
	var userInput = contentBox.value.split('\n');
	var xidBoxVal = document.getElementById("xid").value;
	var addCustNumBoxVal = document.getElementById("customer").value;
	if(addCustNumBoxVal == "1"){
		var customerNumber = document.getElementById("number").value;
	}else{
		customerNumber = "";
	}
	switch(xidBoxVal){
		case "xid":
			for(var i = 0; i  < userInput.length; i++){
				string = userInput[i];
				if(string == "+" || string == "Add To Favorites"){
					continue;
				}else{
					if(hasDomain(string)){
						res = string.split(".")[1];
					}
					if(addCustNumBoxVal == "1"){
						res = customerNumber + "_" + res;
					}
					resultArr.push(res);
				}
			}
		break;
		case "gid":
			for(var i = 0; i  < userInput.length; i++){
				string = userInput[i];
				if(string == "+" || string == "Add To Favorites"){
					continue;
				}else{
					if(addCustNumBoxVal == "1"){
						res = customerNumber + "_" + string;
					}else{
						res = string;
					}
					resultArr.push(res);
				}
			}
		break;
		case "all":
			for(var i = 0; i  < userInput.length; i++){
				string = userInput[i];
				if(addCustNumBoxVal == "1"){
					res = customerNumber + "_" + string;
				}else{
					res = string;
				}
				resultArr.push(res);
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
	if(regex.test(string)){
		return true
	}
	return false;
}


getCustomerNumber();