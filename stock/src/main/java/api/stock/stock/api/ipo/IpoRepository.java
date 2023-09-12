package api.stock.stock.api.ipo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IpoRepository extends MongoRepository<IpoEntity,String> {
    IpoEntity findByIpoName(String ipoName);
    List<IpoEntity> findByOrderByDateDesc();

}
