package api.stock.stock.api.file;

import api.stock.stock.api.community.board.BoardEntity;
import api.stock.stock.api.community.board.BoardRepository;
import api.stock.stock.api.user.UserEntity;
import api.stock.stock.api.user.UserRepository;
import api.stock.stock.global.response.ResponseDto;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.List;

@Service
public class FileService {
    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;
    @Value("${file.upload-dir}")
    private String uploadDir;

    @Autowired
    public FileService(UserRepository userRepository, BoardRepository boardRepository, AmazonS3 amazonS3) {
        this.userRepository = userRepository;
        this.boardRepository = boardRepository;
        this.amazonS3 = amazonS3;
    }

    public ResponseDto<String> uploadImage(MultipartFile boardImage, BoardEntity board) {
        try{
            if (boardImage != null){
                String fileName = setFileName(boardImage,board);
                String path = uploadDir + "img/" + fileName;
                uploadFileToS3(boardImage,path);
            }else{
                board.setBoardImage(null);
            }

            boardRepository.save(board);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed("DataBase Error!");
        }

        return ResponseDto.setSuccess("Success", "OK");
    }

    public ResponseDto<String> setProfile(MultipartFile file, String userEmail) {
        UserEntity user = userRepository.findByUserEmail(userEmail);

        List<BoardEntity> boardEntity = boardRepository.findByBoardWriterEmail(userEmail);

        String fileName = user.getUserEmail() + "." + "jpg";
        try {
            // S3 버킷에 파일 업로드
            uploadFileToS3(file, uploadDir + "img/"+fileName);

            user.setUserProfile(fileName);
            userRepository.save(user);

            for (BoardEntity board : boardEntity) {
                board.setBoardWriterProfile(fileName);
                boardRepository.save(board);
            }

            return ResponseDto.setSuccess("Success", fileName);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed("Database or S3 Error");
        }
    }


    private void uploadFileToS3(MultipartFile file, String s3Key) {
        try {
            InputStream inputStream = file.getInputStream();
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(file.getSize());
            amazonS3.putObject(new PutObjectRequest(bucketName, s3Key, inputStream, metadata));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private String setFileName(MultipartFile file, BoardEntity board) {
        String originalFileName = file.getOriginalFilename();
        String extension = originalFileName.substring(originalFileName.lastIndexOf(".") + 1);
        String fileName = board.getBoardId() + "." + extension;
        return fileName;
    }

}
