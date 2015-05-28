jobbaExtraApp.factory('Authentication', function ($resource, $cookieStore) {
  this.login = function (credentials) {
  	$.ajax({
  		type: "GET",
  		url: "php/login.php",
  		data: credentials,
  		success: function(data){
  			return data;
  			console.log(data);
  		}

  	})
  };
  return this;
})