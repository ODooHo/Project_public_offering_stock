package api.stock.stock.api.community.comment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Repository
@Transactional
public interface CommentRepository extends JpaRepository<CommentEntity, Integer> {
    List<CommentEntity> findByBoardId(Integer boardId);

    void deleteAllByBoardId(Integer boardId);

    void deleteAllByCommentWriterEmail(String userEmail);
}