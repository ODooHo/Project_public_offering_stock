package api.stock.stock.api.ipo;

import api.stock.stock.global.response.ResponseDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class IpoService {
    private final IpoRepository ipoRepository;
    private final ModelMapper modelMapper;
    private final FavorRepository favorRepository;


    @Autowired
    public IpoService(IpoRepository ipoRepository, ModelMapper modelMapper, FavorRepository favorRepository) {
        this.ipoRepository = ipoRepository;
        this.modelMapper = modelMapper;
        this.favorRepository = favorRepository;
    }

    public ResponseDto<IpoEntity> getIpo(String ipoName){
        IpoEntity result = new IpoEntity();
        try{
            result = ipoRepository.findByIpoName(ipoName);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("DataBase Error");
        }
    return ResponseDto.setSuccess("Success", result);
    }


    public ResponseDto<List<IpoEntity>> getIpoList(){
        List<IpoEntity> result = new ArrayList<>();

        try{
            result = ipoRepository.findByOrderByDateDesc();
        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("DataBase Error");
        }
        return ResponseDto.setSuccess("Success",result);
    }

    public ResponseDto<List<IpoEntity>> getFavorList(String userEmail){
        List<IpoEntity> result = new ArrayList<>();
        List<String> ipo = favorRepository.findIpoNameByUserEmail(userEmail);
        System.out.println("ipo = " + ipo);
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
            favorRepository.save(favor);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("DataBase Error");
        }
        return ResponseDto.setSuccess("Success",favor);
    }


    public ResponseDto<String> deleteFavor(Integer favorId){
        try{
            favorRepository.deleteFavorEntityByFavorId(favorId);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("DataBase Error");
        }
        return ResponseDto.setSuccess("Success","Delete Completed");
    }

}
