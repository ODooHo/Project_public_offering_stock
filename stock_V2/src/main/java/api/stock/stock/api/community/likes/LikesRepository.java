package api.stock.stock.api.community.likes;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface LikesRepository extends JpaRepository<LikesEntity, Integer> {
    Integer countByBoardId(Integer boardId);
    void deleteByBoardIdAndUserEmail(Integer boardId, String userEmail);
    List<LikesEntity> findByBoardId(Integer boardId);

    void deleteAllByBoardId(Integer boardId);

    boolean existsByUserEmailAndBoardId(String userEmail, Integer BoardId);
}
