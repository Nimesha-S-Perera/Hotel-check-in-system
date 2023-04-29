<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use App\Models\Role;
use App\Http\Requests\StoreuserRequest;
use App\Http\Requests\UpdateuserRequest;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
     public function index(User $user)
    {
        $users = $user::all();
        return UserResource::collection($users);
    }
    
    public function existingemployeeID(User $user)
    {
        return $user::pluck('employeeID');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreuserRequest $request)
    {
        try{
        $data = $request->validate([
            'employeeID'=>'required|regex:/^EMP-[0-9]{4}$/',
            'name'=>'required|string|max:100',
            'contactNumber' =>'required|string|max:15',
            'password' =>'required|string|max:100',
            'status' =>'required|in:0,1',
            'roleID' =>'required|exists:roles,id'
        ]);

        $user = new User;
        $user->employeeID = $data['employeeID'];
        $user->name = $data['name'];
        $user->contactNumber = $data['contactNumber'];
        $user->password = Hash::make($data['password']);
        $user->status = $data['status'];
        $user->roleID = $data['roleID'];
        $user->save();

        return response()->json([
            "success" => true,
            "message" => "User created successfully.",
            "data" => $user

            ], 200);
        }catch(Exception $e){
            return response()->json(['error'=>$e->getMessage()],500);
        }

    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        $users = User::where('status',0)->get();
        return UserResource::collection($users);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateuserRequest $request,int $id, User $user)
    {
        $updateUser = $user::Find($id);
        $updateUser->update($request->all());
        $updateUser->save();

        return response()->json([
            "success" => true,
            "message" => "User updated successfully.",
            "data" => $updateUser

            ], 200);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $user = User::find($id);

        $user->status = 1;
        $user->save();

        return response()->json([
            "success" => true,
            "message" => "User inactivated.",
            "data" => $user

            ], 200);


    }
}

