<?php

namespace App\Providers;

 //use Illuminate\Support\Facades\Gate;
use App\enums\RoleTypeEnums;
use App\Models\Booking;
use App\Models\Role;
use App\Models\User;
use App\Policies\BookingPolicy;
use App\Policies\RolePolicy;
use App\Policies\TaxPolicy;
use App\Policies\UserPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Laravel\Sanctum\Sanctum;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //'App\Models\Model' => 'App\Policies\ModelPolicy',
        //User::class => UserPolicy::class,
        //Role::class => RolePolicy::class,
        //Tax::class => TaxPolicy::class,
        //Booking::class => BookingPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        //$this->registerPolicies();

        /*
        Gate::define('view-bookings',function ($user){
            return $user->role->roleType === RoleTypeEnums::superAdmin ?
                Response::allow()
                : Response::deny('You are not Authorized.');
        });
        Gate::define('view-bookings', [BookingPolicy::class, 'view']);
        */
/*
        Gate::define('admin',function ($user){
            return $user->role->roleType === 2;
        });

        Gate::define('supervisor',function ($user){
            return $user->role->roleType === 3;
        });

        Gate::define('officer',function ($user){
            return $user->role->roleType === 4;
        });
        */

    }
}
