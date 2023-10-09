package api.stock.stock.api.search;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface SearchRepository extends JpaRepository<SearchEntity,Integer> {
    List<SearchEntity> findByUserEmail(String userEmail);



}
