package api.stock.stock.api.community.comment;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto {
    private Integer boardId;
    private String userEmail;
    private String commentContent;
    private LocalDate commentWriteDate;
    private String commentWriterNickname;
    private String commentWriterProfile;
}