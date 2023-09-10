package api.stock.stock.api.community.board;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BoardDto {
    private int boardId;
    private String boardTitle;
    private String boardContent;
    private String boardImage;
    private String boardWriterEmail;
    private String boardWriterProfile;
    private String boardWriterNickname;
    private LocalDate boardWriteDate;
    private int boardClickCount;
    private int boardLikeCount;
    private int boardCommentCount;

}
