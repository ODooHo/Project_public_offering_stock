package api.stock.stock.api.community.comment;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class PatchCommentDto {
    private String commentContent;
    private LocalDate commentWriteDate;
}
