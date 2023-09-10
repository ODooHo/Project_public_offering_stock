package api.stock.stock.api.ipo;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Slf4j
class IpoServiceTest {
    @Autowired
    private IpoService ipoService;
    @Autowired
    private IpoRepository ipoRepository;



    @Test
    public void testGetIpo() {
        // Given
        String ipoName = "유투바이오";
        IpoEntity expectedIpo = new IpoEntity();
        expectedIpo.setIpoName(ipoName);

        // When
        String result = ipoService.getIpo(ipoName);

        // Then
        assertThat(result).isEqualTo(expectedIpo.getIpoName());
    }
}
