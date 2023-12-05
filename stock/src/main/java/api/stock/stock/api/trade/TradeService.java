package api.stock.stock.api.trade;

import api.stock.stock.global.response.ResponseDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TradeService {
    private final TradeRepository tradeRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public TradeService(TradeRepository tradeRepository, ModelMapper modelMapper) {
        this.tradeRepository = tradeRepository;
        this.modelMapper = modelMapper;
    }

    public ResponseDto<TradeEntity> createTrade(TradeDto dto){
        String tradeName = dto.getTradeName();
        try{
            if (tradeRepository.existsByTradeName(tradeName)){
                return ResponseDto.setFailed("Trade already Exist!");
            }
        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("DataBase Error");
        }

        TradeEntity trade = modelMapper.map(dto,TradeEntity.class);
        
        try{
            tradeRepository.save(trade);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("DataBase Error");
        }
        return ResponseDto.setSuccess("Success",trade);
    }

    public ResponseDto<String> deleteTrade(String userEmail, Integer tradeId){
        TradeEntity trade = tradeRepository.findById(tradeId).orElse(null);
        String tradeUserEmail = trade.getUserEmail();

        if(!userEmail.equals(tradeUserEmail)){
            return ResponseDto.setFailed("Wrong Request(userEmail doesn't Match)");
        }

        try{
            tradeRepository.deleteById(tradeId);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("DataBase Error");
        }
        return ResponseDto.setSuccess("Success","Delete Completed");
    }

    public ResponseDto<List<TradeEntity>> getTradeList(String userEmail){
        List<TradeEntity> tradeList = new ArrayList<>();

        try{
            tradeList = tradeRepository.findByUserEmail(userEmail);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("DataBase Error");
        }

        return ResponseDto.setSuccess("Success",tradeList);
    }


    public ResponseDto<String> deleteByWithdraw(String userEmail){
        try{
            tradeRepository.deleteAllByUserEmail(userEmail);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("DataBase Error");
        }
        return ResponseDto.setSuccess("Success","Delete Completed");
    }



}
