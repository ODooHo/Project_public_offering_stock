package api.stock.stock.api.user;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class PatchUserDto {
    private String userNickname;
    private String userProfile;
}
