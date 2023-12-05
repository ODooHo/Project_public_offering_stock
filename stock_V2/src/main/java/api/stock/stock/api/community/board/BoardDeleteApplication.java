package api.stock.stock.api.community.board;

import api.stock.stock.api.community.comment.CommentService;
import api.stock.stock.api.community.likes.LikesService;
import api.stock.stock.api.file.FileService;
import api.stock.stock.global.response.ResponseDto;
import com.amazonaws.services.s3.AmazonS3;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BoardDeleteImpl {

    private final BoardService boardService;
    private final CommentService commentService;
    private final LikesService likesService;
    private final FileService fileService;
    private final AmazonS3 amazonS3;

    @Autowired
    public BoardDeleteImpl(BoardService boardService, CommentService commentService, LikesService likesService, FileService fileService, AmazonS3 amazonS3) {
        this.boardService = boardService;
        this.commentService = commentService;
        this.likesService = likesService;
        this.fileService = fileService;
        this.amazonS3 = amazonS3;
    }


    public ResponseDto<String> deleteInfo(String userEmail, Integer boardId){
        try{
            //사진 삭제 구현해야함
            fileService.deleteBoardImage(boardId);
            commentService.deleteByBoard(boardId);
            likesService.deleteByBoard(boardId);
            boardService.deleteBoard(userEmail,boardId);

        }catch (Exception e){
            return ResponseDto.setFailed("Database Error");
        }
        return ResponseDto.setSuccess("delete Completed","");
    }

}
