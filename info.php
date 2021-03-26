<?php
$url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
$parameters = [
  'start' => '1',
  'limit' => '20',
  'convert' => 'USD',
  'aux' => 'max_supply'
];
$headers = [
  'Accepts: application/json',
  'X-CMC_PRO_API_KEY: 29366e8f-d165-48fb-94c2-e36c5b79d456'
];
$qs = http_build_query($parameters); // query string encode the parameters
$request = "{$url}?{$qs}"; // create the request URL


$curl = curl_init(); // Get cURL resource
// Set cURL options
curl_setopt_array($curl, array(
  CURLOPT_URL => $request,            // set the request URL
  CURLOPT_HTTPHEADER => $headers,     // set the headers 
  CURLOPT_RETURNTRANSFER => 1         // ask for raw response instead of bool
));

$response = curl_exec($curl); // Send the request, save the response
print_r(($response));// print json decoded response
echo "<br>";
echo "<br>";
print_r(substr($response,296,26));
print_r(substr($response,352,193));
print_r(substr($response,621,1));
echo"<br/>";
//print_r(substr($response,762,26));
//print_r(substr($response,819,193));
//echo"<br/>";
for($i=762;$i<=strlen($response);$i=$i+467)
{
	print_r(substr($response,$i,26));
	print_r(substr($response,$i+57,195));
	echo"<br/>";
}
$myfile = fopen("newfile.json", "w") or die("Unable to open file!");
fwrite($myfile, $response);
fclose($myfile);
curl_close($curl); // Close request
?>
