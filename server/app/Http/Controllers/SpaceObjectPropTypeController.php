<?php

namespace App\Http\Controllers;

use App\Models\SpaceObjectPropType;
use App\Models\SpaceObjectType;
use Illuminate\Http\Request;

class SpaceObjectPropTypeController extends Controller
{
    public function getAttrsLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Название',
            'description' => 'Описание',
            'runame' => 'Название на русском',
            'default' => 'Значение по умолчанию',
            'type' => 'Тип значения',
            'space_object_type_id' => 'Тип объекта'
        ];
    }

    protected function getSpaceObjectsTypesSelect()
    {
        $types = [[
            'value' => "",
            'label' => "Для всех типов"
        ]];
        foreach (SpaceObjectType::get() as $type) {
            $types[] = [
                'value' => $type->id,
                'label' => $type->runame,
            ];
        }

        return $types;
    }

    public function getInfo(Request $req)
    {
        $resp = ApiController::getResp();
        $resp->setContent([
            'api' => 'space-object-prop-type',
            'actions' => ['get', 'getOne', 'create', 'update', 'delete'],
            'labels' => $this->getAttrsLabels(),
            'createForm' => [
                'title' => "Создание характеристики объектов",
                'fields' => [
                    ['name', 'text'],
                    ['runame', 'text'],
                    ['description', 'text'],
                    ['type', 'select', [
                        ['value' => 'number', 'label' => 'Числовое значение'],
                        ['value' => 'text', 'label' => 'Текстовое значение'],
                        ['value' => 'select', 'label' => 'Выборочное значение'],
                    ]],
                    ['default', 'text'],
                    ['space_object_type_id', 'select', $this->getSpaceObjectsTypesSelect()],
                ]
            ],
            'items' => [
                'title' => "Характеристики объектов",
                'showInfo' => [
                    'title' => 'runame',
                    'subtitle' => 'name',
                    'description' => 'description'
                ]
            ]
        ]);
        $resp->echo();
    }

    public function get(Request $req)
    {
        $propTypes = SpaceObjectPropType::get();

        $resp = ApiController::getResp();
        $resp->setContent($propTypes);

        $resp->echo();
    }

    public function create(Request $req)
    {
        SpaceObjectPropType::create($req->all());

        $resp = ApiController::getResp();
        $resp->echo();
    }

    public function delete(Request $req, $spaceObjectPropType)
    {
        $spaceObjectPropType = SpaceObjectPropType::find($spaceObjectPropType);
        $spaceObjectPropType->delete();

        $resp = ApiController::getResp();
        $resp->echo();
    }

    public function update(Request $req, $spaceObjectPropType)
    {
        $spaceObjectPropType = SpaceObjectPropType::find($spaceObjectPropType);
        $spaceObjectPropType->update($req->all());
        $spaceObjectPropType->save();

        $resp = ApiController::getResp();
        $resp->echo();
    }
}
