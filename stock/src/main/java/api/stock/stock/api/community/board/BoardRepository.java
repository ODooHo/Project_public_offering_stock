package api.stock.stock.api.community.board;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface BoardRepository extends JpaRepository<BoardEntity, Integer>,BoardQueryDslRepository {
    List<BoardEntity> findByBoardTitleContains(String boardTitle);
    List<BoardEntity> findByBoardWriterEmail(String userEmail);
}
