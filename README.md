# GitHub PR Review Test Repository

이 리포지토리는 n8n 워크플로우를 테스트하기 위한 더미 프로젝트입니다.

## 프로젝트 구조

```
github-pr-review-test/
├── src/
│   ├── app.js                 # 메인 애플리케이션 파일
│   ├── routes/
│   │   ├── users.js          # 사용자 라우트
│   │   └── posts.js          # 게시글 라우트
│   └── controllers/
│       ├── userController.js  # 사용자 컨트롤러
│       └── postController.js  # 게시글 컨트롤러
├── public/
│   ├── index.html            # 메인 HTML 파일
│   ├── style.css             # 스타일시트
│   └── script.js             # 프론트엔드 JavaScript
├── tests/
│   └── users.test.js         # 사용자 API 테스트
├── config/
│   └── development.json      # 개발 환경 설정
├── package.json              # Node.js 의존성 및 스크립트
├── .gitignore               # Git 무시 파일 설정
└── README.md                # 프로젝트 문서
```

## 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 서버 실행
```bash
# 프로덕션 모드
npm start

# 개발 모드 (nodemon 사용)
npm run dev
```

### 3. 테스트 실행
```bash
npm test
```

서버가 실행되면 http://localhost:3000에서 애플리케이션에 접근할 수 있습니다.

## API 엔드포인트

### 사용자 관리
- `GET /api/users` - 모든 사용자 조회
- `POST /api/users` - 새 사용자 생성
- `GET /api/users/:id` - 특정 사용자 조회
- `PUT /api/users/:id` - 사용자 정보 업데이트
- `DELETE /api/users/:id` - 사용자 삭제

### 게시글 관리
- `GET /api/posts` - 모든 게시글 조회
- `POST /api/posts` - 새 게시글 생성
- `GET /api/posts/:id` - 특정 게시글 조회
- `PUT /api/posts/:id` - 게시글 업데이트
- `DELETE /api/posts/:id` - 게시글 삭제

## 기능

- **사용자 관리**: 사용자 CRUD 작업
- **게시글 관리**: 게시글 CRUD 작업
- **웹 인터페이스**: 브라우저에서 직접 사용 가능한 UI
- **API 테스트**: Jest를 사용한 자동화된 테스트

## PR 테스트 방법

n8n 워크플로우 테스트를 위해 다음과 같은 변경사항을 만들어 PR을 생성할 수 있습니다:

### 예시 변경사항들:

1. **이메일 검증 추가**
   ```javascript
   // src/controllers/userController.js에 이메일 형식 검증 추가
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!emailRegex.test(email)) {
       return res.status(400).json({ error: 'Invalid email format' });
   }
   ```

2. **페이지네이션 구현**
   ```javascript
   // API에 페이지네이션 로직 추가
   const page = parseInt(req.query.page) || 1;
   const limit = parseInt(req.query.limit) || 10;
   ```

3. **에러 핸들링 개선**
   ```javascript
   // 더 구체적인 에러 메시지와 상태 코드 추가
   ```

4. **새로운 기능 추가**
   - 사용자 검색 기능
   - 게시글 카테고리 분류
   - 좋아요/싫어요 기능

### PR 생성 단계:

1. **새 브랜치 생성**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **코드 수정**
   - 위의 예시들을 참고하여 코드 수정

3. **커밋 및 푸시**
   ```bash
   git add .
   git commit -m "feat: Add your feature description"
   git push origin feature/your-feature-name
   ```

4. **GitHub에서 PR 생성**
   - GitHub 웹 인터페이스에서 Pull Request 생성
   - 적절한 제목과 설명 작성

이제 n8n 워크플로우가 자동으로 PR을 감지하고 코드 리뷰를 수행할 것입니다!

## 기술 스택

- **Backend**: Node.js, Express.js
- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Testing**: Jest, Supertest
- **Development**: Nodemon
- **Version Control**: Git

## 라이센스

MIT License
