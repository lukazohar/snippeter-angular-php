<?php
class SnippetController extends BaseController
{
    /** 
* "/user/list" Endpoint - Get list of users 
*/
public function listAction()
{
    $strErrorDesc = '';
    $requestMethod = $_SERVER["REQUEST_METHOD"];
    parse_str($_SERVER['QUERY_STRING'], $arrQueryStringParams);

    if (strtoupper($requestMethod) == 'GET') {
        try {
            $snippetModel = new SnippetModel();
            
            $id = 0;
            if (isset($arrQueryStringParams['userId']) && $arrQueryStringParams['userId']) {
                $id = $arrQueryStringParams['userId'];
            }
            $arrSnippets = $snippetModel->getSnippetsByUserId($id);
            $responseData = json_encode($arrSnippets);
        } catch (Error $e) {
            $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
            $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
        }
    } else {
        $strErrorDesc = 'Method not supported';
        $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
    }
    // send output 
    if (!$strErrorDesc) {
        $this->sendOutput(
            $responseData,
            array('Content-Type: application/json', 'HTTP/1.1 200 OK')
        );
    } else {
        $this->sendOutput(json_encode(array('error' => $strErrorDesc)), 
            array('Content-Type: application/json', $strErrorHeader)
        );
    }
}

public function getAction()
{
    $strErrorDesc = '';
    $requestMethod = $_SERVER["REQUEST_METHOD"];
    parse_str($_SERVER['QUERY_STRING'], $arrQueryStringParams);

    if (strtoupper($requestMethod) == 'GET') {
        try {
            $snippetModel = new SnippetModel();
            
            $id = 0;
            if (isset($arrQueryStringParams['id']) && $arrQueryStringParams['id']) {
                $id = $arrQueryStringParams['id'];
            }
            $arrSnippets = $snippetModel->getSnippet($id);
            $responseData = json_encode($arrSnippets);
        } catch (Error $e) {
            $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
            $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
        }
    } else {
        $strErrorDesc = 'Method not supported';
        $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
    }
    // send output 
    if (!$strErrorDesc) {
        $this->sendOutput(
            $responseData,
            array('Content-Type: application/json', 'HTTP/1.1 200 OK')
        );
    } else {
        $this->sendOutput(json_encode(array('error' => $strErrorDesc)), 
            array('Content-Type: application/json', $strErrorHeader)
        );
    }
}
    
    /** 
* "/user/login" Endpoint - Login user 
*/
    public function addAction()
    {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $requestBody = $this->getBody();
        if (strtoupper($requestMethod) == 'POST') {
            try {
                $snippetModel = new SnippetModel();
                $arrSnippets = $snippetModel->addSnippet($requestBody["name"], $requestBody["prefix"], $requestBody["description"], $requestBody["body"], $requestBody["userId"]);
                $responseData = json_encode($arrSnippets);
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }
        // send output 
        if (!$strErrorDesc) {
            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            $this->sendOutput(json_encode(array('error' => $strErrorDesc)), 
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }
    
    public function editAction()
    {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $requestBody = $this->getBody();
        if (strtoupper($requestMethod) == 'PUT') {
            try {
                $snippetModel = new SnippetModel();
                $arrSnippets = $snippetModel->editSnippet($requestBody["id"], $requestBody["name"], $requestBody["prefix"], $requestBody["description"], $requestBody["body"]);
                $responseData = json_encode($arrSnippets);
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }
        // send output 
        if (!$strErrorDesc) {
            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            $this->sendOutput(json_encode(array('error' => $strErrorDesc)), 
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }
    
    public function deleteAction()
    {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        
        parse_str($_SERVER['QUERY_STRING'], $arrQueryStringParams);

        if (strtoupper($requestMethod) == 'DELETE') {
            try {
                $snippetModel = new SnippetModel();
                
                $id = 0;
                if (isset($arrQueryStringParams['id']) && $arrQueryStringParams['id']) {
                    $id = $arrQueryStringParams['id'];
                }

                $arrSnippets = $snippetModel->deleteSnippet($id);
                $responseData = json_encode($arrSnippets);
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }
        // send output 
        if (!$strErrorDesc) {
            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            $this->sendOutput(json_encode(array('error' => $strErrorDesc)), 
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }
}
?>