package api.stock.stock.api.community.board;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QBoardEntity is a Querydsl query type for BoardEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBoardEntity extends EntityPathBase<BoardEntity> {

    private static final long serialVersionUID = -2068018908L;

    public static final QBoardEntity boardEntity = new QBoardEntity("boardEntity");

    public final NumberPath<Integer> boardClickCount = createNumber("boardClickCount", Integer.class);

    public final NumberPath<Integer> boardCommentCount = createNumber("boardCommentCount", Integer.class);

    public final StringPath boardContent = createString("boardContent");

    public final NumberPath<Integer> boardId = createNumber("boardId", Integer.class);

    public final StringPath boardImage = createString("boardImage");

    public final NumberPath<Integer> boardLikeCount = createNumber("boardLikeCount", Integer.class);

    public final StringPath boardTitle = createString("boardTitle");

    public final DatePath<java.time.LocalDate> boardWriteDate = createDate("boardWriteDate", java.time.LocalDate.class);

    public final StringPath boardWriterEmail = createString("boardWriterEmail");

    public final StringPath boardWriterNickname = createString("boardWriterNickname");

    public final StringPath boardWriterProfile = createString("boardWriterProfile");

    public QBoardEntity(String variable) {
        super(BoardEntity.class, forVariable(variable));
    }

    public QBoardEntity(Path<? extends BoardEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QBoardEntity(PathMetadata metadata) {
        super(BoardEntity.class, metadata);
    }

}

