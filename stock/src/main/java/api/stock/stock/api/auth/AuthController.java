package api.stock.stock.api.auth;

import api.stock.stock.api.app.DeleteApplication;
import api.stock.stock.api.user.UserEntity;
import api.stock.stock.global.response.ResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    private final DeleteApplication deleteApplication;

    @Autowired
    public AuthController(AuthService authService, DeleteApplication deleteApplication) {
        this.authService = authService;
        this.deleteApplication = deleteApplication;
    }

    @PostMapping("/signUp")
    public ResponseDto<UserEntity> signUp(@RequestBody SignUpDto requestBody){
        ResponseDto<UserEntity> result = authService.signUp(requestBody);
        return result;
    }

    @PostMapping("/signUp/emailCheck/{userEmail}")
    public ResponseDto<String> emailCheck(@PathVariable String userEmail){
        ResponseDto<String> result = authService.emailCheck(userEmail);
        return result;
    }

    @PostMapping("/signUp/nicknameCheck/{userNickname}")
    public ResponseDto<String> nicknameCheck(@PathVariable String userNickname){
        ResponseDto<String> result = authService.nicknameCheck(userNickname);
        return result;
    }


    @PostMapping("/signIn")
    public ResponseDto<SignInResponseDto> signIn(@RequestBody SignInDto requestBody){
        ResponseDto<SignInResponseDto> result = authService.signIn(requestBody);
        return result;
    }

    @PostMapping("/logout")
    public ResponseDto<String> logout(@RequestHeader String token){
        ResponseDto<String> result = authService.logout(token);
        return result;
    }

    @PostMapping("/getAccess")
    public ResponseDto<RefreshResponseDto> getAccess(@RequestHeader String refreshToken){
        ResponseDto<RefreshResponseDto> result = authService.getAccess(refreshToken);
        return result;
    }

    @DeleteMapping("/withDraw")
    public ResponseDto<String> withDraw(@AuthenticationPrincipal String userEmail){
        ResponseDto<String> result = deleteApplication.widthDraw(userEmail);
        return result;
    }

}
