package api.stock.stock.api.search;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class SearchDto {
    private String searchId;
    private String searchContent;
    private String userEmail;
}
