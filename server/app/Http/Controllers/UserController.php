<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class UserController extends Controller
{
    // function getUsers() {

    // }

    public function register(Request $request)
    {
        $resp = ApiController::getResp();
        $validator = $this->validator($request->all());

        if ($validator->fails()) {
            $resp->setFieldErrors($validator->errors()->get('*'));

            // foreach ($validator->errors()->get() as $error) {

            //     $resp->addFormAlert("error", $error);
            // }
            $resp->fail();
            $resp->echo();
            return;
        }
        $user = $this->create($request->all());
        $user = User::find($user['id']);
        $role = Role::find($user['role_id']);
        $user['role'] = $role;
        $resp->setContent([
            "user" => $user
        ]);
        $this->guard()->login($user);
        // return response()->json([
        //     'user' => $user,
        //     'message' => 'registration successful'
        // ], 200);
        $resp->addFormAlert("success", "Вы успешно зарегистрировались");
        $resp->echo();
    }
    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            //'password' => ['required', 'string', 'min:4', 'confirmed'],
            // NO PASSWORD CONFIRMATION
            'password' => ['required', 'string', 'min:4'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'],
        ]);
    }
    protected function guard()
    {
        return Auth::guard();
    }

    public function login(Request $request)
    {
        $resp = ApiController::getResp();
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            // Authentication passed...
            $authuser = auth()->user();
            $role = Role::find($authuser['role_id']);
            $authuser['role'] = $role;
            $resp->setContent([
                "user" => $authuser
            ]);
            $resp->addFormAlert('success', 'Успешный вход');
        } else {

            $resp->fail();
            $resp->addFormAlert('error', 'Неверный логин или пароль');
        }

        $resp->echo();
    }

    public function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'Logged Out'], 200);
    }

    public function index(Request $req)
    {
        $records = User::paginate(20);
        $tableData = CRUDController::getTableData();

        $tableData['tableName'] = "Пользователи";
        $tableData['columns'] = User::getColumns();
        $tableData['actions'][] = 'page';
        $tableData['page'] = '/content/crud/user_universe_camera?parentRecordId=:recordId&parentTable=user';

        $resp = ApiController::getResp();
        $resp->setContent([
            'records' => $records,
            'tableData' => $tableData,
        ]);
        $resp->echo();
    }

    public function store(Request $req)
    {
        $data = $req->all();
        User::create($data);

        $resp = ApiController::getResp();
        $resp->addFormAlert('success', 'Пользователь успешно создан');
        $resp->echo();
    }

    public function update(Request $req, User $user)
    {
        $data = $req->all();
        if ($data['password'] == '') {
            unset($data['password']);
        }
        $user->update($data);

        $resp = ApiController::getResp();
        $resp->addFormAlert('success', 'Пользователь успешно обновлен');
        $resp->echo();
    }

    public function destroy(Request $req, User $user)
    {
        $user->delete();

        $resp = ApiController::getResp();
        $resp->echo();
    }
}
// function create(Request $req)
// {
//     $email = $req->input('email');
//     $user_with_this_email = User::where('email', $email)->first();

//     if ($user_with_this_email) {
//         $resp = ApiController::getResp();
//         $resp->setMessage("Email already used");
//         $resp->setStatus("Error");
//         $resp->addFormAlert("error", "Email already used");
//         $resp->echo();
//         return;
//     }

//     $user = new User();
//     $user->name = $req->input("name");
//     $user->email = $req->input("email");
//     $user->password = $req->input("password");
//     $user->api_token = Str::random(60);

//     $user->save();
//     $this->guard()->login($user);

//     $resp = ApiController::getResp();
//     $resp->addFormAlert("success", "User added");
//     $resp->setContent(["token" => $user->api_token]);
//     $resp->echo();
// }
