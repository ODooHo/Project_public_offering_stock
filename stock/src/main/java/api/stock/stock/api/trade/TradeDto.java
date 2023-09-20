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
    private String userNickname;
    private LocalDate tradeDate;
    private String tradeName;
    private String tradeType;
    private Integer tradePrice;
    private Integer tradeQuantity;
    private Integer tradeFee;
    private String memo;
}
