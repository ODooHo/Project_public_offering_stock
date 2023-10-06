package api.stock.stock.api.ipo;

import api.stock.stock.api.community.board.BoardEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface IpoRepository extends MongoRepository<IpoEntity,Integer> {
    IpoEntity findByIpoName(String ipoName);
    List<IpoEntity> findByOrderByDateDesc();

    List<IpoEntity> findByIpoNameContains(String ipoName);

}
