<?php

namespace App\Http\Controllers;

use App\Models\ColonyType;
use Illuminate\Http\Request;

class ColonyTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $records = ColonyType::paginate(20);
        $tableData = CRUDController::getTableData();

        $tableData['tableName'] = "Типы колоний";
        $tableData['columns'] = ColonyType::getColumns();

        $resp = ApiController::getResp();
        $resp->setContent([
            'records' => $records,
            'tableData' => $tableData,
        ]);
        $resp->echo();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        ColonyType::create($request->all());

        $resp = ApiController::getResp();
        $resp->echo();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ColonyType  $colonyType
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ColonyType $colonyType)
    {
        $colonyType->update($request->all());

        $resp = ApiController::getResp();
        $resp->echo();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ColonyType  $colonyType
     * @return \Illuminate\Http\Response
     */
    public function destroy(ColonyType $colonyType)
    {
        $colonyType->delete();

        $resp = ApiController::getResp();
        $resp->echo();
    }
}
