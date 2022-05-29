<?php

namespace App\Http\Controllers;

use App\Models\SpaceObjectType;
use App\Models\Universe;
use Illuminate\Http\Request;

class UniverseController extends Controller
{
    public function get(Request $req)
    {
        $universes = Universe::get();

        $resp = ApiController::getResp();
        $resp->setContent($universes);
        $resp->echo();
    }

    public function create(Request $req)
    {
        $data = $req->all();
        $user = $req->user();
        $universe = Universe::create([
            "name" => $data["name"],
            "description" => $data["description"],
            "user_id" => $user["id"],
        ]);
        $universe->save();

        $resp = ApiController::getResp();
        $resp->addFormAlert('success', 'Вселенная успешно создана!');
        $resp->echo();
    }

    public function delete(Request $req, $universe)
    {
        $universe = Universe::find($universe);
        $universe->delete();

        $resp = ApiController::getResp();
        $resp->echo();
    }

    public function getOne(Request $req, $universe)
    {
        $universe = Universe::find($universe);

        $resp = ApiController::getResp();
        $resp->setContent($universe);
        $resp->echo();
    }

    public function update(Request $req, $universe)
    {
        $universe = Universe::find($universe);
        $universe->update($req->all());
        $universe->save();

        $resp = ApiController::getResp();
        $resp->echo();
    }

    public function getAttrsLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Название',
            'description' => 'Описание'
        ];
    }

    public function getSelfTabs()
    {
        $tabs = [];
        $spaceObjectTypes = SpaceObjectType::get();
        foreach ($spaceObjectTypes as $objectType) {
            $tabs["$objectType->name"] = [
                'title' => "$objectType->runame",
                'api' => "$objectType->name",
            ];
        }

        return $tabs;
    }

    public function getInfo(Request $req)
    {
        $resp = ApiController::getResp();
        $resp->setContent([
            'api' => 'universe',
            'actions' => ['page', 'get', 'getOne', 'create', 'update', 'delete'],
            'labels' => $this->getAttrsLabels(),
            'createForm' => [
                'title' => "Создание вселенной",
                'fields' => [
                    ['name', 'text'],
                    ['description', 'text'],

                ]
            ],
            'items' => [
                'title' => "Вселенные",
                'showInfo' => [
                    'title' => 'name',
                    'description' => 'description'
                ],
            ],
            'page' => [
                'title' => "Управление вселенной",
                'tabs' => $this->getSelfTabs()
            ]
        ]);
        $resp->echo();
    }
}
