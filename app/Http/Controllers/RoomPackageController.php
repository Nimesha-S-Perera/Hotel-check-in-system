<?php

namespace App\Http\Controllers;

use App\Models\Room_Package;
use App\Http\Requests\StoreRoom_PackageRequest;
use App\Http\Requests\UpdateRoom_PackageRequest;
use Illuminate\Support\Facades\DB;






// use Carbon\Carbon;
// use App\Http\Requests\StorebookingRequest;
// use App\Http\Resources\RoomResource;
// use App\Models\Room;
// use App\Http\Requests\StoreroomRequest;
// use App\Http\Requests\UpdateroomRequest;
// use http\Env\Request;
// use Illuminate\Support\Facades\DB;

class RoomPackageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(RoomPackage $roomPackage)
    {
        // $roomPackages = $roomPackage::all();
        // return response()->json($roomPackages);
        return Room_Package::all();
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
    public function store(StoreRoom_PackageRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Room_Package $room_Package)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Room_Package $room_Package)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoom_PackageRequest $request, Room_Package $room_Package)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Room_Package $room_Package)
    {
        //
    }
}


