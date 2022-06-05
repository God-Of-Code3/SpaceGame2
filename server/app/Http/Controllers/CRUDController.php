<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CRUDController extends Controller
{
    public function getTables()
    {
        $resp = ApiController::getResp();

        $resp->setContent([
            [
                'table' => 'universe',
                'title' => 'Вселенные'
            ],
            [
                'table' => 'space_object_type',
                'title' => 'Типы объектов'
            ],
        ]);
        $resp->echo();
    }

    static public function getTableData()
    {
        return [
            'tableName' => "Таблица",
            'columns' => [
                'id' => 'ID',
                'name' => 'Название'
            ],
            'actions' => [
                'create',
                'update',
                'delete',
                'read'
            ]
        ];
    }
}
