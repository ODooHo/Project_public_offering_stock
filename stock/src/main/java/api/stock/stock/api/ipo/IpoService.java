package api.stock.stock.api.ipo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class IpoService {
    private final IpoRepository ipoRepository;


    @Autowired
    public IpoService(IpoRepository ipoRepository) {
        this.ipoRepository = ipoRepository;
    }

    public String getIpo(String ipoName){
        IpoEntity ipo = new IpoEntity();
        try{
            ipo = ipoRepository.findByIpoName(ipoName);
        }catch (Exception e){
            e.printStackTrace();

        }

    return ipo.getIpoName();
    }
}
