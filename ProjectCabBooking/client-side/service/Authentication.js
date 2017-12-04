'use strict';
myangu.factory('AuthenticationService', Service);

function Service($http, $cookies, $sessionStorage)
{
   var service = {};
    service.authLogin = authLogin;
    service.authLogout = authLogout;
    // var socket = io();
    return service;

    function authLogin(user, callback)
    {
        $http.post('/us/verifyUser', user).then(function(response)
            {
              if (response.data.success && response.data.token) {
                    $sessionStorage.tokenDetails =
                    {
                        token: response.data.token
                    };

                $http.defaults.headers.common.Authorization = response.data.token;
                    var obj = {
                        currentUser: {
                            isLoggedIn: true,
                            userInfo:
                            {
                              myID :  response.data.userDetail._id,
                              myUsername : response.data.userDetail.sUsername,
                              myEmail :  response.data.userDetail.sEmail,
                              myMobile :  response.data.userDetail.sMobile,
                              myUserrole :  response.data.userDetail.sUserrole
                            }
                        }
                    };
                    $cookies.putObject('authUser', obj);
                    callback(response);
                }
              else
                {
                  callback(response);
                }
            });
    }

    function authLogout()
    {
        delete $sessionStorage.tokenDetails;
        $http.defaults.headers.common.Authorization = '';
        $cookies.remove('authUser');
        alert(" You are signed out! ");
    }
}
