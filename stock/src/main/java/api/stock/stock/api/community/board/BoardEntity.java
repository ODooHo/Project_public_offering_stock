package api.stock.stock.api.community.board;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "Board")
@Table(name = "Board")
public class BoardEntity {
    @Id
    private Integer boardId;
    private String boardTitle;
    private String boardContent;
    private String boardImage;
    private String boardWriterEmail;
    private String boardWriterProfile;
    private LocalDate boardWriteDate;
    private int boardClickCount;
    private int boardLikeCount;
    private int boardCommentCount;

}
