<?php

namespace App\Http\Controllers;

use App\Models\ProductionBranch;
use Illuminate\Http\Request;

class ProductionBranchController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $productionCategory = $request->get('production_category');

        $records = ProductionBranch::where('production_category_id', '=', $productionCategory)->paginate(20);
        $tableData = CRUDController::getTableData();
        $tableData['tableName'] = "Отрасли";
        $tableData['columns'] = ProductionBranch::getColumns();

        $resp = ApiController::getResp();
        $resp->setContent([
            'records' => $records,
            'tableData' => $tableData
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
        $data = $request->all();
        $data['production_category_id'] = $request->get('production_category');
        ProductionBranch::create($data);

        $resp = ApiController::getResp();
        $resp->echo();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ProductionBranch  $productionBranch
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ProductionBranch $productionBranch)
    {
        $productionBranch->update($request->all());

        $resp = ApiController::getResp();
        $resp->echo();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ProductionBranch  $productionBranch
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProductionBranch $productionBranch)
    {
        $productionBranch->delete();

        $resp = ApiController::getResp();
        $resp->echo();
    }
}
