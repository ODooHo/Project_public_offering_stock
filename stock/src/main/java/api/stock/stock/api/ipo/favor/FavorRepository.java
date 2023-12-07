package api.stock.stock.api.ipo.favor;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface FavorRepository extends JpaRepository<FavorEntity, Integer> {
    @Query("SELECT f.ipoName FROM favor f WHERE f.userEmail = :user_email")
    List<String> findIpoNameByUserEmail(@Param("user_email") String userEmail);

    FavorEntity findByIpoNameAndUserEmail(String ipoName,String userEmail);


    void deleteByIpoName(String ipoName);

    boolean existsByIpoNameAndUserEmail(String ipoName, String userEmail);

    void deleteAllByUserEmail(String userEmail);


}
