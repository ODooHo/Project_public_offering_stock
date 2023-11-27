package api.stock.stock.api.community.board;

import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BoardQueryDslRepositoryImpl implements BoardQueryDslRepository{
    @PersistenceContext
    EntityManager em;

    private JPAQueryFactory queryFactory;
    private final QBoardEntity qBoardEntity = QBoardEntity.boardEntity;

    public BoardQueryDslRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    public List<BoardEntity> findList(){
        return queryFactory
                .selectFrom(qBoardEntity)
                .orderBy(qBoardEntity.boardWriteDate.desc())
                .orderBy(qBoardEntity.boardId.desc())
                .fetch();
    }
}
