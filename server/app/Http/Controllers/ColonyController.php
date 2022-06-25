<?php

namespace App\Http\Controllers;

use App\Models\Colony;
use Illuminate\Http\Request;

class ColonyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $civilization = $request->get('civilization');

        $records = Colony::where('civilization_id', '=', $civilization)->paginate(20);
        $tableData = CRUDController::getTableData();

        $tableData['tableName'] = "Колонии";
        $tableData['columns'] = Colony::getColumns();

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
        $data = $request->all();
        $data['civilization_id'] = $request->get('civilization', 0);

        Colony::create($data);

        $resp = ApiController::getResp();
        $resp->echo();
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Colony  $colony
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Colony $colony)
    {
        $colony->update($request->all());

        $resp = ApiController::getResp();
        $resp->echo();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Colony  $colony
     * @return \Illuminate\Http\Response
     */
    public function destroy(Colony $colony)
    {
        $colony->delete();

        $resp = ApiController::getResp();
        $resp->echo();
    }
}
