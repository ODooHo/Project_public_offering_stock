package api.stock.stock.api.trade;

import api.stock.stock.global.response.ResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/myPage/trade")
public class TradeController {

    private final TradeService tradeService;

    @Autowired
    public TradeController(TradeService tradeService) {
        this.tradeService = tradeService;
    }

    @PostMapping("/createTrade")
    ResponseDto<TradeEntity> createTrade(@RequestBody TradeDto requestBody){
        ResponseDto<TradeEntity> result = tradeService.createTrade(requestBody);
        return result;
    }

    @GetMapping("/getTrade")
    ResponseDto<List<TradeEntity>> getTrade(@RequestBody String requestBody){
        ResponseDto<List<TradeEntity>> result = tradeService.getTradeList(requestBody);
        return result;
    }

    @GetMapping("/deleteTrade/{tradeId}")
    ResponseDto<?>deleteTrade(@PathVariable String tradeId){
        ResponseDto<?> result = tradeService.deleteTrade(tradeId);
        return result;
    }


}
