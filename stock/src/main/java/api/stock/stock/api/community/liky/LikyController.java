package api.stock.stock.api.community.liky;

import api.stock.stock.global.response.ResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/community/board")
public class LikyController {
    private final LikyService likyService;

    @Autowired
    public LikyController(LikyService likyService) {
        this.likyService = likyService;
    }

    @PostMapping("/{boardId}/liky/add")
    ResponseDto<LikyEntity> addLike(@RequestBody LikyDto requestBody){
        ResponseDto<LikyEntity> result = likyService.addLike(requestBody);
        return result;
    }

    @GetMapping("/{boardId}/liky/delete/{userEmail}")
    ResponseDto<?> deleteLike(@PathVariable Integer boardId, @PathVariable String userEmail){
        ResponseDto<?> result = likyService.deleteLike(boardId, userEmail);
        return result;
    }

}
