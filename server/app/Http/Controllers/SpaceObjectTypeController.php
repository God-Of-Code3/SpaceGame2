<?php

namespace App\Http\Controllers;

use App\Models\SpaceObjectType;
use Illuminate\Http\Request;

class SpaceObjectTypeController extends Controller
{
    public function index(Request $req)
    {
        $records = SpaceObjectType::paginate(20);
        $tableData = CRUDController::getTableData();

        $tableData['tableName'] = "Типы объектов";
        $tableData['columns'] = SpaceObjectType::getColumns();

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
        SpaceObjectType::create($data);

        $resp = ApiController::getResp();
        $resp->addFormAlert('success', 'Тип объекта успешно создан');
        $resp->echo();
    }

    public function update(Request $req, SpaceObjectType $SpaceObjectType)
    {
        $SpaceObjectType->update($req->all());

        $resp = ApiController::getResp();
        $resp->addFormAlert('success', 'Тип объекта успешно обновлен');
        $resp->echo();
    }

    public function destroy(Request $req, SpaceObjectType $SpaceObjectType)
    {
        $SpaceObjectType->delete();

        $resp = ApiController::getResp();
        $resp->echo();
    }
}
