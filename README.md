# 공모주를 쉽게!

**프로젝트 개요:**


## 진행 과정:

### 2023-08-23
- 요구사항 정리 및 프로젝트 개요 설정
- api명세 / DTO 정리

### 2023-08-28
- Scrapy 활용한 크롤링/MongoDB에 저장하는 로직 개발

### 2023-08-29
- 로그인 과정 구현 (Back)
  JWT/RefreshToken을 이용한 보안 / *추후 카카오|구글 로그인 서비스 추가 계획
- dto <-> entity간 전환(ModelMapper)로직 개발 (Back)
- 테스트 DB 구축 및 테스트 완료 (Back)

### 2023-08-30
- ~~크롤링 방식 변경 고려 *공모주 정보 제공 사이트의 xpath 좌표 상이로 취소~~
- 초보자를 위한 서비스로 타깃 변경

### 2023-09-04
- 회원가입/로그인 컨트롤러 구현 (Back)

### 2023-09-06
- 조회수 증가 로직 구현 (Back)
- 게시글 불러오기 로직 구현 (Back)

### 2023-09-10
- 크롤링 방식 변경 ~~*기존엔 한 페이지 전체 -> 하나씩(안정성을 위함)~~
- 크롤링 데이터 -> mongoDB 적재 구현
- 공모주 관련 로직 구현 (Back)

### 2023-09-12
- 크롤링 최적화
- mongoDB <-> Spring 연동 완료 (Back)
- 커뮤니티 게시글 기능 구현 (Back)*게시글 사진의 경우 추후에 협의 후 타입 및 방식 수정 예정

### 2023-09-13
- 마이페이지 로직 구현 (Back)
- 회원정보 수정 로직 구현 (Back)

### 2023-09-18
- 매매일지 구성 (Back)
- DB 구축

### 2023-09-20
- 매매일지 로직 구현중 (Back)
- 크롤링 ec2에서 주기적으로 실행하기 구현

### 2023-09-22
- 매매일지 로직 구현 완료 (Back)

### 2023-09-25
- 댓글 로직 추가 (Back)
- 게시글, 댓글 수정 로직 추가 (Back)

### 2023-09-27
- 크롤링 업데이트 기능 추가
- 여러 요소 크롤링 구현중

### 2023-10-02
- 좋아요 로직 추가 (Back)
- 임시 서버 배포 및 환경 구축
- ec2, rds, s3

### 2023-10-03
- 관심종목 로직 추가 (Back)
- 검색 로직 구현중 (Back)

### 2023-10-05
- 검색 로직 구현 완료(Back)

### 2023-10-10
- 크롤링 업데이트, 가져오기 자동화 완료
- 2차 임시 서버 배포

### 2023-10-13
- 로그아웃 로직 구현 *redis (Back)

### 2023-10-16
- 좋아요 개수 가져오기 구현 *사용자 경험을 위함 (Back)

### 2023-10-23
- 삭제 로직 개편 (Back)

### 2023-11-06
- 수정 로직 개편 (Back)
- 좋아요 고유값으로 수정 (Back)

### 2023-11-13
- QueryDsl 도입
