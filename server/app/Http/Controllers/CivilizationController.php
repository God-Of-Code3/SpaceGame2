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
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Civilization  $civilization
     * @return \Illuminate\Http\Response
     */
    public function show(Civilization $civilization)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Civilization  $civilization
     * @return \Illuminate\Http\Response
     */
    public function edit(Civilization $civilization)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Civilization  $civilization
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Civilization $civilization)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Civilization  $civilization
     * @return \Illuminate\Http\Response
     */
    public function destroy(Civilization $civilization)
    {
        //
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
                            universe_id = '$universe->id'))")
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
