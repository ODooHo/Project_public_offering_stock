package api.stock.stock.api.community.board;

import java.util.List;

public interface BoardQueryDslRepository {
    List<BoardEntity> findList();
}
