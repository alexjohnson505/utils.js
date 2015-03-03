
/********************
      Utils.js
 ********************/

// Split the array into an N different arrays
// http://stackoverflow.com/questions/8188548/splitting-a-js-array-into-n-arrays

function split(array, n) {
  var length = array.length
  var bins = [];
  var i = 0;

  while (i < length) {
      var size = Math.ceil((length - i) / n--);
      bins.push(array.slice(i, i + size));
      i += size;
  }

  return bins;
}

// Retrieve data from localStorage
function getLocalStorage(key){
	return JSON.parse(localStorage.getItem(key));
}

// Set item in local storage
function setLocalStorage(key, data){
	localStorage.setItem(key, JSON.stringify(data))
}

function api_url(domain){
	url : (window.location.href.indexOf(domain) > -1) ? domain : "http://localhost:5000/api/",
}

var loading = {};

// UI Feedback Indicator
loading.start = function(){
	$("#loading").text("Loading...");
};

// UI Feedback Indicator
loading.end = function(){
	$("#loading").text("");
};

DOM = {};

// Provide User Feedback in the Document
DOM.log = function(msg){
	$("#log").prepend("<p>" + msg + "</p>");
}

/******************************
     API / CRUD Functionality
 ******************************/

// Reference on XHR callbacks
// http://stackoverflow.com/questions/5485495/how-can-i-take-advantage-of-callback-functions-for-asynchronous-xmlhttprequest

// GET
// takes target URL, callback, callback
DV.api.get = function(url, success, error){
	var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
      
      // If call is complete & successfull
      if (xhr.readyState == 4 && xhr.status == 200) {
        var resp = JSON.parse(xhr.response);
        success(resp);

      } else if (xhr.readyState == 4 && xhr.status != 200) {
        console.log("API Call Error.");
        console.log(xhr.response);

        error(xhr);
      }
    };

    xhr.open("GET", DV.url + url, false);
    xhr.send();
}

DV.api.post = function(url, params, success, error){
	var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
      
      // If call is complete & successfull
      if (xhr.readyState == 4 && xhr.status == 200) {
        success(JSON.parse(xhr.response));

      } else if (xhr.readyState == 4 && xhr.status != 200) {
        console.log("API Call Error.");
      
        error(xhr);
      }
    };

	xhr.open("POST", DV.url + url, false);

    // Send the proper header information along with the request
  	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  	// xhr.setRequestHeader("Connection", "close");
    
    // var params = JSON.stringify(params);
    // console.log(params);
    xhr.send(params);
}

/******************************
         Coloring
 ******************************/

// Maps the input number to the output
// color. Input between 0 and 100 maps
// to the range of red -> green
function getColor(i){

  if (i < 0){
    i = 0;
  } else if (i > 1){    
    i = 1;
  }

  var r = Math.floor(255 * i);
  var g = Math.floor(255 - 255 * i);
  var b = 0;

  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

// http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}