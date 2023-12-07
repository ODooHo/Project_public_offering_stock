package api.stock.stock.api.community.likes;

import api.stock.stock.api.community.board.BoardEntity;
import api.stock.stock.api.community.board.BoardRepository;
import api.stock.stock.global.response.ResponseDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class LikesService {
    private final LikesRepository likesRepository;
    private final BoardRepository boardRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public LikesService(LikesRepository likesRepository, BoardRepository boardRepository, ModelMapper modelMapper) {
        this.likesRepository = likesRepository;
        this.boardRepository = boardRepository;
        this.modelMapper = modelMapper;
    }

    public ResponseDto<LikesEntity> addLike(LikesDto dto){
        LikesEntity likesEntity = modelMapper.map(dto, LikesEntity.class);
        try{
            boolean isLiked = likesRepository.existsByUserEmailAndBoardId(likesEntity.getUserEmail(), likesEntity.getBoardId());
            if (isLiked) {
                return ResponseDto.setFailed("Already Liked");
            }
            Integer likedBoard = likesEntity.getBoardId();
            BoardEntity board = boardRepository.findById(likedBoard).orElse(null);
            if(board != null) {
                board.setBoardLikeCount(board.getBoardLikeCount() + 1);
                boardRepository.save(board);
                likesRepository.save(likesEntity);
            }
        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("DataBase Error");
        }

        return ResponseDto.setSuccess("Success",likesEntity);
    }

    public ResponseDto<String> deleteLike(Integer boardId, String userEmail) {
        try{
            // 데이터베이스에서 사용자의 닉네임과 게시글 번호에 해당하는 좋아요 삭제
            likesRepository.deleteByBoardIdAndUserEmail(boardId, userEmail);
            // 해당 게시글의 좋아요 개수 감소
            BoardEntity board = boardRepository.findById(boardId).orElse(null);
            if (board != null) {
                board.setBoardLikeCount(board.getBoardLikeCount() - 1);
                boardRepository.save(board);
            }

        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("DataBase Error");
        }

        return ResponseDto.setSuccess("Success","Delete Completed");
    }



    public ResponseDto<Integer> getLikesCount(Integer boardId){
        Integer count = 0;
        BoardEntity board = null;
        try{
            board = boardRepository.findById(boardId).orElse(null);
            count = likesRepository.countByBoardId(boardId);
            if(!count.equals(board.getBoardLikeCount())){
                board.setBoardLikeCount(count);
                boardRepository.save(board);
            }
        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("DataBase Error");
        }

        return ResponseDto.setSuccess("Success",count);
    }

    public ResponseDto<String> deleteByBoard(Integer boardId){
        try{
            likesRepository.deleteAllByBoardId(boardId);
        }catch (Exception e){
            return ResponseDto.setFailed("DataBase Error");
        }
        return ResponseDto.setSuccess("Success", "Delete Completed");
    }

    public ResponseDto<String> deleteByWithdraw(String userEmail){
        try{
            likesRepository.deleteAllByUserEmail(userEmail);
        }catch (Exception e){
            return ResponseDto.setFailed("DataBase Error");
        }
        return ResponseDto.setSuccess("Success", "Delete Completed");
    }


}
