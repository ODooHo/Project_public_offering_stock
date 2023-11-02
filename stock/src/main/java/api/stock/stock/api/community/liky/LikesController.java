package api.stock.stock.api.community.liky;

import api.stock.stock.global.response.ResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/community/board")
public class LikesController {
    private final LikesService likesService;

    @Autowired
    public LikesController(LikesService likesService) {
        this.likesService = likesService;
    }

    @PostMapping("/{boardId}/likes/add")
    ResponseDto<LikesEntity> addLike(@RequestBody LikesDto requestBody){
        ResponseDto<LikesEntity> result = likesService.addLike(requestBody);
        return result;
    }

    @GetMapping("/{boardId}/likes/delete/{userEmail}")
    ResponseDto<String> deleteLike(@PathVariable Integer boardId, @PathVariable String userEmail){
        ResponseDto<String> result = likesService.deleteLike(boardId, userEmail);
        return result;
    }


    @GetMapping("/{boardId}/likes/get/count")
    ResponseDto<Integer> getLikeCount(@PathVariable Integer boardId){
        ResponseDto<Integer> result = likesService.getLikesCount(boardId);
        return result;
    }

}
