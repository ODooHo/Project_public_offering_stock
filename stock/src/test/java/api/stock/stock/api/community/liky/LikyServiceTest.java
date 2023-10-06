package api.stock.stock.api.community.liky;

import api.stock.stock.global.response.ResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@Slf4j
class LikyServiceTest {

    @Autowired
    private LikyRepository likyRepository;
    @Autowired
    private LikyService likyService;

    @Test
    void addLike() {
        //given
        LikyDto dto = new LikyDto();
        dto.setBoardId(1);
        dto.setUserEmail("1");

        //when
        ResponseDto<LikyEntity> response = likyService.addLike(dto);


        //then
        assertThat(response.getMessage()).isEqualTo("Success");
        assertThat(response.getData()).isNotNull();

        log.info("LikyTest {}",response.getData());
    }
}