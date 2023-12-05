package api.stock.stock.api.trade;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TradeDto {
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
