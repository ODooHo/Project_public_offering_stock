package api.stock.stock.api.ipo.favor;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QFavorEntity is a Querydsl query type for FavorEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFavorEntity extends EntityPathBase<FavorEntity> {

    private static final long serialVersionUID = 1559893587L;

    public static final QFavorEntity favorEntity = new QFavorEntity("favorEntity");

    public final NumberPath<Integer> favorId = createNumber("favorId", Integer.class);

    public final StringPath ipoName = createString("ipoName");

    public final StringPath userEmail = createString("userEmail");

    public QFavorEntity(String variable) {
        super(FavorEntity.class, forVariable(variable));
    }

    public QFavorEntity(Path<? extends FavorEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QFavorEntity(PathMetadata metadata) {
        super(FavorEntity.class, metadata);
    }

}

