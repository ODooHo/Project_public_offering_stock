package api.stock.stock.api.community.comment;

import api.stock.stock.api.community.board.BoardDto;
import api.stock.stock.api.community.board.BoardEntity;
import api.stock.stock.global.response.ResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@Slf4j
class CommentServiceTest {
    @Autowired
    private CommentService commentService;

    @Test
    public void writeComment() {
        // Given
        CommentDto dto = new CommentDto();
        dto.setBoardId(1);
        dto.setCommentWriterEmail("test@example.com");
        dto.setCommentContent("2");
        dto.setCommentWriterNickname("1");
        // When
        ResponseDto<CommentEntity> response = commentService.writeComment(2,dto);
        // Then
        log.info("Comment {}",response.getData());
        assertThat(response.getMessage()).isEqualTo("Success");
        assertThat(response.getData()).isNotNull();
    }

//    @Test
//    public void getComment(){
//        //Given
//        Integer boardId = 1;
//        //When
//        ResponseDto<List<CommentEntity>> response = commentService.getComment(boardId);
//        //Then
//        log.info("Comment {}",response.getData());
//        assertThat(response.getMessage()).isEqualTo("Success");
//        assertThat(response.getData()).isNotNull();
//    }
//
//    @Test
//    public void patchComment(){
//        //given
//        String userEmail = "1";
//        Integer commentId = 1;
//        PatchCommentDto dto = new PatchCommentDto();
//        dto.setCommentContent("patch");
//        //when
//        ResponseDto<PatchCommentResponseDto> response = commentService.patchComment(userEmail,commentId,dto);
//        //then
//        log.info("PatchComment {}",response.getData());
//        assertThat(response.getMessage()).isEqualTo("Success");
//        assertThat(response.getData()).isNotNull();
//    }
//
//
//    @Test
//    public void deleteComment(){
//        //given
//        String userEmail = "1";
//        Integer commentId = 2;
//        //when
//        ResponseDto<String> response = commentService.deleteComment(userEmail,commentId);
//        //then
//        log.info("DeleteComment {}",response.getData());
//        assertThat(response.getMessage()).isEqualTo("Success");
//        assertThat(response.getData()).isNotNull();
//    }
//

    @Test
    public void delete(){
        //given
        String userEmail = "1";
        Integer boardId = 23;
        //when
        ResponseDto<String> response = commentService.deleteByBoard(boardId);
        //then
        log.info("DeleteComment {}", response.getData());
        assertThat(response.getMessage()).isEqualTo("Success");
        assertThat(response.getData()).isNotNull();
    }

}