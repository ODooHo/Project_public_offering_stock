package api.stock.stock.api.ipo;

import api.stock.stock.global.response.ResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Slf4j
class IpoServiceTest {
    @Autowired
    private IpoService ipoService;
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


}
