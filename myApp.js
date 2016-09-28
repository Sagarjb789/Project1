	var myApp = angular.module('saleApp',['ngRoute']);
	myApp.run(function($rootScope){
		$rootScope.showSignUp = true;
		$rootScope.showLogIn = true;
		$rootScope.showLogOut = false;
		$rootScope.userNameText = null,
		$rootScope.showUserName = false;
		$rootScope.loggedInUserHomePage = false;
		$rootScope.userProductsPage = false;
		$rootScope.showAdminSignUp = true;
		$rootScope.showAdminLogIn = true;
		$rootScope.showAdminLogOut = false;
		$rootScope.showAdmin = false;
	});
	myApp.constant("productsUrl","http://localhost:5500/products/");
	myApp.constant("registeredUsersUrl","http://localhost:5500/appusers/");
	myApp.constant("registeredAdminUrl","http://localhost:5500/appadmin/");
	myApp.config(function($routeProvider){
		$routeProvider.when("/home", { 
			templateUrl : 'ProductPage.html',
			controller : 'defaultCtrl'
		}).when("/userRegistration",{
			templateUrl : 'userSignUpPage.html',
			controller : 'signUpCtrl'
		}).when("/userLogIn",{
			templateUrl : 'userLogInPage.html',
			controller : 'logInCtrl'
		}).when("/adminRegistration",{
			templateUrl : 'adminSignUp.html',
			controller : 'adminSignUpCtrl'
		}).when("/adminLogIn",{
			templateUrl : 'adminLogInPage.html',
			controller : 'adminLogInCtrl'
		}).when("/itemPage/:param",{
			templateUrl : 'Item.html',
			controller : 'itemPageCtrl'
		}).when("/userLogOut",{
			templateUrl : 'ProductPage.html',
			controller : 'logOutCtrl'
		}).when("/adminLogOut",{
			templateUrl : 'ProductPage.html',
			controller : 'adminLogOutCtrl'
		}).when("/admin",{
			templateUrl : 'admin.html',
			controller : 'adminCtrl'
		}).otherwise({
			templateUrl : 'ProductPage.html',
			controller : 'defaultCtrl'
		});
		
		
	});
	myApp.controller("userPageCtrl",function($scope,$http,$rootScope,productsUrl){
		console.log("saleApp");
		$scope.message="abhishek";
		$scope.productPage = true;
		$scope.products = null;
		$rootScope.userProductsPage = true;
		$scope.showProductsPage = true;
		$scope.allProducts = null;
		$scope.currentItem = null;
		$http.get(productsUrl)
	    .then(function(response) {
	        //First function handles success
	    	console.log(response.data);
	        //$scope.content = response.data;
	        $scope.products = response.data;
	    }, function(response) {
	        //Second function handles error
	    	console.log("error");
	        $scope.content = "Something went wrong";
	    });
		
		
		
	});
	myApp.controller("defaultCtrl",function($scope,$http,$rootScope,productsUrl){
		console.log("saleApp");
		$scope.message="abhishek";
		$scope.productPage = true;
		$scope.products = null;
		$scope.showProductsPage = true;
		$scope.allProducts = null;
		$scope.currentItem = null;
		$http.get(productsUrl)
	    .then(function(response) {
	        //First function handles success
	    	console.log(response.data);
	        //$scope.content = response.data;
	        $scope.products = response.data;
	    }, function(response) {
	        //Second function handles error
	    	console.log("error");
	        $scope.content = "Something went wrong";
	    });
		
		
		
	});
	myApp.controller('itemPageCtrl',function($scope,$http,$routeParams,$rootScope,productsUrl){
		$scope.param = $routeParams.param;
			$http.get(productsUrl+$scope.param)
		    .then(function(response) {
		        //First function handles success
		    	console.log("enetered");
				console.log("success");
				$scope.showProductsPage = false;
				$scope.showItemPage = true;
				$scope.currentItem = response.data;
		    }, function(response) {
		        //Second function handles error
		    	console.log("error");
		        $scope.content = "Something went wrong";
		    });
			$scope.purchase = function(){
				console.log("purchased");
				$scope.showItemPage = false;
				$scope.purchase=true;
				$scope.item = $scope.currentItem;
			};
		//};
	});
	myApp.controller('signUpCtrl',function($scope,$window,$http,$rootScope,registeredUsersUrl){
	   	// to increment the id, when the new user is stored.
	   	$scope.formHeading="User registration form";
	 // to increment the id, when the new user is stored.
	   	var id = 0;
	   	// counter when the show button is clicked. if 0 then hide the button else show the button.
	   	var showOrHide = 0;
	   	var phoneNumberReq = true;
	   	$scope.logInFormPage = true;
	   	$scope.confirmPage = false;
	   	$scope.signIn = false;
	   	// to display message when phone field is typed.
	   	$scope.phoneValidatorMessage = "";
	   	$scope.phoneNumberRequiredOrNot = true;
	   	// to display the show user button.
	   	$scope.showUserButton = false;
	   	// to display the "Show" or " Hide" users text in the button.
	   	$scope.showOrHideTxt = "Show Users";
	   	// to disable the input field after submitting the form.
	   	$scope.disableInput = false;
	   	// to display the table containing all users.
	   	$scope.showUsers = false;
	   	// to display the add user button. if "false" then disable else enable the button.
	   	$scope.addUsers = false;
	   	$scope.appusers = null;
	   	// regex pattern for the telephone.
	   	$scope.regex =/^\d{10}$/;
	   	//
	   	$scope.confirm = function(){
	   		console.log("confirm clicked");
	   		$scope.logInFormPage = false;
	   		$scope.confirmPage = true;
	   	};
	   	//
	   	$scope.backPageLink = function(){
	   		$scope.logInFormPage = true;
	   		$scope.confirmPage = false;
	   	};
	   	// function to submit the form.
		  $scope.formSubmit = function(user){
			  
		  // saving users to server.
		 $http.post(registeredUsersUrl,user)
 			 .then(function(newUser){
 			  console.log("saving= "+newUser.data);
// 				$scope.users.push(newUser);
 			 $scope.appusers.push(newUser);
 			 },function(response){
 				 console.log("unable to Post");
 			 });
	   		
		 $scope.logInFormPage = false;
	   	 $scope.confirmPage = false;
	   	 $scope.signInAfterRegistration=true;
	   		$scope.user.username="";
	   		$scope.user.password="";
		    $scope.loginForm.$setPristine();
		  };
		  
$scope.logIn = function(user){
			  
			  $scope.allusers = null;
			  $http.get(registeredUsersUrl)
			    .then(function(response) {
			        //First function handles success
			        //$scope.content = response.data;
			    	
			        $scope.allusers = response.data;
			        console.log("allusers = "+$scope.allusers);
			        angular.forEach($scope.allusers,function(value,key){
			        	var userNameExist = angular.equals(value.username,user.username);
			        	var passwordMatch = angular.equals(value.password,user.password);
						if(userNameExist && passwordMatch){
							console.log("user ="+value);
							$rootScope.showSignUp = false;
						    $rootScope.showLogIn = false;
							$rootScope.showLogOut = true;
							$rootScope.userNameText = value.firstName + " "+ value.lastName;
							$rootScope.showUserName = true;
							$rootScope.loggedInUserHomePage = true;
							$rootScope.userProductsPage=true;
							$scope.signInAfterRegistration = false;
							$scope.showProductsPage = true;
							$scope.showUserPage = true;
						}else{
							console.log("false"+value.password+" "+user.password);
						}
					});
			    }, function(response) {
			        //Second function handles error
			    	console.log("error");
			        $scope.content = "Something went wrong";
			    });
		};
		
		  $scope.phoneNumberOptional = function(emailValid,emailIdModified,modifiedPhoneNumberField){
		  	if(emailValid && emailIdModified){
		  		$scope.phoneValidatorMessage = "Phone Number is optional as you have entered a valid email id.";
		  		return true;
		  	}
		  };
		
		  $scope.phoneNumberSpecification = function(emailValid,modifiedPhoneNumberField,invalidPhoneNumber){
		  	if(modifiedPhoneNumberField && invalidPhoneNumber){
		  		$scope.phoneValidatorMessage = "Phone Number must be at least 10 digits.";
		  		return true;
		  	}
		  };
		
		  $scope.validFormOrNot = function(inValidLoginForm,inValidFirstName,inValidLastName,inValidEmail,inValidPwd,invalidPhoneNumber,unModifiedPhoneNumberField){
		  
		  	if(!inValidFirstName && !inValidLastName && !inValidEmail && !inValidPwd 
		  		&& invalidPhoneNumber && unModifiedPhoneNumberField){
		  		return false;
		  	}
		  	
		  	else if(!inValidFirstName && !inValidLastName && !inValidEmail && !inValidPwd 
		  		&& invalidPhoneNumber && !unModifiedPhoneNumberField){
		  		return true;
		  	}
		 
		  	else if(!inValidLoginForm){
		  		return false;
		  	}else{
		  		return true;
		  	}
		  };
	   

	   	   });
	myApp.controller('logInCtrl',function($scope,$rootScope,$http,registeredUsersUrl){
		$scope.signIn = true;
			
		$scope.logIn = function(user){
			  
			  $scope.allusers = null;
			  $http.get(registeredUsersUrl)
			    .then(function(response) {
			     
			        $scope.allusers = response.data;
			        console.log("allusers = "+$scope.allusers);
			        angular.forEach($scope.allusers,function(value,key){
			        	var userNameExist = angular.equals(value.username,user.username);
			        	var passwordMatch = angular.equals(value.password,user.password);
						if(userNameExist && passwordMatch){
							console.log("user ="+value);
							$rootScope.showSignUp = false;
						    $rootScope.showLogIn = false;
							$rootScope.showLogOut = true;
							$rootScope.userNameText = value.firstName + " "+ value.lastName;
							$rootScope.showUserName = true;
							$rootScope.loggedInUserHomePage = true;
							$rootScope.userProductsPage=true;
							$scope.signIn=false;
							$scope.showProductsPage = true;
							$scope.showUserPage = true;
							$scope.showUserPageAfterLogIn=true;
						}else{
							console.log("false"+value.password+" "+user.password);
						}
					});
			    }, function(response) {
			    
			    	console.log("error");
			        $scope.content = "Something went wrong";
			    });
		};
	
	});
	
	myApp.controller('logOutCtrl',function($scope,$rootScope){
		$rootScope.showSignUp = true;
		$rootScope.showLogIn = true;
		$rootScope.showLogOut = false;
		$scope.showProductsPage = true;
		$rootScope.showUserName = false;
	});
	myApp.controller('adminLogOutCtrl',function($scope,$rootScope){
		$rootScope.showSignUp = true;
		$rootScope.showLogIn = true;
		$rootScope.showLogOut = false;
		$scope.showProductsPage = true;
		$rootScope.showUserName = false;
		$rootScope.showAdminSignUp = true;
		$rootScope.showAdminLogIn = true;
		$rootScope.showAdminLogOut = false;
		$rootScope.showAdmin = false;
	});
	myApp.controller('signInCtrl',function($scope){
		$scope.sigIn = true;
		$scope.signInAfterRegistration=true;
		//$scope.signInForm.$setPristine();
	});
	myApp.directive('userLogIn',function(){
		return{
			restrcit :'E',
			templateUrl : 'userLogInPageAfterRegistration.html'
		};
	});
	myApp.directive('registrationPage',function(){
		return{
			restrcit :'E',
			templateUrl : 'userRegistrationPage.html'
		};
	});
	myApp.directive('confirmationUserForm',function(){
		return {			
		
			restrict : 'E',
			templateUrl : 'userConfirmationPage.html'
		};
	});
	myApp.directive('adminLogIn',function(){
		return{
			restrcit :'E',
			templateUrl : 'adminLogInPageAfterRegistration.html'
		};
	});
	myApp.directive('adminRegistrationPage',function(){
		return{
			restrcit :'E',
			templateUrl : 'adminRegistrationPage.html'
		};
	});
	myApp.directive('confirmationAdminForm',function(){
		return {
			
		
			restrict : 'E',
			templateUrl : 'adminConfirmationPage.html'
		};
	});
	myApp.directive("productsPage",function(){
		return{
			restrict : 'E',
			templateUrl : 'ShowProducts.html'
		};
	});
	myApp.directive("itemPage",function(){
		return{
			restrict : 'E',
			templateUrl : 'Item.html',
			controller : 'itemPageCtrl'
		};
	});
	myApp.directive("userPage",function(){
		return{
			restrict : 'E',
			templateUrl : 'userHomePage.html'
			
		};
	});
	myApp.directive("showAdminPage",function(){
		return{
			restrict : 'E',
			templateUrl : 'adminPage.html'
			
		};
	});
	
	
	myApp.controller('adminSignUpCtrl',function($scope,$window,$http,$rootScope,registeredAdminUrl){
	   	$scope.formHeading="User registration form";
	   	$scope.logInFormPage = true;
	   	$scope.confirmPage = false;
	   	$scope.signIn = false;
	   	$scope.phoneValidatorMessage = "";
	   	$scope.phoneNumberRequiredOrNot = true;
	   	$scope.showUserButton = false;
	   	$scope.showOrHideTxt = "Show Users";
	   	$scope.disableInput = false;
	   	$scope.showUsers = false;
	   	$scope.addUsers = false;
	   	$scope.appadmin = null;
	   	$scope.regex =/^\d{10}$/;
	   	//
	   	$scope.confirm = function(){
	   		console.log("confirm clicked");
	   		$scope.logInFormPage = false;
	   		$scope.confirmPage = true;
	   	};
	   	//
	   	$scope.backPageLink = function(){
	   		$scope.logInFormPage = true;
	   		$scope.confirmPage = false;
	   	};
		  $scope.formSubmit = function(user){
		  
		 $http.post(registeredAdminUrl,user)
 			 .then(function(newUser){
 			  console.log("saving admin= "+newUser.data);

 			 $scope.appadmin.push(newUser);
 			 },function(response){
 				 console.log("unable to Post");
 			 });
	   		
		 $scope.logInFormPage = false;
	   	 $scope.confirmPage = false;
	   	 $scope.signInAfterRegistration=true;
	   		$scope.user.username="";
	   		$scope.user.password="";
		  };
		  
$scope.logIn = function(user){
			  
			  $scope.allusers = null;
			  $http.get(registeredAdminUrl)
			    .then(function(response) {
			    
			        $scope.allusers = response.data;
			        console.log("allusers = "+$scope.allusers);
			        angular.forEach($scope.allusers,function(value,key){
			        	var userNameExist = angular.equals(value.username,user.username);
			        	var passwordMatch = angular.equals(value.password,user.password);
						if(userNameExist && passwordMatch){
							console.log("user ="+value);
							$rootScope.showSignUp = false;
						    $rootScope.showLogIn = false;
							$rootScope.showLogOut = true;
							$rootScope.userNameText = value.firstName + " "+ value.lastName;
							$rootScope.showUserName = true;
							$rootScope.loggedInUserHomePage = true;
							$rootScope.userProductsPage=true;
							$scope.signInAfterRegistration = false;
							$scope.showProductsPage = true;
							$scope.showUserPage = true;
						}else{
							console.log("false"+value.password+" "+user.password);
						}
					});
			    }, function(response) {			    
			    	console.log("error");
			        $scope.content = "Something went wrong";
			    });
		};
		
		  $scope.phoneNumberOptional = function(emailValid,emailIdModified,modifiedPhoneNumberField){
		  	if(emailValid && emailIdModified){
		  		$scope.phoneValidatorMessage = "Phone Number is optional as you have entered a valid email id.";
		  		return true;
		  	}
		  };
		 
		  $scope.phoneNumberSpecification = function(emailValid,modifiedPhoneNumberField,invalidPhoneNumber){
		  	if(modifiedPhoneNumberField && invalidPhoneNumber){
		  		$scope.phoneValidatorMessage = "Phone Number must be at least 10 digits.";
		  		return true;
		  	}
		  };

		  $scope.validFormOrNot = function(inValidLoginForm,inValidFirstName,inValidLastName,inValidEmail,inValidPwd,invalidPhoneNumber,unModifiedPhoneNumberField){
		
		  	if(!inValidFirstName && !inValidLastName && !inValidEmail && !inValidPwd 
		  		&& invalidPhoneNumber && unModifiedPhoneNumberField){
		  		return false;
		  	}
		 
		  	else if(!inValidFirstName && !inValidLastName && !inValidEmail && !inValidPwd 
		  		&& invalidPhoneNumber && !unModifiedPhoneNumberField){
		  		return true;
		  	}
		
		  	else if(!inValidLoginForm){
		  		return false;
		  	}else{
		  		return true;
		  	}
		  };
	   

	   	   });
	myApp.controller('adminLogInCtrl',function($scope,$rootScope,$http,registeredAdminUrl){
		$scope.adminLogIn = true;
	
		var showOrHide = 1;
		$scope.showOrHideTxt = "Show Users";
		 $scope.allusers = null;
		 $scope.showUsers = false;
		 $scope.showUserButton=true;
		 $http.get(registeredAdminUrl)
		    .then(function(response) {
		 	
		        $scope.allusers = response.data;
		        console.log("adminusers = "+$scope.allusers);
		        
		    }, function(response) {
		
		    	console.log("error");
		        $scope.content = "Something went wrong";
		    });
		$scope.logIn = function(user){
			  
			 
			  $http.get(registeredAdminUrl)
			    .then(function(response) {
			    
			        $scope.allusers = response.data;
			        console.log("users = "+$scope.allusers);
			        angular.forEach($scope.allusers,function(value,key){
			        	var userNameExist = angular.equals(value.username,user.username);
			        	var passwordMatch = angular.equals(value.password,user.password);
						if(userNameExist && passwordMatch){
							console.log("user ="+value);
							$rootScope.showSignUp = false;
						    $rootScope.showLogIn = false;
							$rootScope.showLogOut = false;
							$rootScope.userNameText = value.firstName + " "+ value.lastName;
							$rootScope.showUserName = true;
							$rootScope.loggedInUserHomePage = true;
							$rootScope.userProductsPage=true;
							$scope.adminLogIn=false;
							$scope.showProductsPage = true;
							$scope.showUserPage = true;
							$scope.showUserPageAfterLogIn=true;
							$rootScope.showAdminLogOut = true;
							$rootScope.showAdminLogIn = false;
							$rootScope.showAdminSignUp = false;
							$rootScope.showAdmin = true;
							
						}else{
							console.log("false"+value.password+" "+user.password);
						}
					});
			    }, function(response) {
			    
			    	console.log("error");
			        $scope.content = "Something went wrong";
			    });
		};
		
		  $scope.showAllUsers = function(){
		  	
		  	if(showOrHide == 0){
		  		console.log("hide");
		  		$scope.showUsers = false;
		  		showOrHide = 1;
		  		$scope.showOrHideTxt = "Show Users";
		  	}else{
		  		console.log("show");
		  		$scope.showUsers = true;
		  		showOrHide = 0;
		  		$scope.showOrHideTxt = "Hide Users";
		  	}
		  };
	
	});
	myApp.controller('adminCtrl',function($scope,$rootScope,$http,registeredAdminUrl){
		$rootScope.showAdmin = true;
		$scope.showUserPageAfterLogIn = true;
		var showOrHide = 1;
		$scope.showOrHideTxt = "Show Users";
		 $scope.allusers = null;
		 $scope.showUsers = false;
		 $scope.showUserButton=true;
		 
		 $http.get(registeredAdminUrl)
		    .then(function(response) {
		    	
		        $scope.allusers = response.data;
		        console.log("adminusers = "+$scope.allusers);
		        
		    }, function(response) {
		    
		    	console.log("error");
		        $scope.content = "Something went wrong";
		    });
	
		  $scope.showAllUsers = function(){
		  	
		  	if(showOrHide == 0){
		  		console.log("hide");
		  		$scope.showUsers = false;
		  		showOrHide = 1;
		  		$scope.showOrHideTxt = "Show Users";
		  	}else{
		  		console.log("show");
		  		$scope.showUsers = true;
		  		showOrHide = 0;
		  		$scope.showOrHideTxt = "Hide Users";
		  	}
		  };
	
	});
	