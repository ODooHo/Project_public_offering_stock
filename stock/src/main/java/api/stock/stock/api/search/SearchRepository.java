package api.stock.stock.api.search;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface SearchRepository extends JpaRepository<SearchEntity,Integer> {
    List<SearchEntity> findTop5ByUserEmailAndCategoryOrderBySearchIdDesc(String userEmail,String category);


    boolean existsByUserEmailAndSearchContent(String userEmail, String searchContent);
}