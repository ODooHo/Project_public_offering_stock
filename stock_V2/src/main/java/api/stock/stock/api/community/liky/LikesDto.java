package api.stock.stock.api.community.liky;

import lombok.*;


@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class LikesDto{
    private Integer likeId;
    private Integer boardId;
    private String userEmail;
}
