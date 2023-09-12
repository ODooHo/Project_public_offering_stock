package api.stock.stock.api.community.board;

import api.stock.stock.global.response.ResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
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
        BoardDto dto = new BoardDto();
        dto.setBoardId(1);
        dto.setBoardTitle("1");
        dto.setBoardContent("1");
        dto.setBoardWriterEmail("1");
        dto.setBoardWriterProfile("1");
        dto.setBoardWriterNickname("1");
        dto.setBoardWriteDate(LocalDate.parse("2023-09-12"));
        dto.setBoardImage("default.jpg");
        dto.setBoardClickCount(1);
        dto.setBoardLikeCount(1);
        dto.setBoardCommentCount(1);
        // When
        ResponseDto<BoardEntity> response = boardService.register(dto);
        // Then
        assertThat(response.getMessage()).isEqualTo("Success");
        assertThat(response.getData()).isNotNull();
    }

}