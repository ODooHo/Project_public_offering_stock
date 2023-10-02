package api.stock.stock.api.user;

import api.stock.stock.global.response.ResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sound.midi.Patch;

@RestController
@RequestMapping("/api/myPage")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseDto<MyPageDto> myPage(@AuthenticationPrincipal String userEmail){
        ResponseDto<MyPageDto> result = userService.myPage(userEmail);
        return result;

    }
    @PatchMapping("/patchUser")
    public ResponseDto<PatchUserResponseDto> patchUser(
            @RequestParam(value = "userNickname", required = false) String userNickname,
            @RequestParam(value = "userProfile",required = false) MultipartFile userProfile,
            @AuthenticationPrincipal String userEmail){
        ResponseDto<PatchUserResponseDto> result = userService.patchUser(userNickname,userProfile,userEmail);
        return result;
    }

}
