package api.stock.stock.api.community.liky;

import api.stock.stock.api.community.board.BoardEntity;
import api.stock.stock.api.community.board.BoardRepository;
import api.stock.stock.global.response.ResponseDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

@Service
public class LikyService {
    private final LikyRepository likyRepository;
    private final BoardRepository boardRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public LikyService(LikyRepository likyRepository, BoardRepository boardRepository, ModelMapper modelMapper) {
        this.likyRepository = likyRepository;
        this.boardRepository = boardRepository;
        this.modelMapper = modelMapper;
    }

    public ResponseDto<LikyEntity> addLike(LikyDto dto){
        LikyEntity likyEntity = modelMapper.map(dto,LikyEntity.class);
        try{
            BoardEntity board = boardRepository.findByBoardId(likyEntity.getBoardId());
            if(board != null){
                board.setBoardLikeCount(board.getBoardClickCount() + 1);
                boardRepository.save(board);
                likyRepository.save(likyEntity);
            }
        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("DataBase Error");
        }

        return ResponseDto.setSuccess("Success",likyEntity);
    }

    public ResponseDto<String> deleteLike(Integer boardId, String userEmail) {
        try{
            // 데이터베이스에서 사용자의 닉네임과 게시글 번호에 해당하는 좋아요 삭제
            likyRepository.deleteLikyEntityByBoardIdAndUserEmail(boardId, userEmail);
            // 해당 게시글의 좋아요 개수 감소
            BoardEntity board = boardRepository.findByBoardId(boardId);
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

}
