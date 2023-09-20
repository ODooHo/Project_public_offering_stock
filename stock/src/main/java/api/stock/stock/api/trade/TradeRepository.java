package api.stock.stock.api.trade;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Repository
@Transactional
public interface TradeRepository extends JpaRepository<TradeEntity, String> {
    List<TradeEntity> findByUserNickname(String userNickname);
    boolean existsByTradeName(String tradeName);


}
