<?php

namespace App\Http\Controllers;

use App\Models\ProductionCategory;
use Illuminate\Http\Request;

class ProductionCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $records = ProductionCategory::paginate(20);
        $tableData = CRUDController::getTableData();
        $tableData['columns'] = ProductionCategory::getColumns();
        $tableData['tableName'] = "Категории деятельности";

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
        ProductionCategory::create($request->all());

        $resp = ApiController::getResp();
        $resp->echo();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ProductionCategory  $productionCategory
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ProductionCategory $productionCategory)
    {
        $productionCategory->update($request->all());

        $resp = ApiController::getResp();
        $resp->echo();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ProductionCategory  $productionCategory
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProductionCategory $productionCategory)
    {
        $productionCategory->delete();

        $resp = ApiController::getResp();
        $resp->echo();
    }
}
