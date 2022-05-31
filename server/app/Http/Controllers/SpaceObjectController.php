<?php

namespace App\Http\Controllers;

use App\Models\SpaceObject;
use App\Models\SpaceObjectPropType;
use App\Models\SpaceObjectPropValue;
use App\Models\SpaceObjectType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

    protected function getAttrsLabels($req)
    {

        $labels = [
            'id' => 'ID',
            'name' => 'Название',
            'x' => 'X-координата',
            'y' => 'Y-координата',
            'rad' => 'Радиус объекта',
        ];

        $typeId = $this->getSpaceObjectTypeId($req);
        $propTypes = SpaceObjectPropType::where("space_object_type_id", "=", $typeId)->orWhere("space_object_type_id", "=", null)->get();

        foreach ($propTypes as $propType) {
            $labels[$propType->name] = $propType->description;
        }

        return $labels;
    }

    protected function getFields($req)
    {
        $fields = [
            ['name', 'text'],
            ['x', 'number'],
            ['y', 'number'],
            ['rad', 'number'],
        ];

        foreach ($this->getAdditionalFields($req) as $field) {
            $fields[] = $field;
        }

        return $fields;
    }

    protected function getAdditionalFields($req)
    {
        $fields = [];

        $typeId = $this->getSpaceObjectTypeId($req);
        $propTypes = SpaceObjectPropType::where("space_object_type_id", "=", $typeId)->orWhere("space_object_type_id", "=", null)->get();

        foreach ($propTypes as $propType) {
            $options = [];
            foreach (explode(":", $propType->default) as $valueType) {
                $options[] = [
                    'value' => $valueType,
                    'label' => $valueType
                ];
            }
            $fields[] = [$propType->name, $propType->type, $options];
        }

        return $fields;
    }

    public function getInfo(Request $req)
    {
        $type = $this->getUrlObjectType($req);

        $resp = ApiController::getResp();
        $resp->setContent([
            'api' => $type,
            'actions' => ['get', 'getOne', 'create', 'update', 'delete'],
            'labels' => $this->getAttrsLabels($req),
            'createForm' => [
                'title' => "Создание объекта",
                'fields' => $this->getFields($req)
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
        $objects = SpaceObject::where("space_object_type_id", '=', $this->getSpaceObjectTypeId($req))->get();

        $props = DB::select(DB::raw("SELECT so.id, so.name, sopt.name, sopv.value, sopt.space_object_type_id FROM `space_objects` AS so, space_object_prop_types AS sopt, space_object_prop_values AS sopv WHERE so.id = sopv.space_object_id AND sopv.space_object_prop_type_id = sopt.id AND (sopt.space_object_type_id = so.space_object_type_id OR sopt.space_object_type_id IS NULL)"));

        $i = 0;
        foreach ($props as $prop) {
            if ($objects[$i]->id != $prop->id) {
                $i += 1;
            }
            $objects[$i][$prop->name] = $prop->value;
        }

        $resp = ApiController::getResp();
        $resp->setContent($objects);
        $resp->echo();
    }

    public function create(Request $req)
    {
        $data = $req->all();
        $data['space_object_type_id'] = $this->getSpaceObjectTypeId($req);

        $obj = SpaceObject::create($data);

        foreach ($this->getAdditionalFields($req) as $field) {
            $this->setProperty($obj, $field[0], $data[$field[0]]);
        }

        $resp = ApiController::getResp();
        // $resp->setContent($data);
        $resp->echo();
    }

    public function update(Request $req, $spaceObject)
    {
        $spaceObject = SpaceObject::find($spaceObject);
        $spaceObject->update($req->all());

        $data = $req->all();
        foreach ($this->getAdditionalFields($req) as $field) {
            $this->setProperty($spaceObject, $field[0], $data[$field[0]]);
        }

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

    protected function getSpaceObjectTypeId($req)
    {
        $type = explode("/", $req->path())[1];
        return SpaceObjectType::where('name', '=', $type)->first()->id;
    }

    protected function setProperty($obj, $name, $value)
    {
        $propTypeId = SpaceObjectPropType::where('name', '=', $name)->first()->id;
        $propValue = SpaceObjectPropValue::where('space_object_id', '=', $obj->id)->where('space_object_prop_type_id', '=', $propTypeId)->first();
        if ($propValue) {
            $propValue->value = $value;
            $propValue->save();
        } else {
            SpaceObjectPropValue::create([
                'space_object_id' => $obj->id,
                'space_object_prop_type_id' => $propTypeId,
                'value' => $value,
            ]);
        }
    }
}
