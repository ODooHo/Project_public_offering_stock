package api.stock.stock.api.user;

import api.stock.stock.api.file.FileService;
import api.stock.stock.global.response.ResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/myPage")
public class UserController {

    private final UserService userService;
    private final FileService fileService;

    @Autowired
    public UserController(UserService userService, FileService fileService) {
        this.userService = userService;
        this.fileService = fileService;
    }

    @GetMapping
    public ResponseDto<MyPageDto> myPage(@AuthenticationPrincipal String userEmail){
        ResponseDto<MyPageDto> result = userService.myPage(userEmail);
        return result;
    }

    @GetMapping("/profile")
    public ResponseEntity<byte[]> getProfile(@AuthenticationPrincipal String userEmail) throws IOException {
        ResponseEntity<byte[]> result = fileService.getProfileImage(userEmail);
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

    @DeleteMapping("/api/myPage/withDraw")
    public ResponseDto<String> withDraw(@AuthenticationPrincipal String userEmail){
        ResponseDto<String> result = userService.withDraw(userEmail);
        return result;
    }



}
