<?php

namespace App\Http\Controllers;

use App\Models\Civilization;
use Illuminate\Http\Request;
use App\Models\Universe;
use App\Models\UserUniverseMember;
use App\Models\SpaceObject;
use App\Models\SpaceObjectPropValue;

class CivilizationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $userUniverseMember = $request->get('user_universe_member', 0);

        $records = Civilization::where('user_universe_member_id', '=', $userUniverseMember)->paginate(20);
        $tableData = CRUDController::getTableData();

        $tableData['tableName'] = "Цивилизации";
        $tableData['columns'] = Civilization::getColumns();
        $tableData['actions'][] = 'page';
        $tableData['page'] = '/content/crud/colony?parentRecordId=:recordId&parentTable=civilization';

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
        $data['user_universe_member_id'] = $request->get('user_universe_member', 0);
        Civilization::create($data);

        $resp = ApiController::getResp();
        $resp->echo();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Civilization  $Civilization
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Civilization $civilization)
    {
        $civilization->update($request->all());

        $resp = ApiController::getResp();
        $resp->echo();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Civilization  $Civilization
     * @return \Illuminate\Http\Response
     */
    public function destroy(Civilization $civilization)
    {
        $civilization->delete();

        $resp = ApiController::getResp();
        $resp->echo();
    }

    static public function createCivilization(Universe $universe, UserUniverseMember $userUniverseMember, $name)
    {

        $freeObject = SpaceObject::whereRaw("id NOT IN 
                (SELECT 
                    starting_planet_id 
                FROM 
                    civilizations 
                WHERE 
                    user_universe_member_id IN 
                        (SELECT 
                            id 
                        FROM 
                            user_universe_members 
                        WHERE 
                            universe_id = '$universe->id')
                )") // Finding free planets
            ->whereRaw("id IN 
                (SELECT 
                    space_object_id
                FROM
                    space_object_prop_values
                WHERE
                    value = 'rock'
                AND
                    space_object_prop_type_id IN
                        (SELECT
                            id
                        FROM
                            space_object_prop_types
                        WHERE
                            name = 'compositionType'
                        )
                )") // Finding rock-based planets
            ->where('universe_id', '=', $universe->id)
            ->inRandomOrder()
            ->first();

        $civilization = Civilization::create([
            'name' => $name,
            'level' => 1,
            'starting_planet_id' => $freeObject->id,
            'user_universe_member_id' => $userUniverseMember->id
        ]);

        return $civilization;
    }
}
