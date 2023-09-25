package api.stock.stock.api.community.comment;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<CommentEntity, Integer> {
    List<CommentEntity> findByBoardId(Integer boardId);

    void deleteByCommentId(Integer commentId);
}