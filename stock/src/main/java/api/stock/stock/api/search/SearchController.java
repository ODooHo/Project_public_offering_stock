package api.stock.stock.api.search;

import api.stock.stock.api.community.board.BoardEntity;
import api.stock.stock.api.ipo.IpoEntity;
import api.stock.stock.global.response.ResponseDto;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/search")
public class SearchController {
    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping("/community")
    public ResponseDto<List<SearchEntity>>getRecentBoard(@AuthenticationPrincipal String userEmail){
        ResponseDto<List<SearchEntity>> result = searchService.getRecentBoard(userEmail);
        return result;
    }

    @GetMapping("/stock")
    public ResponseDto<List<SearchEntity>>getRecentIpo(@AuthenticationPrincipal String userEmail){
        ResponseDto<List<SearchEntity>> result = searchService.getRecentIpo(userEmail);
        return result;
    }

    @PostMapping("/stock")
    public ResponseDto<List<IpoEntity>>searchIpo(@RequestBody SearchDto requestBody){
        ResponseDto<List<IpoEntity>> result = searchService.searchIpo(requestBody);
        return result;
    }

    @PostMapping("/community")
    public ResponseDto<List<BoardEntity>>searchBoard(@RequestBody SearchDto requestBody){
        ResponseDto<List<BoardEntity>> result = searchService.searchBoard(requestBody);
        return result;
    }

    @DeleteMapping("/{searchId}/delete")
    public ResponseDto<String>deleteSearchWord(@PathVariable Integer searchId){
        ResponseDto<String> result = searchService.deleteSearchWord(searchId);
        return result;
    }


}
