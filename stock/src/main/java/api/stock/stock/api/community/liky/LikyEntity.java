package api.stock.stock.api.community.liky;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "liky")
@Table(name = "liky")
public class LikyEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer likeId;
    private Integer boardId;
    private String userEmail;
}