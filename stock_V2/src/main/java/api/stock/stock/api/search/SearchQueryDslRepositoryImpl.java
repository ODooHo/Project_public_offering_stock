package api.stock.stock.api.search;

import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import java.util.List;

public class SearchQueryDslRepositoryImpl implements SearchQueryDslRepository{
    @PersistenceContext
    EntityManager em;

    private JPAQueryFactory queryFactory;
    private final QSearchEntity qSearchEntity = QSearchEntity.searchEntity;

    public SearchQueryDslRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<SearchEntity> findRecent(String userEmail, String category) {
        return queryFactory
                .selectFrom(qSearchEntity)
                .where(qSearchEntity.userEmail.eq(userEmail))
                .where(qSearchEntity.category.eq(category))
                .orderBy(qSearchEntity.searchId.desc())
                .limit(5)
                .fetch();
    }

}
