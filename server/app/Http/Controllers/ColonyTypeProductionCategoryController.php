<?php

namespace App\Http\Controllers;

use App\Models\ColonyTypeProductionCategory;
use Illuminate\Http\Request;

class ColonyTypeProductionCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $colonyType = $request->get("colony_type");

        $records = ColonyTypeProductionCategory::where('colony_type_id', '=', $colonyType)->paginate(20);
        $tableData = CRUDController::getTableData();
        $tableData['tableName'] = "Категории деятельности этого типа колоний";
        $tableData['columns'] = ColonyTypeProductionCategory::getColumns();

        $resp = ApiController::getResp();
        $resp->setContent([
            'tableData' => $tableData,
            'records' => $records
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
        $colonyType = $request->get('colony_type');
        $data = $request->all();
        $data['colony_type_id'] = $colonyType;

        ColonyTypeProductionCategory::create($data);

        $resp = ApiController::getResp();
        $resp->echo();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ColonyTypeProductionCategory  $colonyTypeProductionCategory
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ColonyTypeProductionCategory $colonyTypeProductionCategory)
    {
        $colonyTypeProductionCategory->update($request->all());

        $resp = ApiController::getResp();
        $resp->echo();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ColonyTypeProductionCategory  $colonyTypeProductionCategory
     * @return \Illuminate\Http\Response
     */
    public function destroy(ColonyTypeProductionCategory $colonyTypeProductionCategory)
    {
        $colonyTypeProductionCategory->delete();

        $resp = ApiController::getResp();
        $resp->echo();
    }
}
