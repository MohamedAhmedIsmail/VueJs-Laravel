<?php

namespace App\Repos\Contracts;

use App\Repos\Base\BaseRepoContract;

interface AuthContract extends BaseRepoContract
{
    public function login($requestData);
    public function logout();
    public function refresh();
    public function getUserData($authUser);
}
