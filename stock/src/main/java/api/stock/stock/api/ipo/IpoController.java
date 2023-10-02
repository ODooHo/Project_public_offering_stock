package api.stock.stock.api.ipo;

import api.stock.stock.global.response.ResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stock")
public class IpoController {
    private final IpoService ipoService;

    @Autowired
    public IpoController(IpoService ipoService) {
        this.ipoService = ipoService;
    }


    @GetMapping("/list")
    ResponseDto<List<IpoEntity>>getIpoList(){
        ResponseDto<List<IpoEntity>> result = ipoService.getIpoList();
        return result;
    }

    @GetMapping("/{ipoName}")
    ResponseDto<IpoEntity> getIpo(@PathVariable String ipoName){
        ResponseDto<IpoEntity> result = ipoService.getIpo(ipoName);
        return result;
    }

    @PostMapping("/{ipoName}/addFavor")
    ResponseDto<FavorEntity> addFavor(@PathVariable String ipoName, @RequestBody FavorDto requestBody){
        ResponseDto<FavorEntity> result = ipoService.addFavor(requestBody);
        return result;
    }

    @GetMapping("/{ipoName}/deleteFavor/{favorId}")
    ResponseDto<?> deleteFavor(@PathVariable Integer favorId){
        ResponseDto<?> result = ipoService.deleteFavor(favorId);
        return result;
    }




}
