<?php

namespace App\Http\Controllers;

use App\Http\Resources\PackageResource;
use App\Models\Package;
use App\Http\Requests\StorePackageRequest;
use App\Http\Requests\UpdatePackageRequest;
use Illuminate\Support\Facades\DB;

class PackageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Package $package)
    {
        $packages = $package::all();
        return PackageResource::collection($packages);
    }

    // //get room details with clasification
    public function roomDetails(Package $package){
        $packages = $package::all()->groupBy('roomType'); // group the packages by roomType
    
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


//    //Store a newly created resource in storage.
public function store(StorePackageRequest $request)
{
    $stayType = $request->input('stayType');
    $roomType = $request->input('roomType');
    $price = $request->input('price');

    DB::table('packages')->insert(
        [
            'stayType' => $stayType,
            'roomType' => $roomType,
            'price' => $price
        ]
    );

    return DB::table('packages')->get();
   // return ('hi');
}


    /**
     * Display the specified resource.
     */
    public function show(Package $package)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Package $package)
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
    public function destroy(Package $package, int $id)
    {
        $package::destroy($id);
    }


}
