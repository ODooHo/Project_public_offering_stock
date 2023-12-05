package api.stock.stock.api.trade;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity(name="trade")
@Table(name="trade")
public class TradeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer tradeId;
    private String userEmail;
    private LocalDate tradeDate;
    private String tradeName;
    private Integer buyPrice;
    private Integer sellPrice;
    private Integer tradeQuantity;
    private Integer tradeFee;
    private String memo;


}
