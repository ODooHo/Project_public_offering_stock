package api.stock.stock.api.community.board;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class PatchBoardDto {
    private String boardTitle;
    private String boardContent;
}
