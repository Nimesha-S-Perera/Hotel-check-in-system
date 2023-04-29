<?php

namespace App\Http\Controllers;

use App\Http\Resources\ChangeLogResource;
use App\Models\ChangeLog;
use App\Http\Requests\StoreChangeLogRequest;
use App\Http\Requests\UpdateChangeLogRequest;

class ChangeLogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(ChangeLog $changeLog)
    {
        $ChangeLog = $changeLog::all();
        return ChangeLogResource::collection($ChangeLog);
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
    public function store(StoreChangeLogRequest $request)
    {

    }

    /**
     * Display the specified resource.
     */
    public function show(ChangeLog $changeLog)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ChangeLog $changeLog)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateChangeLogRequest $request, ChangeLog $changeLog)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ChangeLog $changeLog)
    {
        //
    }
}
