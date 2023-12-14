package api.stock.stock.api.auth;

import api.stock.stock.api.user.UserEntity;
import api.stock.stock.api.user.UserRepository;
import api.stock.stock.global.response.ResponseDto;
import api.stock.stock.global.security.TokenProvider;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@Slf4j
@SpringBootTest
class AuthServiceTest {

    @Autowired
    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private AuthService authService;


    //Test with mock
    //실제 의존성을 대체하여 코드 일부분 테스트 가능, 외부와 동일한 조건에서 테스트 가능, 독립적인 테스트 가능

//    @Test
//    void signUp_Success() {
//        // Mocking dependencies and preparing data
//        UserRepository userRepository = mock(UserRepository.class);
//        TokenProvider tokenProvider = mock(TokenProvider.class);
//        ModelMapper modelMapper = new ModelMapper();
//
//        AuthService authService = new AuthService(userRepository, tokenProvider, modelMapper);
//
//        // Prepare a SignUpDto
//        SignUpDto dto = new SignUpDto();
//        dto.setUserEmail("test@example.com");
//        dto.setUserNickname("testNickname");
//        dto.setUserPassword("testPassword");
//        dto.setUserPhoneNumber("1234567890");
//        dto.setUserProfile("profileUrl");
//
//        // Mock UserRepository behavior
//        when(userRepository.existsById("test@example.com")).thenReturn(false);
//        when(userRepository.existsByUserNickname("testNickname")).thenReturn(false);
//
//
//        // Testing the signUp method
//        ResponseDto<UserEntity> response = authService.signUp(dto);
//
//        // Assertions
//        Assertions.assertThat(response.isResult()).isTrue();
//        Assertions.assertThat(response.getMessage()).isEqualTo("Success!");
//
//        UserEntity userEntity = response.getData();
//        Assertions.assertThat(userEntity).isNotNull();
//        Assertions.assertThat(userEntity.getUserEmail()).isEqualTo("test@example.com");
//        Assertions.assertThat(userEntity.getUserNickname()).isEqualTo("testNickname");
//        Assertions.assertThat(userEntity.getUserPhoneNumber()).isEqualTo("1234567890");
//        Assertions.assertThat(userEntity.getUserProfile()).isEqualTo("profileUrl");
//    }

//    @Test
//    void signUp_Success() {
//        // Prepare a SignUpDto
//        SignUpDto dto = new SignUpDto();
//        dto.setUserEmail("test");
//        dto.setUserNickname("테스트");
//        dto.setUserPassword("dhwjdgh1102");
//        dto.setUserPhoneNumber("01066378632");
//        dto.setUserProfile("default.jpg");
//
//        // Testing the signUp method
//        ResponseDto<UserEntity> response = authService.signUp(dto);
//
//        // Assertions
//        assertThat(response.getMessage()).isEqualTo("Success");
//
//        UserEntity userEntity = response.getData();
//        assertThat(userEntity).isNotNull();
//        assertThat(userEntity.getUserEmail()).isEqualTo("engh0205@naver.com");
//        assertThat(userEntity.getUserNickname()).isEqualTo("오두호");
//        assertThat(userEntity.getUserPhoneNumber()).isEqualTo("01066378632");
//        assertThat(userEntity.getUserProfile()).isEqualTo("default.jpg");
//    }



    @Test
    void signIn_Success(){
        SignInDto dto = new SignInDto();
        dto.setUserEmail("test@example.com");
        dto.setUserPassword("testPassword");

        ResponseDto<SignInResponseDto> response = authService.signIn(dto);

        assertThat(response.getMessage()).isEqualTo("Success");

        SignInResponseDto signInResponseDto = response.getData();
        log.info("User: {}",signInResponseDto.getUser());
        log.info("AccessToken: {}",signInResponseDto.getToken());
        log.info("RefreshToken: {}",signInResponseDto.getRefreshToken());

    }

}