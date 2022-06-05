<?php

namespace App\Http\Controllers;

use App\Models\SpaceObject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SystemController extends Controller
{
    function getUniverseInfo(Request $req, $universe)
    {
        $resp = ApiController::getResp();
        $resp->setContent([
            'api' => "system/universe/$universe",
            'actions' => ['get', 'update', 'delete', 'getOne', 'create'],
            'tree' => []
        ]);
        $resp->echo();
    }

    function getUniverseSystem(Request $req, $universe)
    {
        $objects = SpaceObject::where("universe_id", '=', $universe)->get();
        $props = DB::select(DB::raw("
            SELECT so.id, so.name,  sopt.runame AS typeName, sopt.name AS propName, sopv.value, sopt.space_object_type_id, sot.runame AS objType, sot.name AS objTypeName FROM 
                space_objects AS so, 
                space_object_prop_types AS sopt, 
                space_object_prop_values AS sopv,
                space_object_types AS sot
            WHERE so.id = sopv.space_object_id
            AND sot.id = so.space_object_type_id
            AND sopv.space_object_prop_type_id = sopt.id 
            AND (sopt.space_object_type_id = so.space_object_type_id OR sopt.space_object_type_id IS NULL) 
            AND so.universe_id = '$universe'"));

        $i = 0;
        foreach ($props as $prop) {
            if ($objects[$i]->id != $prop->id) {
                $i += 1;
            }
            $objects[$i]["PROP|" . $prop->typeName . "|" . $prop->propName] = $prop->value;
            $objects[$i]['objType'] = $prop->objType;
            $objects[$i]['objTypeName'] = $prop->objTypeName;
        }

        $labels = SpaceObjectController::getSelfLabels();

        $objTree = [];
        foreach ($objects as $obj) {
            $content = [];
            foreach ($obj->toArray() as $key => $value) {
                if (isset($labels[$key]) or str_starts_with($key, "PROP|")) {
                    $label = isset($labels[$key]) ? $labels[$key] : explode("|", $key)[1];
                    $name = isset($labels[$key]) ? $key : explode("|", $key)[2];
                    $content[] = [
                        'param' => $label,
                        'value' => $value,
                        'name' => $name
                    ];
                }
            }
            $objTree[] = [
                'title' => $obj['objType'] . " \"" . $obj['name'] . "\"",
                'type' => $obj['objTypeName'],
                'id' => $obj['id'],
                'content' => $content,
                'contentTitle' => "Основная информация"
            ];
        }

        $resp = ApiController::getResp();
        $resp->setContent($objTree);
        $resp->echo();
    }
}
