package api.stock.stock.api.auth;

import api.stock.stock.api.user.UserEntity;
import api.stock.stock.global.response.ResponseDto;
import api.stock.stock.global.security.TokenProvider;
import api.stock.stock.api.user.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.modelmapper.ModelMapper;
import org.modelmapper.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
@Service
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final TokenProvider tokenProvider;
    private final ModelMapper modelMapper;
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    public AuthService(UserRepository userRepository, TokenProvider tokenProvider, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.tokenProvider = tokenProvider;
        this.modelMapper = modelMapper;

    }

    public ResponseDto<UserEntity> signUp(SignUpDto dto){
        String userEmail = dto.getUserEmail();
        String userPassword = dto.getUserPassword();
        String userNickname = dto.getUserNickname();

        //이메일 중복 확인
        try{
            if (userRepository.existsById(userEmail)){
                return ResponseDto.setFailed("Email already exist!");
            }
            if (userRepository.existsByUserNickname(userNickname)){
                return ResponseDto.setFailed("Nickname already exist!");
            }
        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("DataBase Error!");
        }

        UserEntity userEntity = modelMapper.map(dto,UserEntity.class);

        String encodedPassword = passwordEncoder.encode(userPassword);
        userEntity.setUserPassword(encodedPassword);
        try {
            userRepository.save(userEntity);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed("DataBase Error!");
        }
        return ResponseDto.setSuccess("Success",userEntity);
    }

    public ResponseDto<SignInResponseDto> signIn(SignInDto dto){
        String userEmail = dto.getUserEmail();
        String userPassword = dto.getUserPassword();

        UserEntity userEntity = null;

        try{
            userEntity = userRepository.findByUserEmail(userEmail);
            if(userEntity == null){
                return ResponseDto.setFailed("Unknown User!");
            }
            if(!passwordEncoder.matches(userPassword,userEntity.getUserPassword())){
                return ResponseDto.setFailed("Different Password!");
            }
        }catch (Exception e){
            e.printStackTrace();
            ResponseDto.setFailed("DataBase Error!");
        }
        userEntity.setUserPassword("");

        String token = tokenProvider.createAccessToken(userEmail);
        Integer exprTime = 1800000;

        String refreshToken = tokenProvider.createRefreshToken(userEmail);
        Integer refreshExprTime = 360000000;


        SignInResponseDto signInResponseDto = new SignInResponseDto(token,exprTime,refreshToken,refreshExprTime,userEntity);
        return ResponseDto.setSuccess("Success",signInResponseDto);
    }




}
