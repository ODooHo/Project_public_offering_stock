package api.stock.stock.api.search;


import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "Search")
@Table(name = "Search")
public class SearchEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer searchId;
    private String searchContent;
    private String userEmail;
    private String category;
}
