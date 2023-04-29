<?php

namespace App\Http\Controllers;

use App\Http\Resources\ChangeLogDetailResource;
use App\Models\ChangeLogDetail;
use App\Http\Requests\StoreChangeLogDetailsRequest;
use App\Http\Requests\UpdateChangeLogDetailsRequest;

class ChangeLogDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(ChangeLogDetail $changeLogDetail)
    {
        $changeLogDetails = $changeLogDetail::all();
        return ChangeLogDetailResource::collection($changeLogDetails);
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
    public function store(StoreChangeLogDetailsRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ChangeLogDetail $changeLogDetails)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ChangeLogDetail $changeLogDetails)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateChangeLogDetailsRequest $request, ChangeLogDetail $changeLogDetails)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ChangeLogDetail $changeLogDetails)
    {
        //
    }
}
