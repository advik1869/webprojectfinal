function validateLogin()
{
	let username = document.getElementById("username").value.trim();
	let password = document.getElementById("password").value;
	let usertype = document.getElementById("usertype").value;

	let userError = document.getElementById("userError");
	let passError = document.getElementById("passError");
	let typeError = document.getElementById("typeError");

	userError.innerHTML = "";
	passError.innerHTML = "";
	typeError.innerHTML = "";


	if(username == "")
	{
		userError.innerHTML = "Username is required";
		return false;
	}

	if(password == "")
	{
		passError.innerHTML = "Password is required";
		return false;
	}

	if(usertype == "")
	{
		typeError.innerHTML = "Please select user type";
		return false;
	}

	if(username == "advik" && password == "advik123")
	{
		window.location.href =
		"33_2.html?user=" + username;
		return false;
	}
	else
	{
		passError.innerHTML =
			"Invalid username or password";
		return false;
	}
}
