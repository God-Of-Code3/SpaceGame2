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

        $records = $universe ?
            SpaceObject::where('universe_id', '=', $universe)->paginate(20)
            :
            SpaceObject::paginate(20);
        // $additionalConditions = $universe ? "AND so.universe_id = '$universe'" : "";

        $tableData = CRUDController::getTableData();

        $tableData['tableName'] = "Объекты";
        $tableData['columns'] = SpaceObject::getColumns();
        $tableData['getColumns'] = "/api/getRecordColumns/space_object/";

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
        if ($universe) {
            $data['universe_id'] = $universe;
        }
        SpaceObject::create($data);

        $resp = ApiController::getResp();
        $resp->addFormAlert('success', 'Объект успешно создан');
        $resp->echo();
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
}
