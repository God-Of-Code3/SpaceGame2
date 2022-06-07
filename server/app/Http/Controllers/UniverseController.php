<?php

namespace App\Http\Controllers;

use App\Models\SpaceObjectType;
use App\Models\Universe;
use Illuminate\Http\Request;

class UniverseController extends Controller
{
    public function index(Request $req)
    {
        $records = Universe::paginate(1);
        $tableData = CRUDController::getTableData();

        $tableData['tableName'] = "Вселенные";
        $tableData['columns'] = Universe::getColumns();

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
        $data['user_id'] = $req->user()->id;
        Universe::create($data);

        $resp = ApiController::getResp();
        $resp->addFormAlert('success', 'Вселенная успешно создана');
        $resp->echo();
    }

    public function update(Request $req, Universe $universe)
    {
        $universe->update($req->all());

        $resp = ApiController::getResp();
        $resp->addFormAlert('success', 'Вселенная успешно обновлена');
        $resp->echo();
    }

    public function destroy(Request $req, Universe $universe)
    {
        $universe->delete();

        $resp = ApiController::getResp();
        $resp->echo();
    }
}
