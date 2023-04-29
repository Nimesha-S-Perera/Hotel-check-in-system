<?php

namespace App\Http\Controllers;

use App\Http\Resources\GuestResource;
use App\Models\ChangeLog;
use App\Models\ChangeLogDetail;
use App\Models\Guest;
use App\Http\Requests\StoreguestRequest;
use App\Http\Requests\UpdateguestRequest;
use App\Models\Room;
use Illuminate\Support\Facades\DB;

class GuestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Guest $guest)
    {
        $guests = $guest::all();
        return GuestResource::collection($guests);
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
    public function store(StoreguestRequest $request, Guest $guest)
    {
        $guest::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(StoreguestRequest $request, Guest $guest)
    {
        $nic = $request->input('nic');
        $existingGuests = $guest::where('nic', $nic)
            ->pluck('name', 'contactNumber');
        $existingGuestsCollection = collect($existingGuests);
        return $existingGuestsCollection;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Guest $guest)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateguestRequest $request, int $id, ChangeLog $changeLog, ChangeLogDetail $changeLogDetail, Room $room,Guest $guest)
    {
        $updateGuest = $guest::Find($id);
        $updateGuest->update($request->all());
        $updateGuest->save();

        $ChangeLog = $changeLog->create([
            'entity' => $request->input('entity'),
            'changedDate' => $request->input('changedDate'),
            'userID' => $request->input('userID')
        ]);

        $changeLogDetail->create([
            'changeLogID' => $ChangeLog->id,
            'userID' => $request->input('userID'),
            'checkInDate' => $request->input('checkInDate'),
            'checkOutDate' => $request->input('checkOutDate'),
            'stayType' => $request->input('stayType'),
            'actualCheckOutDate' => null,
            'guestID' => $ChangeLog->id
        ]);

        DB::commit();


    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Guest $guest, int $id)
    {
        $guest::destroy($id);
    }
}
