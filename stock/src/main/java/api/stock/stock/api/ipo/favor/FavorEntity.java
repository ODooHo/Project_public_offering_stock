package api.stock.stock.api.ipo.favor;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "favor")
@Table(name = "favor")
public class FavorEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer favorId;
    private String ipoName;
    private String userEmail;
}
