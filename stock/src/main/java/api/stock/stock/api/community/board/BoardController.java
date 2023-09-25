package api.stock.stock.api.community.board;

import api.stock.stock.global.response.ResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/community/board")
public class BoardController {

    private final BoardService boardService;

    @Autowired
    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    @PostMapping("/writeBoard")
    public ResponseDto<BoardEntity> register(@RequestBody BoardDto requestBody){
        ResponseDto<BoardEntity> result = boardService.register(requestBody);
        return result;
    }

    @GetMapping("/list")
    public ResponseDto<List<BoardEntity>> getList(){
        ResponseDto<List<BoardEntity>> result = boardService.getList();
        return result;
    }

    @GetMapping("/{boardId}")
    public ResponseDto<BoardEntity> getBoard(@PathVariable Integer boardId){
        ResponseDto<BoardEntity> result = boardService.getBoard(boardId);
        return result;
    }

    @PatchMapping("/{boardId}/edit")
    public ResponseDto<PatchBoardResponseDto> patchBoard(@PathVariable Integer boardId, @RequestBody PatchBoardDto requestBody){
        ResponseDto<PatchBoardResponseDto> result = boardService.patchBoard(boardId, requestBody);
        return result;
    }


//    @GetMapping("/{boardId}")
//    public ResponseDto<?>increaseView(@PathVariable Integer boardId){
//        ResponseDto<?> result = boardService.increaseView(boardId);
//        return result;
//    }



}


