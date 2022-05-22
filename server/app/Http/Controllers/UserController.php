<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    // function getUsers() {

    // }
    function create(Request $req)
    {
        $email = $req->input('email');
        $user_with_this_email = User::where('email', $email)->first();

        if ($user_with_this_email) {
            $resp = ApiController::getResp();
            $resp->setMessage("Email already used");
            $resp->setStatus("Error");
            $resp->addFormAlert("error", "Email already used");
            $resp->echo();
            return;
        }

        $user = new User();
        $user->name = $req->input("name");
        $user->email = $req->input("email");
        $user->password = $req->input("password");

        $user->save();

        $resp = ApiController::getResp();
        $resp->addFormAlert("success", "User added");
        $resp->echo();
    }
}
