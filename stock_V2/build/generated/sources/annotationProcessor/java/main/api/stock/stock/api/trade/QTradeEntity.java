package api.stock.stock.api.trade;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QTradeEntity is a Querydsl query type for TradeEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTradeEntity extends EntityPathBase<TradeEntity> {

    private static final long serialVersionUID = 1797559141L;

    public static final QTradeEntity tradeEntity = new QTradeEntity("tradeEntity");

    public final NumberPath<Integer> buyPrice = createNumber("buyPrice", Integer.class);

    public final StringPath memo = createString("memo");

    public final NumberPath<Integer> sellPrice = createNumber("sellPrice", Integer.class);

    public final DatePath<java.time.LocalDate> tradeDate = createDate("tradeDate", java.time.LocalDate.class);

    public final NumberPath<Integer> tradeFee = createNumber("tradeFee", Integer.class);

    public final NumberPath<Integer> tradeId = createNumber("tradeId", Integer.class);

    public final StringPath tradeName = createString("tradeName");

    public final NumberPath<Integer> tradeQuantity = createNumber("tradeQuantity", Integer.class);

    public final StringPath userEmail = createString("userEmail");

    public QTradeEntity(String variable) {
        super(TradeEntity.class, forVariable(variable));
    }

    public QTradeEntity(Path<? extends TradeEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QTradeEntity(PathMetadata metadata) {
        super(TradeEntity.class, metadata);
    }

}

