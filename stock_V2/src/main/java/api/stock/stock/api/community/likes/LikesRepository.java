package api.stock.stock.api.community.likes;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface LikesRepository extends JpaRepository<LikesEntity, Integer> {
    Integer countByBoardId(Integer boardId);
    void deleteByBoardIdAndUserEmail(Integer boardId, String userEmail);

    boolean existsByUserEmailAndBoardId(String userEmail, Integer BoardId);
}
