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
    public function index(Request $req)
    {
        $universe = $req->get('universe', 0);
        $spaceObject = $req->get('space_object', 0);

        $records = $universe ?
            SpaceObject::where('universe_id', '=', $universe)->where('space_object_id', '=', null)->paginate(20)
            : ($spaceObject
                ? SpaceObject::where('space_object_id', '=', $spaceObject)->paginate(20)
                : SpaceObject::paginate(20));
        // $additionalConditions = $universe ? "AND so.universe_id = '$universe'" : "";

        $tableData = CRUDController::getTableData();

        $tableData['tableName'] = "Объекты";
        $tableData['columns'] = SpaceObject::getColumns();
        $tableData['actions'][] = 'page';

        if ($universe) {
            $tableData['customActions'] = [
                [
                    'type' => 'light',
                    'text' => 'Сгенерировать систему',
                    'action' => "/api/game/generate_system/$universe"
                ],
                [
                    'type' => 'warning',
                    'text' => 'Сгенерировать системы',
                    'action' => "/api/game/generate_systems/$universe"
                ]
            ];
        }

        $tableData['page'] = '/content/crud/space_object?parentRecordId=:recordId&parentTable=space_object';
        $tableData['getColumns'] = "/api/get_record_columns/space_object/";

        $resp = ApiController::getResp();
        $resp->setContent([
            'records' => $records,
            'tableData' => $tableData,
        ]);
        $resp->echo();
    }

    public function update(Request $req, SpaceObject $spaceObject)
    {
        $data = [];
        $columns = SpaceObject::getColumns();
        foreach ($req->all() as $name => $value) {
            if (array_key_exists($name, $columns)) {
                $data[$name] = $value;
            } elseif (count(explode('__', $name)) > 1) {

                $typeId = explode("__", $name)[1];
                $propValue = SpaceObjectPropValue::where('space_object_prop_type_id', '=', $typeId)
                    ->where('space_object_id', '=', $spaceObject->id)
                    ->first();

                if ($propValue) {
                    $propValue->value = $value;
                    $propValue->save();
                } else {
                    SpaceObjectPropValue::create([
                        'space_object_id' => $spaceObject->id,
                        'space_object_prop_type_id' => $typeId,
                        'value' => $value
                    ]);
                }
            }
        }
        $spaceObject->update($data);

        $resp = ApiController::getResp();
        $resp->addFormAlert('success', 'Объект успешно обновлен');
        $resp->echo();
    }

    public function store(Request $req)
    {

        $data = $req->all();
        $universe = $req->get('universe', 0);
        $spaceObject = $req->get('space_object', 0);

        if ($universe) {
            $data['universe_id'] = $universe;
        }

        if ($spaceObject) {
            $data['space_object_id'] = $spaceObject;
            $data['universe_id'] = SpaceObject::find($spaceObject)->universe_id;
        }

        SpaceObject::create($data);

        $resp = ApiController::getResp();
        $resp->addFormAlert('success', 'Объект успешно создан');
        $resp->echo();
    }

    static public function create($allData)
    {

        $props = [];
        $propTypes = SpaceObjectPropType::where('space_object_type_id', '=', $allData['space_object_type_id'])->orWhere('space_object_type_id', '=', 0)->get();
        foreach ($propTypes as $propType) {
            if (array_key_exists($propType->name, $allData)) {
                $props[$propType->id] = $allData[$propType->name];
                unset($allData[$propType->name]);
            }
        }

        $spaceObject = SpaceObject::create($allData);

        foreach ($props as $key => $value) {
            SpaceObjectPropValue::create([
                'space_object_prop_type_id' => $key,
                'space_object_id' => $spaceObject->id,
                'value' => $value
            ]);
        }

        return $spaceObject;
    }

    public function destroy(Request $req, SpaceObject $spaceObject)
    {
        $spaceObject->delete();

        $resp = ApiController::getResp();
        $resp->echo();
    }

    public function getRecordColumns(Request $req, SpaceObject $spaceObject)
    {
        $columns = SpaceObject::getColumns();
        $values = $spaceObject->toArray();

        unset($columns['space_object_type_id']);
        unset($columns['universe_id']);

        $props = SpaceObjectPropType::where('space_object_type_id', '=', $spaceObject->space_object_type_id)
            ->orWhere('space_object_type_id', '=', 0)
            ->get();

        foreach ($props as $prop) {
            $options = [];
            if ($prop->type == 'select') {
                foreach (explode(";", $prop->default) as $item) {
                    $options[] = [
                        'value' => explode(':', $item)[0],
                        'label' => explode(':', $item)[1],
                    ];
                }
            }
            $columns[$prop->name . "__" . $prop->id] = [$prop->runame, $prop->type, $options];
            $value = SpaceObjectPropValue::where('space_object_id', '=', $spaceObject->id)
                ->where('space_object_prop_type_id', '=', $prop->id)
                ->first();
            $values[$prop->name . "__" . $prop->id] = $value ? $value->value : "";
        }

        $resp = ApiController::getResp();
        $resp->setContent(
            [
                'columns' => $columns,
                'values' => $values
            ]
        );
        $resp->echo();
    }

    static public function getSystems($universeId)
    {
        $objects = SpaceObject::where('universe_id', '=', $universeId)->get();
        $props = DB::select(DB::raw("
            SELECT 
                so.id, 
                so.name,  
                sopt.runame AS typeName, 
                sopt.name AS propName, 
                sopv.value, 
                sopt.space_object_type_id, 
                sot.runame AS objType, 
                sot.name AS objTypeName 
            FROM 
                space_objects AS so, 
                space_object_prop_types AS sopt, 
                space_object_prop_values AS sopv,
                space_object_types AS sot
            WHERE 
                so.id = sopv.space_object_id
                AND sot.id = so.space_object_type_id
                AND sopv.space_object_prop_type_id = sopt.id 
                AND (sopt.space_object_type_id = so.space_object_type_id 
                    OR sopt.space_object_type_id = '0') 
                AND so.universe_id = '$universeId'
        "));

        $objectsAssoc = [];
        foreach ($objects as $object) {
            $objectsAssoc[$object->id] = $object->toArray();
            $objectsAssoc[$object->id]['children'] = [];
        }

        foreach ($props as $prop) {
            $objectsAssoc[$prop->id][$prop->propName] = $prop->value;
        }

        $objects = [];
        $keys = array_reverse(array_keys($objectsAssoc));
        foreach ($keys as $key) {
            $object = $objectsAssoc[$key];
            if ($object['space_object_id']) {
                $objectsAssoc[$object['space_object_id']]['children'][] = $object;
            } else {
                $objects[] = $object;
            }
        }

        return $objects;
    }

    static public function getOne(SpaceObject $spaceObject)
    {
        $props = DB::select(DB::raw("
            SELECT 
                so.id, 
                so.name,  
                sopt.runame AS typeName, 
                sopt.name AS propName, 
                sopv.value, 
                sopt.space_object_type_id, 
                sot.runame AS objType, 
                sot.name AS objTypeName 
            FROM 
                space_objects AS so, 
                space_object_prop_types AS sopt, 
                space_object_prop_values AS sopv,
                space_object_types AS sot
            WHERE 
                so.id = sopv.space_object_id
                AND sot.id = so.space_object_type_id
                AND sopv.space_object_prop_type_id = sopt.id 
                AND (sopt.space_object_type_id = so.space_object_type_id 
                    OR sopt.space_object_type_id = '0') 
                AND so.id = '$spaceObject->id'
        "));

        $object = $spaceObject->toArray();

        foreach ($props as $prop) {
            $object[$prop->propName] = $prop->value;
        }

        return $object;
    }
}
