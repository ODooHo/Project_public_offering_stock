package api.stock.stock.api.search;

import api.stock.stock.api.community.board.BoardEntity;
import api.stock.stock.api.ipo.IpoEntity;
import api.stock.stock.global.response.ResponseDto;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/search")
public class SearchController {
    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping("/{userEmail}")
    public ResponseDto<List<SearchEntity>>getRecentSearchWord(@PathVariable String userEmail){
        ResponseDto<List<SearchEntity>> result = searchService.getRecentSearchWord(userEmail);
        return result;
    }

    @PostMapping("/stock/{searchContent}")
    public ResponseDto<List<IpoEntity>>searchIpo(@RequestBody SearchDto requestBody){
        ResponseDto<List<IpoEntity>> result = searchService.searchIpo(requestBody);
        return result;
    }

    @PostMapping("/community/{searchContent}")
    public ResponseDto<List<BoardEntity>>searchBoard(@RequestBody SearchDto requestBody){
        ResponseDto<List<BoardEntity>> result = searchService.searchBoard(requestBody);
        return result;
    }

    @DeleteMapping("{searchId}/delete")
    public ResponseDto<String>deleteSearchWord(@PathVariable Integer searchId){
        ResponseDto<String> result = searchService.deleteSearchWord(searchId);
        return result;
    }


}
