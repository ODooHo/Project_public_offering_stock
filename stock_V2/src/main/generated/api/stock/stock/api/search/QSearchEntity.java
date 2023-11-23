package api.stock.stock.api.search;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QSearchEntity is a Querydsl query type for SearchEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSearchEntity extends EntityPathBase<SearchEntity> {

    private static final long serialVersionUID = -2130187527L;

    public static final QSearchEntity searchEntity = new QSearchEntity("searchEntity");

    public final StringPath category = createString("category");

    public final StringPath searchContent = createString("searchContent");

    public final NumberPath<Integer> searchId = createNumber("searchId", Integer.class);

    public final StringPath userEmail = createString("userEmail");

    public QSearchEntity(String variable) {
        super(SearchEntity.class, forVariable(variable));
    }

    public QSearchEntity(Path<? extends SearchEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QSearchEntity(PathMetadata metadata) {
        super(SearchEntity.class, metadata);
    }

}

