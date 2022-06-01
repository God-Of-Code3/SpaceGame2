<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SystemController extends Controller
{
    function getUniverseInfo(Request $req, $universe)
    {
        $resp = ApiController::getResp();
        $resp->setContent([
            'api' => "system/universe/$universe",
            'actions' => ['get', 'update', 'delete', 'getOne', 'create'],
            'tree' => []
        ]);
        $resp->echo();
    }
}
