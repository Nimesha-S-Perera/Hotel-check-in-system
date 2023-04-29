<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookingResource;
use App\Http\Resources\RoomWithGuestResource;
use App\Models\Booking;
use App\Http\Requests\StorebookingRequest;
use App\Http\Requests\UpdatebookingRequest;
use App\Models\Guest;
use App\Models\Invoice;
use App\Models\Room;
use App\Models\Tax;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class BookingController extends Controller
{
    public function index(Request $request, Booking $booking)
    {
        //$user = Auth::user();
        //if ($user->roleID == 1) {
        //new
        /*
        $response = Gate::inspect('view-bookings', $booking);

        if (! Gate::allows('view-bookings', $booking)) {
            abort(403);
        }
        if ($response->allowed()) {
            // The action is authorized...
            */

            $current_guest_only = $request->get('current_guest_only');

            if ($current_guest_only) {
                $room_data_with_current_guest = DB::table('rooms')
                    ->leftJoin('bookings', function ($join) {
                        $join->on('rooms.roomNo', '=', 'bookings.roomID')
                            ->where('rooms.status', '1')
                            ->whereRaw('bookings.id = (select max(id) from bookings where bookings.roomID = rooms.roomNo)');
                    })
                    ->leftJoin('guests', 'bookings.guestID', '=', 'guests.id')
                    ->select('rooms.*', 'bookings.*',
                        DB::raw('IFNULL(guests.name, null) as name'),
                        DB::raw('IFNULL(guests.nic, null) as nic'),
                        DB::raw('IFNULL(guests.contactNumber, null) as contactNumber'))
                    ->orderBy('bookings.id', 'desc')
                    ->get();

                return RoomWithGuestResource::collection($room_data_with_current_guest);

            } else {
                $bookings = Booking::with('room', 'guest')->get();
                return BookingResource::collection($bookings);
            }
        //} else {
          //  abort(403);
        //}
            //new
            /*
        } else {
            echo $response->message();
        }
            */

    }

    //To add new check in
    public function store(StorebookingRequest $request, Guest $guest, Booking $booking, Room $room, Invoice $invoice, Tax $tax)
    {
        $request->validate([
            'name' => ['required', 'regex:/^[a-zA-Z\s]+$/'],
            'nic' => ['required', 'regex:/^([0-9]{9}[vV]|[0-9]{12})$/'],
            'contactNumber' => ['required', 'regex:/^0[0-9]{9}$|^[1-9][0-9]{8}$/', 'regex:/^[0-9]+$/', 'string'],
        ]);

        $roomID = $request->input('roomID');
        $Guest = $guest->create([
            'name' => $request->input('name'),
            'nic' => $request->input('nic'),
            'contactNumber' => $request->input('contactNumber')
        ]);

        $booking = $booking->create([
            'roomID' => $roomID,
            'guestID' => $Guest->id,
            'stayType' => $request->input('stayType'),
            'checkInDate' => $request->input('checkInDate'),
            'checkOutDate' => $request->input('checkOutDate'),
            'actualCheckOutDate' => null,
            'userID' => $request->input('userID'),
        ]);

        $taxRate = $tax::pluck('taxRate')->first();

        $invoice->create([
            'bookingID' => $booking->id,
            'packageID' => $request->input('packageID'),
            'tax' => $taxRate,
            'total' => $request->input('total'),
        ]);

        $Room = $room->findOrFail($roomID);
        $Room->status = '1';
        $Room->save();
        DB::commit();
    }

    public function create()
    {

    }

    /**
     * Display the specified resource.
     */
    public function show(Booking $booking)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Booking $booking)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatebookingRequest $request, Booking $booking)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Booking $booking, int $id)
    {
        $booking::destroy($id);
    }
}
