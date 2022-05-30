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
                'api' => 'universe'
            ],
            'SpaceObjectType' => [
                'title' => 'Типы объектов',
                'api' => 'space-object-type'
            ],
            'SpaceObjectPropType' => [
                'title' => 'Характеристики объектов',
                'api' => 'space-object-prop-type'
            ],
        ]);
        $resp->echo();
    }
}
