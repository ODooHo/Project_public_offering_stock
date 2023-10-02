package api.stock.stock.api.ipo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavorRepository extends JpaRepository<FavorEntity, Integer> {
    FavorEntity findByFavorId(Integer FavorId);
    void deleteByFavorId(Integer FavorId);
}
