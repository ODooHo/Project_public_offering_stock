package api.stock.stock.api.search;

import api.stock.stock.api.community.board.BoardEntity;
import api.stock.stock.api.community.board.BoardRepository;
import api.stock.stock.api.ipo.IpoEntity;
import api.stock.stock.api.ipo.IpoRepository;
import api.stock.stock.global.response.ResponseDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SearchService {
    private final ModelMapper modelMapper;
    private final SearchRepository searchRepository;
    private final BoardRepository boardRepository;
    private final IpoRepository ipoRepository;

    @Autowired
    public SearchService(ModelMapper modelMapper, SearchRepository searchRepository, BoardRepository boardRepository, IpoRepository ipoRepository) {
        this.modelMapper = modelMapper;
        this.searchRepository = searchRepository;
        this.boardRepository = boardRepository;
        this.ipoRepository = ipoRepository;
    }

    public ResponseDto<List<SearchEntity>>getRecentBoard(String userEmail){
        List<SearchEntity> search = new ArrayList<>();
        try{
            search = searchRepository.findRecent(userEmail,"board");
        }catch (Exception e){
            e.printStackTrace();
            ResponseDto.setFailed("DataBase Error");
        }

        return ResponseDto.setSuccess("Success",search);
    }

    public ResponseDto<List<SearchEntity>>getRecentIpo(String userEmail){
        List<SearchEntity> search = new ArrayList<>();
        try{
            search = searchRepository.findRecent(userEmail,"ipo");
        }catch (Exception e){
            e.printStackTrace();
            ResponseDto.setFailed("DataBase Error");
        }

        return ResponseDto.setSuccess("Success",search);
    }


    public ResponseDto<List<BoardEntity>> searchBoard(SearchDto dto){
        SearchEntity search = modelMapper.map(dto,SearchEntity.class);
        String userEmail = search.getUserEmail();
        String searchContent = search.getSearchContent();
        List<BoardEntity> board = null;
        try{
            search.setCategory("board");
            String searchWord = search.getSearchContent();
            board = boardRepository.findByBoardTitleContains(searchWord);
            if (!searchRepository.existsByUserEmailAndSearchContent(userEmail,searchContent)){
                searchRepository.save(search);
            }
        }catch (Exception e){
            e.printStackTrace();
            ResponseDto.setFailed("DataBase Error");
        }


        return ResponseDto.setSuccess("Success",board);
    }

    public ResponseDto<List<IpoEntity>> searchIpo(SearchDto dto){
        SearchEntity search = modelMapper.map(dto,SearchEntity.class);
        String userEmail = search.getUserEmail();
        String searchContent = search.getSearchContent();
        List<IpoEntity> ipo = null;
        try {
            search.setCategory("ipo");
            String searchWord = search.getSearchContent();
            ipo = ipoRepository.findByIpoNameContains(searchWord);
            if (!searchRepository.existsByUserEmailAndSearchContent(userEmail,searchContent)){
                searchRepository.save(search);
            }
        }catch (Exception e){
                e.printStackTrace();
                ResponseDto.setFailed("DataBase Error");
        }
        return ResponseDto.setSuccess("Success",ipo);

    }

    public ResponseDto<String> deleteSearchWord(Integer searchId){
        try{
            searchRepository.deleteById(searchId);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("DataBase Error");
        }

        return ResponseDto.setSuccess("Success","Delete Completed");
    }


    public ResponseDto<String> deleteByWithdraw(String userEmail){
        try{
            searchRepository.deleteAllByUserEmail(userEmail);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("DataBase Error");
        }
        return ResponseDto.setSuccess("Success","Delete Completed");
    }







}
