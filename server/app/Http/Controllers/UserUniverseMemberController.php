<?php

namespace App\Http\Controllers;

use App\Models\UserUniverseMember;
use Illuminate\Http\Request;

class UserUniverseMemberController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->get('user', 0);

        $records = UserUniverseMember::where('user_id', '=', $user)->paginate(20);
        $tableData = CRUDController::getTableData();

        $tableData['tableName'] = "Участие во вселенных";
        $tableData['columns'] = UserUniverseMember::getColumns();

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
        $user = $request->get('user', 0);
        $data = $request->all();
        $data['user_id'] = $user;

        UserUniverseMember::create($data);

        $resp = ApiController::getResp();
        $resp->addFormAlert('success', 'Камера успешно создана');
        $resp->echo();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\UserUniverseMember  $UserUniverseMember
     * @return \Illuminate\Http\Response
     */
    public function edit(UserUniverseMember $UserUniverseMember)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\UserUniverseMember  $UserUniverseMember
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, UserUniverseMember $UserUniverseMember)
    {
        $UserUniverseMember->update($request->all());

        $resp = ApiController::getResp();
        $resp->addFormAlert('success', 'Камера успешно обновлена');
        $resp->echo();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\UserUniverseMember  $UserUniverseMember
     * @return \Illuminate\Http\Response
     */
    public function destroy(UserUniverseMember $UserUniverseMember)
    {
        $UserUniverseMember->delete();

        $resp = ApiController::getResp();
        $resp->echo();
    }
}
