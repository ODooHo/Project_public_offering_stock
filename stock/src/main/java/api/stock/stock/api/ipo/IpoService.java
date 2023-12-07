package api.stock.stock.api.ipo;

import api.stock.stock.global.response.ResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class IpoService {
    private final IpoRepository ipoRepository;


    @Autowired
    public IpoService(IpoRepository ipoRepository) {
        this.ipoRepository = ipoRepository;
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


}
