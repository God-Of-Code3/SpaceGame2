<?php

namespace App\Http\Controllers;

use App\Models\SpaceObjectType;
use App\Models\Universe;
use Illuminate\Http\Request;

class UniverseController extends Controller
{
    public function index(Request $req)
    {
        $records = Universe::paginate(20);
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
}
