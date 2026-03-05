function validate()
{
	let p=document.getElementById('phone').value.trim();
	let z=document.getElementById('zip').value.trim();
	let pay=document.getElementById('Payment').value;
	let m=document.getElementById('message');


	let phoneregex=/^[0-9]{10}$/;
	if(!phoneregex.test(p))
	{
		m.innerHTML='phone number must contain 10 digits';
		m.style.color='red';
		return;
	}

	let zipregex=/^[0-9]{6}$/;
	if(!zipregex.test(z))
	{
		m.innerHTML='enter a valid 6 digit postal code';
		m.style.color='red';
		return;
	}

	if(pay=="---select---")
	{
		m.innerHTML='please select a Payment method';
		m.style.color='red';
		return;
	}
	m.innerHTML='ordered successfully!';
	m.style.color='green';
	return;
}