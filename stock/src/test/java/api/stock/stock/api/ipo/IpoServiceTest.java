package api.stock.stock.api.ipo;

import api.stock.stock.api.ipo.favor.FavorRepository;
import api.stock.stock.api.ipo.favor.FavorService;
import api.stock.stock.global.response.ResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.List;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Slf4j
class IpoServiceTest {
    @Autowired
    private FavorRepository favorRepository;
    @Autowired
    private IpoService ipoService;

    @Autowired
    private FavorService favorService;

    @Autowired
    private IpoRepository ipoRepository;



    @Test
    public void getIpo() {
        // Given
        String ipoName = "유투바이오";
        IpoEntity expectedIpo = new IpoEntity();
        expectedIpo.setIpoName(ipoName);

        // When
        ResponseDto<IpoEntity> response = ipoService.getIpo(ipoName);
        // Then
        assertThat(response.getMessage()).isEqualTo("Success");

    }

    @Test
    public void getIpoList(){
        //Given

        //When
        ResponseDto<List<IpoEntity>> response = ipoService.getIpoList();

        //Then
        log.info("List {}" , response.getData());
        assertThat(response.getMessage()).isEqualTo("Success");

    }

//    @Test
//    void addFavor(){
//        //given
//        FavorDto dto = new FavorDto();
//        dto.setUserEmail("engh0205@naver.com");
//        dto.setIpoName("블루엠텍");
//        //when
//        ResponseDto<FavorEntity> response = ipoService.addFavor(dto);
//        //then
//        assertThat(response.getMessage()).isEqualTo("Success");
//        log.info("FavorTest: {}",response.getData());
//
//    }

    @Test
    void getFavorList(){
        //given
        String userEmail = "1";
        //when
        ResponseDto<List<IpoEntity>> response = favorService.getFavorList(userEmail);
        //then
        assertThat(response.getMessage()).isEqualTo("Success");
        log.info("getFavorTest: {}",response.getData());
    }

//    @Test
//    void deleteFavor(){
//        //given
//        String userEmail = "1";
//        String ipoName = "와이바이오로직스";
//        //when
//        ResponseDto<String> response = ipoService.deleteFavor(userEmail,ipoName);
//        //then
//        assertThat(response.getMessage()).isEqualTo("Success");
//    }


}
