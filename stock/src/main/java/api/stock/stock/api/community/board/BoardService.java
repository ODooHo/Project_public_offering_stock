package api.stock.stock.api.community.board;

import api.stock.stock.global.response.ResponseDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class BoardService {

    private final BoardRepository boardRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public BoardService(BoardRepository boardRepository, ModelMapper modelMapper) {
        this.boardRepository = boardRepository;
        this.modelMapper = modelMapper;
    }



    public ResponseDto<BoardEntity> register(BoardDto dto) {
        String boardTitle = dto.getBoardTitle();
        
        BoardEntity board = modelMapper.map(dto,BoardEntity.class);
        //board.setBoardImage(dto.getBoardImageBytes());
        try{
            boardRepository.save(board);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("DataBase Error");
        }
        return ResponseDto.setSuccess("Success",board);
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
            boardList = boardRepository.findByOrderByBoardWriteDateDescBoardIdDesc();
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
