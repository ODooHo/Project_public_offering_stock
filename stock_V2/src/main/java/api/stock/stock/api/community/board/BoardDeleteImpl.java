package api.stock.stock.api.community.board;

import api.stock.stock.api.community.comment.CommentEntity;
import api.stock.stock.api.community.comment.CommentRepository;
import api.stock.stock.api.community.likes.LikesEntity;
import api.stock.stock.api.community.likes.LikesRepository;
import api.stock.stock.global.response.ResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardDeleteImpl {
    private final BoardRepository boardRepository;
    private final CommentRepository commentRepository;
    private final LikesRepository likesRepository;

    @Autowired
    public BoardDeleteImpl(BoardRepository boardRepository, CommentRepository commentRepository, LikesRepository likesRepository) {

        this.boardRepository = boardRepository;
        this.commentRepository = commentRepository;
        this.likesRepository = likesRepository;
    }


    public ResponseDto<String> deleteInfo(String userEmail, Integer boardId){
        try{
            //사진 삭제 구현해야함
            boardRepository.deleteById(boardId);
            commentRepository.deleteByBoardId(boardId);
            likesRepository.deleteByBoardId(boardId);
        }catch (Exception e){
            return ResponseDto.setFailed("Database Error");
        }
        return ResponseDto.setSuccess("delete Completed","");
    }

}
