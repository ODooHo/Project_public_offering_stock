package api.stock.stock.api.ipo;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class FavorEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer favorId;
    private String ipoName;
    private String userEmail;
}
