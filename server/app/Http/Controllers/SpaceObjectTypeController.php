<?php

namespace App\Http\Controllers;

use App\Models\SpaceObjectType;
use Illuminate\Http\Request;

class SpaceObjectTypeController extends Controller
{
    public function get()
    {
        $spaceObjectTypes = SpaceObjectType::get();

        $resp = ApiController::getResp();
        $resp->setContent($spaceObjectTypes);
        $resp->echo();
    }

    public function create(Request $req)
    {
        SpaceObjectType::create($req->all());

        $resp = ApiController::getResp();
        $resp->echo();
    }

    public function delete(Request $req, $spaceObjectType)
    {
        $spaceObjectType = SpaceObjectType::find($spaceObjectType);
        $spaceObjectType->delete();

        $resp = ApiController::getResp();
        $resp->echo();
    }

    public function getOne(Request $req, $spaceObjectType)
    {
        $spaceObjectType = SpaceObjectType::find($spaceObjectType);

        $resp = ApiController::getResp();
        $resp->setContent($spaceObjectType);
        $resp->echo();
    }

    public function update(Request $req, $spaceObjectType)
    {
        $spaceObjectType = SpaceObjectType::find($spaceObjectType);
        $spaceObjectType->update($req->all());
        $spaceObjectType->save();

        $resp = ApiController::getResp();
        $resp->echo();
    }

    public function getInfo(Request $req)
    {
        $resp = ApiController::getResp();
        $resp->setContent([
            'api' => 'space-object-type',
            'actions' => ['get', 'getOne', 'create', 'update', 'delete'],
            'createForm' => [
                'title' => "Создание типа объектов",
                'fields' => [
                    ['name', 'Имя:', 'text'],
                    ['runame', 'Название на русском:', 'text'],
                    ['description', 'Описание:', 'text'],
                ]
            ],
            'items' => [
                'title' => "Типы объектов",
                'showInfo' => [
                    'title' => 'runame',
                    'subtitle' => 'name',
                    'description' => 'description'
                ]
            ]
        ]);
        $resp->echo();
    }
}
