package api.stock.stock.api.community.board;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BoardDto {
    private Integer boardId;
    private String boardTitle;
    private String boardContent;
    private String boardWriterEmail;
    private String boardWriterProfile;
    private String boardWriterNickname;
    private LocalDate boardWriteDate;
    private String boardImage;

//    public byte[] getBoardImageBytes() {
//        try {
//            return boardImage.getBytes();
//        } catch (IOException e) {
//            // 에러 처리
//            return null;
//        }
//    }

}
