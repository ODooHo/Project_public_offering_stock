package api.stock.stock.api.trade;

import api.stock.stock.global.response.ResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
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

    void createTest(){
        //given
        TradeDto dto  = new TradeDto();
        dto.setTradeDate(LocalDate.now());
        dto.setTradeFee(10000);
        dto.setMemo("테스트용 데이터");
        dto.setTradeName("매매일지 테스트");
        dto.setTradeQuantity(1);
        dto.setUserNickname("테스터");
        dto.setTradePrice(10000);
        dto.setTradeType("테스트 타입");

        //when
        ResponseDto<TradeEntity> response = tradeService.createTrade(dto);


        //then
        assertThat(response.getMessage()).isEqualTo("Success");
        assertThat(response.getData()).isNotNull();

        log.info("테스트 결과 {}",response.getData());
    }
}