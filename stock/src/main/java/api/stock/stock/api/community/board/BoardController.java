package api.stock.stock.api.community.board;

import api.stock.stock.api.app.DeleteApplication;
import api.stock.stock.api.file.FileService;
import api.stock.stock.global.response.ResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/community/board")
public class BoardController {

    private final BoardService boardService;
    private final FileService fileService;
    private final DeleteApplication deleteApplication;

    @Autowired
    public BoardController(BoardService boardService, FileService fileService, DeleteApplication deleteApplication) {
        this.boardService = boardService;
        this.fileService = fileService;
        this.deleteApplication = deleteApplication;
    }

    @PostMapping("/writeBoard")
    public ResponseDto<BoardEntity> register(
            @RequestParam("boardTitle") String boardTitle,
            @RequestParam("boardContent") String boardContent,
            @RequestParam("boardWriterEmail") String boardWriterEmail,
            @RequestParam("boardWriterProfile") String boardWriterProfile,
            @RequestParam("boardWriterNickname") String boardWriterNickname,
            @RequestParam(value = "boardImage", required = false) MultipartFile boardImage){
        ResponseDto<BoardEntity> result = boardService.register(boardTitle, boardContent,boardWriterEmail,boardWriterProfile,boardWriterNickname,
                boardImage);
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

    @GetMapping("/{boardId}/image")
    public ResponseEntity<byte[]> getBoardImage(@PathVariable Integer boardId) throws IOException {
        ResponseEntity<byte[]> result = fileService.getBoardImage(boardId);
        return result;
    }


    @DeleteMapping("/delete/{boardId}")
    public ResponseDto<String> deleteBoard(@AuthenticationPrincipal String userEmail, @PathVariable Integer boardId){
        ResponseDto<String> result = deleteApplication.deleteBoard(userEmail,boardId);
        return result;
    }

    @PatchMapping("/edit/{boardId}")
    public ResponseDto<PatchBoardResponseDto> patchBoard(@AuthenticationPrincipal String userEmail, @PathVariable Integer boardId, @RequestBody PatchBoardDto requestBody){
            ResponseDto<PatchBoardResponseDto> result = boardService.patchBoard(userEmail, boardId, requestBody);
            return result;
    }

//    @GetMapping("/{boardId}")
//    public ResponseDto<?>increaseView(@PathVariable Integer boardId){
//        ResponseDto<?> result = boardService.increaseView(boardId);
//        return result;
//    }



}


