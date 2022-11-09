<?php

namespace App\Repos\Eloquent;

use App\Classes\Response;
use App\Models\Admins;
use App\Repos\Base\BaseRepoEloquent;
use App\Repos\Contracts\AuthContract;
use App\Traits\ApiResponser;
use Illuminate\Http\Response as ResponseCode;
use Illuminate\Support\Facades\Auth;


class AuthEloquent Extends BaseRepoEloquent implements AuthContract
{
    use ApiResponser;
    /**
     * UserRepository constructor.
     *
     * @param Admins $role
     */
    public function __construct(Admins $admin)
    {
        parent::__construct($admin);
    }

    public function login($requestData)
    {
        if(Auth::attempt($requestData))
        {
            $authUser = Auth::user();
            return $this->isActive($authUser);
        }
        return response()->json(['errors' => ['error' => ['Unauthenticated.']], 'message'=> 'البيانات لا تتطابق مع سجلاتنا'], 401);


    }

    public function isActive($authUser)
    {
        if($authUser->isActive == 0)
        {
            $authUser->tokens()->delete();
            Auth::logout();
            return response()->json(['errors' => ['error' => ['Not active.']], 'message'=> 'الحساب غير نشط'], 401);
        }
        return response()->json(['message' => 'تم التسجيل بنجاح', 'data' => $this->getUserData($authUser)]);
    }
    public function logout()
    {
        if (auth()->check())
        {
            auth()->user()->tokens()->delete();
            Auth::logout();
        }
        return response()->json(['message' => 'تم تسجيل الخروج بنجاح']);
    }
   public function refresh()
   {
       $admin = Auth::user();
       $admin->tokens()->delete();
       return $this->getUserData($admin);
   }
   public function getUserData($authUser)
   {
       $data['id'] = $authUser->id;
       $data['name'] = $authUser->name;
       $data['email'] = $authUser->email;
       $data['mobile_phone'] = $authUser->mobile_phone;
       $data['isActive'] = $authUser->isActive;
       $data['isSuperAdmin'] = $authUser->isSuperAdmin;
       $data['token'] = 'Bearer ' . $authUser->createToken($authUser->name)->plainTextToken;
       return $data;
   }

}
