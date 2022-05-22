<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Response
{
    function __construct()
    {
        $this->content = [
            "status" => "OK",
            "message" => "",
            "content" => [],
            "formAlerts" => []
        ];
    }

    function setContent($content)
    {
        $this->content["content"] = $content;
    }

    function setMessage($msg)
    {
        $this->content["message"] = $msg;
    }

    function setStatus($status)
    {
        $this->content["status"] = $status;
    }

    function addFormAlert($type, $text)
    {
        $this->content["formAlerts"][] = [
            "type" => $type,
            "text" => $text,
            "key" => "msg-" . uniqid()
        ];
    }

    function echo()
    {
        echo json_encode($this->content);
    }
}

class ApiController extends Controller
{
    static function getResp()
    {
        return new Response();
    }
}
