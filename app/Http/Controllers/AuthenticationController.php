<?php

namespace App\Http\Controllers;

use App\enums\RoleTypeEnums;
use App\Models\Authentication;
use App\Http\Requests\StoreAuthenticationRequest;
use App\Http\Requests\UpdateAuthenticationRequest;
use App\Models\user;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Testing\Fluent\Concerns\Has;

class AuthenticationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function register(Request $request)
    {
        $request->validate([
            'employeeID' => 'required',
            'name' => 'required',
            'contactNumber' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::create([
            'employeeID' => $request->employeeID,
            'name' => $request->name,
            'contactNumber' => $request->contactNumber,
            'password' => bcrypt($request->password),
            'roleID' => $request->roleID,
            'status' => $request->status,
        ]);

        return response()->json($user);
    }

    public function login(Request $request)
    {
        try {
            $request->validate([
                'employeeID' => 'required',
                'password' => 'required'
            ]);

            $user = User::where('employeeID', $request->employeeID)->first();
            if (!$user) {
                return response()->json([
                    'message' => 'User not found. Please contact an admin.'
                ], 422);
            }

            if ($user->status == 1) {
                return response()->json([
                    'message' => 'User account is currently inactive.'
                ], 422);
            }

            $credentials = request(['employeeID', 'password']);
            if (!auth()->attempt($credentials)) {
                return response()->json([
                    'message' => 'Incorrect password.',
                ], 422);
            }

            $user->tokens()->delete();
            $authToken = $user->createToken('auth-token')->plainTextToken;

            $roleType = RoleTypeEnums::getDescription($user->role->roleType);
            $roleID = $user->role->roleType;
            return response()->json([
                'access_token' => $authToken,
                'token_type' => 'Bearer',
                'roleType' => $roleType,
                'name' => $user->name,
                'roleID' => $roleID
            ]);
        } catch (\Exception $e) {
            return response()->json([
                //'message' => 'Please enter your password'
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            $user = $request->user();
            if (!$user) {
                throw new \Exception('User not authenticated');
            }
            $user->tokens()->delete();
            return response()->json(['message' => 'Logged out successfully']);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json(['message' => 'Failed to logout']);
        }
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
    public function store(StoreAuthenticationRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Authentication $authentication)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Authentication $authentication)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAuthenticationRequest $request, Authentication $authentication)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Authentication $authentication)
    {
        //
    }
}
