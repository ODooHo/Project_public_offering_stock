package api.stock.stock.api.ipo;

import api.stock.stock.api.ipo.favor.FavorDto;
import api.stock.stock.api.ipo.favor.FavorEntity;
import api.stock.stock.api.ipo.favor.FavorService;
import api.stock.stock.global.response.ResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stock")
public class IpoController {
    private final IpoService ipoService;
    private final FavorService favorService;

    @Autowired
    public IpoController(IpoService ipoService, FavorService favorService) {
        this.ipoService = ipoService;
        this.favorService = favorService;
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

    @GetMapping("/getFavor")
    ResponseDto<List<IpoEntity>> getFavorList(@AuthenticationPrincipal String userEmail){
        ResponseDto<List<IpoEntity>> result = favorService.getFavorList(userEmail);
        return result;
    }



    @PostMapping("/addFavor")
    ResponseDto<FavorEntity> addFavor(@RequestBody FavorDto requestBody){
        ResponseDto<FavorEntity> result = favorService.addFavor(requestBody);
        return result;
    }

    @DeleteMapping("/{ipoName}/deleteFavor")
    ResponseDto<String> deleteFavor(@AuthenticationPrincipal String userEmail, @PathVariable String ipoName){
        ResponseDto<String> result = favorService.deleteFavor(userEmail,ipoName);
        return result;
    }



}
