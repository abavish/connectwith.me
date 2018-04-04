/* Created and modified by Vishal */

$(document).ready(function() {
	//code to fetch hash from url
	var fragmentVal;

	//check if hash(fragment) exists or not
	if(location.hash){
		fragmenVal = location.hash.substr(1); // eliminate the # sign 
		console.log(fragmentVal);
	}
	else{
		//alert("Invalid url");
	}

	//setting query variable that would be used as a parameter to retrieve user profile pic in the next function.
	// usr is a property in the imgfileupload which is assigned dynamically through the submit button on signup page
	var query = {"usr":fragmentVal};  
	
	//code to rertrieve the user profile pic and displaying in the associated img container
	dpd.imgfileupload.get(query, function(result, err) {
                console.log(result);
                console.log(result[result.length - 1].filename);
                $('#profilePic').attr('src', 'http://localhost:2403/upload/' + result[result.length - 1].filename);
            });


	
});