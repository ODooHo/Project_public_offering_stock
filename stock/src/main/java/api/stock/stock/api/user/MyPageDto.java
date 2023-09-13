package api.stock.stock.api.user;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class MyPageDto {
    private String userEmail;
    private String userNickname;
    private String userProfile;
}
