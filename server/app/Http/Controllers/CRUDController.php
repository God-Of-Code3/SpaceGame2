<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CRUDController extends Controller
{
    public function getTabs()
    {
        $resp = ApiController::getResp();

        $resp->setContent([
            'Universe' => [
                'title' => 'Вселенные',
                'api' => 'universe',
                'actions' => ['get', 'getOne', 'create', 'update', 'delete']
            ]
        ]);
        $resp->echo();
    }
}
