package api.stock.stock.api.ipo.favor;

import api.stock.stock.api.ipo.IpoEntity;
import api.stock.stock.api.ipo.IpoRepository;
import api.stock.stock.global.response.ResponseDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FavorService {

    private final FavorRepository favorRepository;
    private final IpoRepository ipoRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public FavorService(FavorRepository favorRepository, IpoRepository ipoRepository, ModelMapper modelMapper) {
        this.favorRepository = favorRepository;
        this.ipoRepository = ipoRepository;
        this.modelMapper = modelMapper;
    }


    public ResponseDto<List<IpoEntity>> getFavorList(String userEmail){
        List<IpoEntity> result = new ArrayList<>();
        List<String> ipo = favorRepository.findIpoNameByUserEmail(userEmail);
        try{
            result = ipoRepository.findAllByIpoNameIn(ipo);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("DataBase Error");
        }
        return ResponseDto.setSuccess("Success",result);
    }

    public ResponseDto<FavorEntity> addFavor(FavorDto dto){
        FavorEntity favor = modelMapper.map(dto,FavorEntity.class);
        try{
            String ipoName = favor.getIpoName();
            String userEmail = favor.getUserEmail();
            boolean isDuplicate = favorRepository.existsByIpoNameAndUserEmail(ipoName,userEmail);
            if (isDuplicate){
                return ResponseDto.setFailed("Already Favor");
            }
            favorRepository.save(favor);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("DataBase Error");
        }
        return ResponseDto.setSuccess("Success",favor);
    }


    public ResponseDto<String> deleteFavor(String userEmail, String ipoName){
        FavorEntity favor = favorRepository.findByIpoNameAndUserEmail(ipoName,userEmail);
        String favorUserEmail = favor.getUserEmail();

        if(!userEmail.equals(favorUserEmail)){
            return ResponseDto.setFailed("Wrong Request(userEmail doesn't Match)");
        }

        try{
            favorRepository.deleteByIpoName(ipoName);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("DataBase Error");
        }
        return ResponseDto.setSuccess("Success","Delete Completed");
    }


    public ResponseDto<String> deleteByWithdraw(String userEmail){
        try{
            favorRepository.deleteAllByUserEmail(userEmail);
        }catch (Exception e){
            return ResponseDto.setFailed("DataBase Error");
        }
        return ResponseDto.setSuccess("Success", "Delete Completed");
    }

}
