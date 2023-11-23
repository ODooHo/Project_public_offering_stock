package api.stock.stock.api.ipo;

import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "test")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class IpoEntity {
    @Id
    private String id;
    private String ipoName;
    private String ipoCode;
    private String owner;
    private String locate;
    private String seed;
    private String business;
    private String ipoQuantity;
    private String faceValue;
    private String collusion;
    private String chief;
    private String compete;
    private String commit;
    private String date;
    private String publicDate;
    private List<String> sale;
    private List<String> profit;
    private List<String> pureProfit;
    private String protect;
    private String protectPercent;
    private String possible;
    private String possiblePercent;
    private String sharedQuantity;
    private String finalCollusion;
}
