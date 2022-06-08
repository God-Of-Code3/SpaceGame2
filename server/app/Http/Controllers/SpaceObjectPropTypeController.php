<?php

namespace App\Http\Controllers;

use App\Models\SpaceObjectPropType;
use App\Models\SpaceObjectType;
use Illuminate\Http\Request;

class SpaceObjectPropTypeController extends Controller
{
    public function index(Request $req)
    {
        $records = SpaceObjectPropType::paginate(20);
        $tableData = CRUDController::getTableData();

        $tableData['tableName'] = "Вселенные";
        $tableData['columns'] = SpaceObjectPropType::getColumns();

        $resp = ApiController::getResp();
        $resp->setContent([
            'records' => $records,
            'tableData' => $tableData,
        ]);
        $resp->echo();
    }

    public function store(Request $req)
    {
        $data = $req->all();
        SpaceObjectPropType::create($data);

        $resp = ApiController::getResp();
        $resp->addFormAlert('success', 'Тип значения успешно создан');
        $resp->echo();
    }

    public function update(Request $req, SpaceObjectPropType $SpaceObjectPropType)
    {
        $SpaceObjectPropType->update($req->all());

        $resp = ApiController::getResp();
        $resp->addFormAlert('success', 'Тип значения успешно обновлен');
        $resp->echo();
    }

    public function destroy(Request $req, SpaceObjectPropType $SpaceObjectPropType)
    {
        $SpaceObjectPropType->delete();

        $resp = ApiController::getResp();
        $resp->echo();
    }
}
