package api.stock.stock.api.auth;

import api.stock.stock.api.user.UserEntity;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SignInResponseDto {
    private String token;
    private Integer tokenExprTIme;
    private String refreshToken;
    private Integer refreshExprTime;
    private UserEntity user;
}
