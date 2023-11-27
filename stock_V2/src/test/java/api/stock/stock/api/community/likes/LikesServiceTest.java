package api.stock.stock.api.community.likes;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Slf4j
class LikesServiceTest {

    @Autowired
    private LikesRepository likesRepository;
    @Autowired
    private LikesService likesService;

//    @Test
//    void addLike() {
//        //given
//        LikesDto dto = new LikesDto();
//        dto.setBoardId(1);
//        dto.setUserEmail("1");
//
//        //when
//        ResponseDto<LikesEntity> response = likesService.addLike(dto);
//
//
//        //then
//        assertThat(response.getMessage()).isEqualTo("Success");
//        assertThat(response.getData()).isNotNull();
//
//        log.info("LikesTest {}",response.getData());
//    }
}