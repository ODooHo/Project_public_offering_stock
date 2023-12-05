package api.stock.stock.api.auth;

import api.stock.stock.api.community.board.BoardService;
import api.stock.stock.api.community.comment.CommentService;
import api.stock.stock.api.community.likes.LikesService;
import api.stock.stock.api.ipo.favor.FavorService;
import api.stock.stock.api.search.SearchService;
import api.stock.stock.api.trade.TradeService;
import api.stock.stock.api.user.UserService;
import api.stock.stock.global.response.ResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WithdrawApplication {
    private final UserService userService;
    private final BoardService boardService;
    private final CommentService commentService;
    private final LikesService likesService;
    private final FavorService favorService;
    private final TradeService tradeService;
    private final SearchService searchService;


    @Autowired
    public WithdrawApplication(UserService userService, BoardService boardService, CommentService commentService, LikesService likesService,
                               FavorService favorService, TradeService tradeService, SearchService searchService) {
        this.userService = userService;
        this.boardService = boardService;
        this.commentService = commentService;
        this.likesService = likesService;
        this.favorService = favorService;
        this.tradeService = tradeService;
        this.searchService = searchService;
    }

    public ResponseDto<String> widthDraw(String userEmail){
        try{
            boardService.deleteByWithdraw(userEmail);
            commentService.deleteByWithdraw(userEmail);
            likesService.deleteByWithdraw(userEmail);
            favorService.deleteByWithdraw(userEmail);
            tradeService.deleteByWithdraw(userEmail);
            searchService.deleteByWithdraw(userEmail);
            userService.withDraw(userEmail);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("DataBase Error");
        }

        return ResponseDto.setSuccess("Success", "Delete Completed");
    }




}
