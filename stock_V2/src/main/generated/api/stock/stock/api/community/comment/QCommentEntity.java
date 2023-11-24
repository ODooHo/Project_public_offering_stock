package api.stock.stock.api.community.comment;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QCommentEntity is a Querydsl query type for CommentEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCommentEntity extends EntityPathBase<CommentEntity> {

    private static final long serialVersionUID = -1033584106L;

    public static final QCommentEntity commentEntity = new QCommentEntity("commentEntity");

    public final NumberPath<Integer> boardId = createNumber("boardId", Integer.class);

    public final StringPath commentContent = createString("commentContent");

    public final NumberPath<Integer> commentId = createNumber("commentId", Integer.class);

    public final DatePath<java.time.LocalDate> commentWriteDate = createDate("commentWriteDate", java.time.LocalDate.class);

    public final StringPath commentWriterEmail = createString("commentWriterEmail");

    public final StringPath commentWriterNickname = createString("commentWriterNickname");

    public QCommentEntity(String variable) {
        super(CommentEntity.class, forVariable(variable));
    }

    public QCommentEntity(Path<? extends CommentEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QCommentEntity(PathMetadata metadata) {
        super(CommentEntity.class, metadata);
    }

}

