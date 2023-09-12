package api.stock.stock.api.ipo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/stock")
public class IpoController {
    private final IpoService ipoService;

    @Autowired
    public IpoController(IpoService ipoService) {
        this.ipoService = ipoService;
    }

//    @GetMapping
//    public IpoEntity getIpo(){
//        String ipoName = "유투바이오";
//
//        IpoEntity result = ipoService.getIpo(ipoName);
//        return result;
//    }
}
