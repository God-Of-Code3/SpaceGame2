<?php

namespace App\Http\Controllers;

use App\Models\SpaceObject;
use Illuminate\Http\Request;

class SpaceObjectController extends Controller
{

    public function getAttrsLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Название',
            'x' => 'X-координата',
            'y' => 'Y-координата',
            'rad' => 'Радиус объекта',
        ];
    }

    public function getInfo(Request $req)
    {
        $path = $req->path();
        $path = str_replace("api/", "", $path);
        $type = str_replace("/getInfo", "", $path);

        $resp = ApiController::getResp();
        $resp->setContent([
            'api' => $type,
            'actions' => ['get', 'getOne', 'create', 'update', 'delete'],
            'labels' => $this->getAttrsLabels(),
            'createForm' => [
                'title' => "Создание объекта",
                'fields' => [
                    ['name', 'text'],
                    ['x', 'number'],
                    ['y', 'number'],
                    ['rad', 'number'],

                ]
            ],
            'items' => [
                'title' => "Объекты",
                'showInfo' => [
                    'title' => 'name',
                    'description' => 'description'
                ],
                'filter' => ['id', 'name']
            ],
            'req' => $path,
        ]);
        $resp->echo();
    }

    public function get(Request $req)
    {
        $objects = SpaceObject::get();

        $resp = ApiController::getResp();
        $resp->setContent($objects);
        $resp->echo();
    }
}
