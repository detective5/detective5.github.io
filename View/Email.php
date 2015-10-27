<?php 
$errors = '';
$myemail = 'johnxmai@gmail.com';//<-----Put Your email address here.

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$title =$request->Title;
$email_address =$request->Email; 
$message = $request->Message;

if( empty($errors))
{
	$to = $myemail; 
	
	$email_body = "You have received a new message. ".
	" Here are the details:\n Title: $title \n Email: $email_address \n Message \n $message"; 
	
	$headers = "From: $myemail\n"; 
	$headers .= "Reply-To: $email_address";
	
	mail($to,$title,$email_body,$headers);
	
} 
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> 
<html>
<head>
	<title>Oops</title>
</head>

<body>
<!-- This page is displayed only if there is some error -->
<?php
echo nl2br($errors);
?>


</body>
</html>