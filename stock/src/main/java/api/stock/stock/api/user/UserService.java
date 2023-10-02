package api.stock.stock.api.user;

import api.stock.stock.api.community.board.BoardRepository;
import api.stock.stock.api.file.FileService;
import api.stock.stock.global.response.ResponseDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final ModelMapper modelMapper;
    private final FileService fileService;

    @Autowired
    public UserService(UserRepository userRepository, BoardRepository boardRepository, ModelMapper modelMapper, FileService fileService) {
        this.userRepository = userRepository;
        this.boardRepository = boardRepository;
        this.modelMapper = modelMapper;
        this.fileService = fileService;
    }


    public ResponseDto<PatchUserResponseDto> patchUser(String userNickname, MultipartFile userProfile, String userEmail) {
        UserEntity userEntity = null;

        try{
            userEntity = userRepository.findByUserEmail(userEmail);
            if(userEntity == null){
                return ResponseDto.setFailed("Does Not Exist User");
            }
            userEntity.setUserNickname(userNickname);
            fileService.setProfile(userProfile,userEmail);
            userRepository.save(userEntity);

        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("DataBase Error!");
        }

        userEntity.setUserPassword("");
        PatchUserResponseDto patchUserResponseDto = new PatchUserResponseDto(userEntity);

        return ResponseDto.setSuccess("Success",patchUserResponseDto);
    }

    public ResponseDto<MyPageDto> myPage(String userEmail) {
        UserEntity user = null;

        try{
            user = userRepository.findByUserEmail(userEmail);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("DataBase Error!");
        }
        MyPageDto result = new MyPageDto();
        result.setUserNickname(user.getUserNickname());
        result.setUserEmail(user.getUserEmail());
        result.setUserProfile(user.getUserProfile());

        return ResponseDto.setSuccess("Success",result);
    }
}
