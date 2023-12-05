package api.stock.stock.api.community.comment;

import api.stock.stock.global.response.ResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/community/board")
public class CommentController {
    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/{boardId}/comment")
    ResponseDto<List<CommentEntity>> getComment(@PathVariable Integer boardId){
        ResponseDto<List<CommentEntity>> result = commentService.getComment(boardId);
        return result;
    }

    @PostMapping("/{boardId}/writeComment")
    ResponseDto<CommentEntity> writeComment(@PathVariable Integer boardId, @RequestBody CommentDto requestBody){
        ResponseDto<CommentEntity> result = commentService.writeComment(boardId,requestBody);
        return result;
    }

    @PatchMapping("/{boardId}/edit/{commentId}")
    ResponseDto<PatchCommentResponseDto> patchComment(@AuthenticationPrincipal String userEmail,@PathVariable Integer commentId, @RequestBody PatchCommentDto requestBody){
        ResponseDto<PatchCommentResponseDto> result = commentService.patchComment(userEmail,commentId, requestBody);
        return result;
    }

    @DeleteMapping("/{boardId}/delete/{commentId}")
    ResponseDto<String> deleteComment(@AuthenticationPrincipal String userEmail, @PathVariable Integer commentId){
        ResponseDto<String> result = commentService.deleteComment(userEmail, commentId);
        return result;
    }





}
