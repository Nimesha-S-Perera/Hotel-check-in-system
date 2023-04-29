<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Room_Package;
use App\Http\Requests\StoreRoom_PackageRequest;
use Illuminate\Support\Facades\DB;
class tessts extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    $roomPackages = Room_Package::all()->groupBy('roomType');
    return $roomPackages;
}

public function roomDetails(Room_Package $roomPackage)
{
    $packages = $roomPackage::all()->groupBy('roomType'); // group the packages by roomType

    $table = [];
    foreach($packages as $roomType => $packagesOfType){
        $tableRow = [
            'roomType' => $roomType,
            'price(FB)' => 0,
            'price(BB)' => 0,
        ];
        foreach($packagesOfType as $package){
            if($package->stayType === 'FB'){
                $tableRow['price(FB)'] = $package->price;
            }
            else if($package->stayType === 'BB'){
                $tableRow['price(BB)'] = $package->price;
            }
        }
        $table[] = $tableRow;
    }
    return response()->json($table);
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
        $fbPrice = $request->input('pricefb');
        $roomType = $request->input('roomType');
        $bbPrice = $request->input('pricebb');        
        DB::table('room__packages')->insert(
                [
                    'stayType' => "FB",
                    'roomType' => $roomType,
                    'price' => $fbPrice
                      ]
        );        
        DB::table('room__packages')->insert(
                [
                    'stayType' => "BB",
                    'roomType' => $roomType,
                    'price' => $bbPrice
                      ]
        );        
        return Room_Package::all();
    
    }
    
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePackageRequest $request, int $id, Package $package)
    {
        $updatePackage = $package::Find($id);
        $updatePackage->update($request->all());
        $updatePackage->save();
    }

    /**
     * Remove the specified resource from storage.
     */
public function destroy(string $roomType)
{
    Room_Package::where('roomType', $roomType)->delete();
    return response()->json(['message' => 'All records with the roomType '.$roomType.' have been deleted successfully.']);
}

}
