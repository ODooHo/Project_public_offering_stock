package api.stock.stock.api.community.liky;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface LikyRepository extends JpaRepository<LikyEntity, Integer> {
    Integer countByBoardId(Integer boardId);
    void deleteByBoardIdAndUserEmail(Integer boardId, String userEmail);
}
