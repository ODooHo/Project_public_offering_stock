package api.stock.stock.api.ipo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IpoRepository extends MongoRepository<IpoEntity,String> {
    IpoEntity findByIpoName(String ipoName);
}
