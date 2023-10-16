package api.stock.stock.api.community.comment;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "Comment")
@Table(name = "Comment")
public class CommentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer commentId;
    private Integer boardId;
    private String commentWriterEmail;
    private String commentContent;
    private LocalDate commentWriteDate;
    private String commentWriterNickname;
}
