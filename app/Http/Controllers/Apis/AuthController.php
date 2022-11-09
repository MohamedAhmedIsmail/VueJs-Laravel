<?php

namespace App\Http\Controllers\Apis;
use App\Http\Controllers\Controller;
use App\Http\Requests\AuthRequest;
use App\Repos\Contracts\AuthContract;
use App\Traits\ApiResponser;


class AuthController extends Controller
{

    use ApiResponser;
    private $authRepository;

    public function __construct(AuthContract $authRepository)
    {
        $this->authRepository = $authRepository;
    }

    public function login(AuthRequest $request)
    {
        return $this->authRepository->login($request->all());
    }

    public function logout()
    {
        return $this->authRepository->logout();
    }

}
