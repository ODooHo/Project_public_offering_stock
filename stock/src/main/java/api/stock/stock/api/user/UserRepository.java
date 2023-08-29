package api.stock.stock.api.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity , String>{
    boolean existsByUserNickname(String userNickname);
    UserEntity findByUserEmail(String userEmail);

}
