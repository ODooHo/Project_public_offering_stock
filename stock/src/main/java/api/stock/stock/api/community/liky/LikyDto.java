package api.stock.stock.api.community.liky;

import lombok.*;


@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class LikyDto{
    private Integer likeId;
    private Integer boardId;
    private String userEmail;
}
