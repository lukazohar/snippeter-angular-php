<?php
class BaseController
{
    /** 
* __call magic method. 
*/
    public function __call($name, $arguments)
    {
        $this->sendOutput('', array('HTTP/1.1 404 Not Found'));
    }
    /** 
* Get URI elements. 
* 
* @return array 
*/
    protected function getUriSegments()
    {
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $uri = explode( '/', $uri );
        return $uri;
    }
    /** 
* Get querystring params. 
* 
* @return array 
*/
    protected function getQueryStringParams()
    {
        return parse_str($_SERVER['QUERY_STRING'], $query);
    }
    protected function getBody()
    {
        $jsonData = file_get_contents('php://input');

        // Check if any data was received
        if (!empty($jsonData)) {
            // Convert the JSON data to a PHP associative array
            $data = json_decode($jsonData, true);
        
            // Check if JSON decoding was successful
            if (json_last_error() === JSON_ERROR_NONE) {
                // Access the data from the associative array
        
                // Do something with the data
                // echo "Name: $email, Age: $password";

                return $data;
            } else {
                // JSON decoding error
                echo "Failed to decode JSON data.";
            }
        } else {
            // No data received
            echo "No data received.";
            return;
        }
    }
    /** 
* Send API output. 
* 
* @param mixed $data 
* @param string $httpHeader 
*/
    protected function sendOutput($data, $httpHeaders=array())
    {
        header_remove('Set-Cookie');
        if (is_array($httpHeaders) && count($httpHeaders)) {
            foreach ($httpHeaders as $httpHeader) {
                header($httpHeader);
            }
        }
        echo $data;
        exit;
    }
}
?>