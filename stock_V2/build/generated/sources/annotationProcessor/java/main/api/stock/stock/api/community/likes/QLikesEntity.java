package api.stock.stock.api.community.likes;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QLikesEntity is a Querydsl query type for LikesEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QLikesEntity extends EntityPathBase<LikesEntity> {

    private static final long serialVersionUID = 450963792L;

    public static final QLikesEntity likesEntity = new QLikesEntity("likesEntity");

    public final NumberPath<Integer> boardId = createNumber("boardId", Integer.class);

    public final NumberPath<Integer> likeId = createNumber("likeId", Integer.class);

    public final StringPath userEmail = createString("userEmail");

    public QLikesEntity(String variable) {
        super(LikesEntity.class, forVariable(variable));
    }

    public QLikesEntity(Path<? extends LikesEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QLikesEntity(PathMetadata metadata) {
        super(LikesEntity.class, metadata);
    }

}

