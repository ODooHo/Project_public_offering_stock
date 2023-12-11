package api.stock.stock.api.auth;

import api.stock.stock.api.user.UserEntity;
import api.stock.stock.global.response.ResponseDto;
import api.stock.stock.global.security.TokenProvider;
import api.stock.stock.api.user.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final TokenProvider tokenProvider;
    private final ModelMapper modelMapper;
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final RedisTemplate<String, String> redisTemplate;

    @Autowired
    public AuthService(UserRepository userRepository, TokenProvider tokenProvider, ModelMapper modelMapper, RedisTemplate<String, String> redisTemplate) {
        this.userRepository = userRepository;
        this.tokenProvider = tokenProvider;
        this.modelMapper = modelMapper;
        this.redisTemplate = redisTemplate;
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

    public ResponseDto<String> emailCheck(String userEmail){
        try{
            if (userRepository.existsById(userEmail)){
                return ResponseDto.setFailed("Email already exist!");
            }
        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("DataBase Error!");
        }
        return ResponseDto.setSuccess("Success", "available Email");
    }

    public ResponseDto<String> nicknameCheck(String userNickname){
        try{
            if (userRepository.existsByUserNickname(userNickname)){
                return ResponseDto.setFailed("Nickname already exist!");
            }
        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("DataBase Error!");
        }
        return ResponseDto.setSuccess("Success", "available Nickname");
    }


    public ResponseDto<SignInResponseDto> signIn(SignInDto dto){
        String userEmail = dto.getUserEmail();
        String userPassword = dto.getUserPassword();

        UserEntity userEntity = null;

        try{
            userEntity = userRepository.findById(userEmail).orElse(null);
            if(userEntity == null){
                return ResponseDto.setFailed("Unknown User!");
            }
            if(!passwordEncoder.matches(userPassword,userEntity.getUserPassword())){
                return ResponseDto.setFailed("Different Password!");
            }
        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("DataBase Error!");
        }
        userEntity.setUserPassword("");

        String token = tokenProvider.createAccessToken(userEmail);
        Integer exprTime = 1800000;
//        Integer exprTime = 5000;
        String refreshToken = tokenProvider.createRefreshToken(userEmail);
        Integer refreshExprTime = 360000000;


        SignInResponseDto signInResponseDto = new SignInResponseDto(token,exprTime,refreshToken,refreshExprTime,userEntity);
        return ResponseDto.setSuccess("Success",signInResponseDto);
    }

    public ResponseDto<String> logout(String token){
        try{
            Long expiration = tokenProvider.getExpiration(token);
            redisTemplate.opsForValue().set(token,"logout",expiration, TimeUnit.MILLISECONDS);
            redisTemplate.opsForSet().add("Blacklist",token);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("DataBase Error (Auth)");
        }

        return ResponseDto.setSuccess("Success","Logout Completed");

    }

    public ResponseDto<RefreshResponseDto> getAccess(String refreshToken) {
        try {
            System.out.println("refreshToken = " + refreshToken);
            String accessToken = tokenProvider.createAccessTokenFromRefreshToken(refreshToken);
            Integer exprTime = 1800000;
//            Integer exprTime = 5000;

            RefreshResponseDto refreshResponseDto = new RefreshResponseDto(accessToken, exprTime);

            return ResponseDto.setSuccess("Success", refreshResponseDto);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("DataBase Error!");
        }
    }




}
