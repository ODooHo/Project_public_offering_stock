package api.stock.stock.api.community.board;

import api.stock.stock.global.response.ResponseDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BoardService {

    private final BoardRepository boardRepository;

    public BoardService(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }



    public ResponseDto<BoardEntity> register() {
        return null;
    }

    public ResponseDto<BoardEntity> getBoard(Integer boardId) {
        BoardEntity board = new BoardEntity();

        try{
            board = boardRepository.findByBoardId(boardId);
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed("DataBase Error!");
        }
        return ResponseDto.setSuccess("Success",board);
    }

    public ResponseDto<List<BoardEntity>> getList() {
        List<BoardEntity> boardList = new ArrayList<>();
        try{
            boardList = boardRepository.findByOrderByBoardWriteDateDescBoardNumberDesc();
        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("DataBase Error!");
        }

        return ResponseDto.setSuccess("Success", boardList);
    }


    public ResponseDto<?> increaseView(Integer boardId) {
        BoardEntity boardEntity = boardRepository.findByBoardId(boardId);
        Integer boardClick = boardEntity.getBoardClickCount();
        try{
            boardEntity.setBoardClickCount(boardClick + 1);
            boardRepository.save(boardEntity);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("DataBase Error!");
        }
        return ResponseDto.setSuccess("Success",null);
    }


}
