package api.stock.stock.api.trade;

import api.stock.stock.global.response.ResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Slf4j
class TradeServiceTest {
    @Autowired
    private TradeRepository tradeRepository;

    @Autowired
    private TradeService tradeService;

    @Test
    void createTrade(){
        //given
        TradeDto dto  = new TradeDto();
        dto.setTradeDate(LocalDate.now());
        dto.setTradeFee(10000);
        dto.setMemo("테스트용 데이터2");
        dto.setTradeName("매매일지 테스트2");
        dto.setTradeQuantity(1);
        dto.setUserEmail("1");
        dto.setBuyPrice(10000);
        dto.setSellPrice(15000);

        //when
        ResponseDto<TradeEntity> response = tradeService.createTrade(dto);


        //then
        assertThat(response.getMessage()).isEqualTo("Success");
        assertThat(response.getData()).isNotNull();

        log.info("테스트 결과 {}",response.getData());
    }
//
//    @Test
//    void deleteTrade(){
//        //given
//        Integer tradeId = 2;
//        String userEmail = "1";
//
//        //when
//        ResponseDto<String> response = tradeService.deleteTrade(userEmail, tradeId);
//        //then
//        assertThat(response.getMessage()).isEqualTo("Success");
//    }
}