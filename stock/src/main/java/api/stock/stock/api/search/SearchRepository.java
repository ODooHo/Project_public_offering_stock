package api.stock.stock.api.search;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


@Repository
@Transactional
public interface SearchRepository extends JpaRepository<SearchEntity,Integer>,SearchQueryDslRepository{
    boolean existsByUserEmailAndSearchContent(String userEmail, String searchContent);
    void deleteAllByUserEmail(String userEmail);
}
