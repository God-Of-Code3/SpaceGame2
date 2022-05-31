<?php

namespace App\Http\Controllers;

use App\Models\SpaceObject;
use App\Models\SpaceObjectType;
use Illuminate\Http\Request;

class SpaceObjectController extends Controller
{

    protected function getUrlObjectType($req, $right = "")
    {
        $path = $req->path();
        $path = str_replace("api/", "", $path);
        $type = str_replace("/getInfo", "", $path);
        $type = str_replace($right, "", $type);
        return $type;
    }

    protected function getAttrsLabels()
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
        $type = $this->getUrlObjectType($req);

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
                ],
                'filter' => ['id', 'name']
            ],
            'req' => "$type"
        ]);
        $resp->echo();
    }

    public function get(Request $req)
    {
        $type = $this->getUrlObjectType($req);
        $typeId = SpaceObjectType::where('name', '=', $type)->first()->id;
        $objects = SpaceObject::where("space_object_type_id", '=', $typeId)->get();

        $resp = ApiController::getResp();
        $resp->setContent($objects);
        $resp->echo();
    }

    public function create(Request $req)
    {
        $data = $req->all();
        $data['space_object_type_id'] = SpaceObjectType::where('name', '=', $this->getUrlObjectType($req, "/universe/$data[universe_id]"))->first()->id;
        SpaceObject::create($data);

        $resp = ApiController::getResp();
        // $resp->setContent($data);
        $resp->echo();
    }

    public function update(Request $req, $spaceObject)
    {
        $spaceObject = SpaceObject::find($spaceObject);
        $spaceObject->update($req->all());
        $spaceObject->save();

        $resp = ApiController::getResp();
        $resp->echo();
    }

    public function delete(Request $req, $spaceObject)
    {
        $spaceObject = SpaceObject::find($spaceObject);
        $spaceObject->delete();

        $resp = ApiController::getResp();
        $resp->echo();
    }
}
