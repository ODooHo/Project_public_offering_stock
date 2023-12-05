package api.stock.stock.api.community.board;

import api.stock.stock.global.response.ResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@Slf4j
class BoardServiceTest {
    @Autowired
    private BoardService boardService;

    @Test
    public void testRegister() {
        // Given
        String boardTitle = "TestBoard_2";
        String boardContent = "Test";
        String boardWriterEmail = "test@example.com";
        String boardWriterProfile = "default.jpg";
        String boardWriterNickname = "1";
        String boardWriteDate = "";
        //dto.setBoardImage("default.jpg");
        // When
        ResponseDto<BoardEntity> response = boardService.register(boardTitle,boardContent,boardWriterEmail,boardWriterProfile,boardWriterNickname,null);
        log.info("board {}",response.getData());
        // Then
        assertThat(response.getMessage()).isEqualTo("Success");
        assertThat(response.getData()).isNotNull();
    }
//    @Test
//    public void patchBoard(){
//        //given
//        PatchBoardDto dto = new PatchBoardDto();
//        Integer boardId = 1;
//        dto.setBoardContent("patch");
//        dto.setBoardTitle("Patch");
//        dto.setBoardWriteDate(LocalDate.parse("2023-10-10"));
//        //when
//        ResponseDto<PatchBoardResponseDto> response = boardService.patchBoard(boardId,dto);
//        //then
//        log.info("board {}",response.getData());
//        assertThat(response.getMessage()).isEqualTo("Success");
//        assertThat(response.getData()).isNotNull();
//    }


}