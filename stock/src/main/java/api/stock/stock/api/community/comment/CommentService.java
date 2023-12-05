package api.stock.stock.api.community.comment;

import api.stock.stock.api.community.board.BoardEntity;
import api.stock.stock.api.community.board.BoardRepository;
import api.stock.stock.global.response.ResponseDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final ModelMapper modelMapper;
    private final BoardRepository boardRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository, ModelMapper modelMapper, BoardRepository boardRepository) {

        this.commentRepository = commentRepository;
        this.modelMapper = modelMapper;
        this.boardRepository = boardRepository;
    }

    public ResponseDto<List<CommentEntity>> getComment(Integer boardId) {
        List<CommentEntity> commentList = new ArrayList<>();
        try{
            commentList = commentRepository.findByBoardId(boardId);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("DataBase Error");
        }

        return ResponseDto.setSuccess("Success", commentList);
    }

    public ResponseDto<CommentEntity> writeComment(Integer boardId, CommentDto dto) {
        CommentEntity comment = modelMapper.map(dto,CommentEntity.class);
        comment.setCommentWriteDate(LocalDate.now());
        BoardEntity board = boardRepository.findById(boardId).orElse(null);
        Integer count = board.getBoardCommentCount() + 1;
        try{
            board.setBoardCommentCount(count);
            commentRepository.save(comment);
            boardRepository.save(board);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("DataBase Error");
        }
        return ResponseDto.setSuccess("Success", comment);
    }

    public ResponseDto<PatchCommentResponseDto> patchComment(String userEmail,Integer commentId, PatchCommentDto dto){
        CommentEntity comment = commentRepository.findById(commentId).orElse(null);
        String commentUserEmail = comment.getCommentWriterEmail();
        if(!userEmail.equals(commentUserEmail)){
            return ResponseDto.setFailed("Wrong Request(userEmail doesn't Match)");
        }

        String commentContent = dto.getCommentContent();
        LocalDate date = LocalDate.now();

        try{
            comment.setCommentContent(commentContent);
            comment.setCommentWriteDate(date);
            commentRepository.save(comment);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("DataBase Error");
        }

        PatchCommentResponseDto response = new PatchCommentResponseDto(comment);

        return ResponseDto.setSuccess("Success" , response);
    }

    public ResponseDto<String> deleteComment(String userEmail, Integer commentId){
        CommentEntity comment = commentRepository.findById(commentId).orElse(null);
        String commentWriterEmail = comment.getCommentWriterEmail();

        if (!commentWriterEmail.equals(userEmail)){
            return ResponseDto.setFailed("Wrong Request(userEmail doesn't Match)");
        }

        try{
            commentRepository.deleteById(commentId);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("DataBase Error");
        }

        return ResponseDto.setSuccess("Success","Delete Completed");
    }

    public ResponseDto<String> deleteByBoard(Integer boardId){
        try{
            commentRepository.deleteAllByBoardId(boardId);
        }catch (Exception e){
            return ResponseDto.setFailed("DataBase Error");
        }

        return ResponseDto.setSuccess("Success","Delete Completed");

    }
    public ResponseDto<String> deleteByWithdraw(String userEmail){
        try{
            commentRepository.deleteAllByCommentWriterEmail(userEmail);
        }catch (Exception e){
            return ResponseDto.setFailed("DataBase Error");
        }
        return ResponseDto.setSuccess("Success","Delete Completed");

    }


}
