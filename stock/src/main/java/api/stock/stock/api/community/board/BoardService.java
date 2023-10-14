package api.stock.stock.api.community.board;

import api.stock.stock.api.file.FileService;
import api.stock.stock.global.response.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class BoardService {

    private final BoardRepository boardRepository;
    private final ModelMapper modelMapper;
    private final FileService fileService;

    @Autowired
    public BoardService(BoardRepository boardRepository, ModelMapper modelMapper, FileService fileService) {
        this.boardRepository = boardRepository;
        this.modelMapper = modelMapper;
        this.fileService = fileService;
    }



    public ResponseDto<BoardEntity> register(
            String boardTitle,
            String boardContent,
            String boardWriterEmail,
            String boardWriterProfile,
            String boardWriterNickname,
            String boardWriteDate,
            MultipartFile boardImage) {

//        DateTimeFormatter formatter = DateTimeFormatter.ISO_INSTANT;
//        ZonedDateTime zonedDateTime = ZonedDateTime.parse(boardWriteDate, formatter.withZone(ZoneId.of("UTC")));
//        LocalDate localDate =  zonedDateTime.toLocalDate();
        //localDate = LocalDate.now();

        BoardEntity board = new BoardEntity();
        board.setBoardTitle(boardTitle);
        board.setBoardContent(boardContent);
        board.setBoardWriterEmail(boardWriterEmail);
        board.setBoardWriterProfile(boardWriterProfile);
        board.setBoardWriterNickname(boardWriterNickname);
        board.setBoardWriteDate(LocalDate.now());
        //board.setBoardImage(dto.getBoardImageBytes());
        boardRepository.save(board);
        try{
            fileService.uploadImage(boardImage,board);
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
            Integer current = board.getBoardClickCount();
            board.setBoardLikeCount(current + 1);
            boardRepository.save(board);
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed("DataBase Error");
        }
        return ResponseDto.setSuccess("Success",board);
    }

    public ResponseDto<List<BoardEntity>> getList() {
        List<BoardEntity> boardList = new ArrayList<>();
        try{
            boardList = boardRepository.findByOrderByBoardWriteDateDescBoardIdDesc();
        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("DataBase Error");
        }

        return ResponseDto.setSuccess("Success", boardList);
    }

    public ResponseDto<PatchBoardResponseDto> patchBoard(Integer boardId, PatchBoardDto dto){
        BoardEntity board = boardRepository.findByBoardId(boardId);
        String boardTitle = dto.getBoardTitle();
        String boardContent = dto.getBoardContent();
        LocalDate date = dto.getBoardWriteDate();

        try{
            board.setBoardTitle(boardTitle);
            board.setBoardContent(boardContent);
            board.setBoardWriteDate(date);
            boardRepository.save(board);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("DataBase Error");
        }
        PatchBoardResponseDto response = new PatchBoardResponseDto(board);


        return ResponseDto.setSuccess("Success",response);
    }

    public ResponseDto<String> deleteBoard(Integer boardId){
        try{
            boardRepository.deleteBoardEntityByBoardId(boardId);
        }catch (Exception e){
            return ResponseDto.setFailed("DataBase Error");
        }
        return ResponseDto.setSuccess("Success","Delete Completed");
    }



}
