<?php

namespace App\Providers;

use App\Repos\Base\BaseRepoContract;
use App\Repos\Base\BaseRepoEloquent;
use App\Repos\Contracts\AuthContract;
use App\Repos\Eloquent\AuthEloquent;
use Illuminate\Support\ServiceProvider;

class RepoServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(BaseRepoContract::class,BaseRepoEloquent::class);
        $this->app->bind(AuthContract::class,AuthEloquent::class);
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
