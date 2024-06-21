const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 4000;
const corsOptions = {
    origin: ['http://localhost:5173',
        'http://192.168.0.26:5173',
        'http://chatcode.gusrl6394.synology.me:5173',
        'https://chatcode.gusrl6394.synology.me:5173',
        'http://gusrl6394.github.io',
        'https://gusrl6394.github.io'
    ],
    credentials: true, // 자격 증명 포함 허용
};

// Set up multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// Middleware to parse JSON bodies
app.use(bodyParser.json({ limit: '50mb' }));

app.use(cors(corsOptions));
app.use(express.json());

const readJSONFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
};

// 라우트 설정
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// 배열에서 무작위로 값을 선택하는 함수
function getRandomValueFromArray(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

const imgFile = ["https://fastly.picsum.photos/id/1005/350/350.jpg?hmac=k3rF6rp2tExFcSPcc5OxRIyE74XZ9ry2Pm50BscfBPY",
    "https://fastly.picsum.photos/id/469/350/350.jpg?hmac=kGxHPc0W3DQK_8PVg1fAGZENNxBAFyteMf13lVDMjKg",
    "https://fastly.picsum.photos/id/239/350/350.jpg?hmac=fDJtLGE6XYwtrnAHHmkFV6ALJwkr7YPm54qvPyLmxN8",
    "https://fastly.picsum.photos/id/620/350/350.jpg?hmac=2hh81V5so1-Ahj0Gmj9CoSSpVa-X0_bEKhcopZ5_sVo",
    "https://fastly.picsum.photos/id/507/350/350.jpg?hmac=7OZGzlKj6w6fEK6mWcDDYlKuK6LAqaTir9OaJ1sn-a4"];


// Route to handle file upload
app.post('/files', upload.single('file'), (req, res) => {
    const base64File = req.body.base64File;
    const buffer = Buffer.from(base64File, 'base64');
    console.log(buffer);

    // 무작위로 값 선택
    const randomValue = getRandomValueFromArray(imgFile);
    const imageUrl = randomValue;
    res.json({ imageUrl });
});

// API endpoint to get data from JSON file
app.get('/article', async (req, res) => {
    console.log('/article');
    // 쿼리 매개변수 읽기
    const { search, categories, sortby, status, page, size } = req.query;

    // 필터 객체 생성
    const filters = {
        search: search || '',
        categories: categories || '',
        sortby: sortby || '',
        status: status || '',
        pageInfo: {
            page: parseInt(page, 10) || 1,
            size: parseInt(size, 10) || 10,
        },
    };
    // filters 객체를 로그로 출력
    console.log(filters);

    const filePath = path.join(__dirname, 'question.json'); // JSON 파일 경로를 지정
    try {
        const data = await readJSONFile(filePath);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read JSON file' });
    }
});

app.post('/articles', (req, res) => {
    const { category, title, tagList, contentText } = req.body;

    // 디버그용으로 콘솔에 로그 출력
    console.log('Category:', category);
    console.log('Title:', title);
    console.log('TagList:', tagList);
    console.log('ContentText:', contentText);

    // 여기서 데이터베이스에 저장하거나 추가 처리를 할 수 있습니다.

    // 응답 전송
    res.status(200).json({"status":200, "data" : [], "message" : "msg" });
});

app.get('/articles/:postId', (req, res) => {
    console.log('/article/:postId');
    const { postId } = req.params;
    resData = {
        title: '코딩 문제 중 이게 어떻게 어쩌고 저쩌고 하는지 잘 모르겠는데 봐주세요 어쩌고저쩌고',
        timeline: '2024-06-09T12:34:56Z',
        updated : true,
        viewCount: 1230000,
        status : 'wait',
        bookmark: true,
        tags: ['coding', 'react', 'spring', 'html', 'vscode', 'css', 'js', 'study'],
        content: '<p>내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용</p><img src="https://api.dicebear.com/8.x/lorelei/svg?seed=test1">',
        likeCount : 10,
        isLiked: null
    };
    res.status(200).json({"status":200, "data" : resData, "message" : "msg" });
});

app.put('/articles/:postId', (req, res) => {
    const { postId } = req.params;
    const { category, title, tagList, contentText } = req.body;

    // 디버그용으로 콘솔에 로그 출력
    console.log('PostId:', postId);
    console.log('Category:', category);
    console.log('Title:', title);
    console.log('TagList:', tagList);
    console.log('ContentText:', contentText);

    // 여기서 데이터베이스에 저장하거나 추가 처리를 할 수 있습니다.

    // 응답 전송
    res.status(200).json({"status":200, "data" : [], "message" : "msg" });
});

app.delete('/articles/:postId', (req, res) => {
    const { postId } = req.params;

    // 디버그용으로 콘솔에 로그 출력
    console.log('PostId:', postId);

    // 여기서 데이터베이스에 저장하거나 추가 처리를 할 수 있습니다.

    // 응답 전송
    res.status(200).json({"status":200, "data" : [], "message" : "msg" });
});

app.get('/avatars/:userId', (req, res) => {
    console.log('/article/:userId');
    const { userId } = req.params;
    resData = {
        userId : 1,
        userName : '가나다라마바사',
        avatar : 'https://placehold.co/60',
        tags : ['FrontEnd', 'BackEnd', 'FullStack', 'UI/UX Engineer', 'Beginner', 'BigData', 'DevOps'],
        comment : '프로필 설명란입니다 프로필 설명란입니다 프로필 설명란입니다 프로필 설명란입니다 프로필 설명란입니다'
    };
    res.status(200).json({"status":200, "data" : resData, "message" : "msg" });
});

app.post('/articles/:postId/like', (req, res) => {
    console.log('/article/:postId/like');
    const { postId } = req.params;
    const { userId, isLike } = req.body; // Expecting userId and isLike in the request body

    console.log(postId);
    console.log(userId);
    console.log(isLike);

    res.status(200).json({"status":200, "data" : "success", "message" : "msg" });
});

app.get('/articles/:postId/likesCount', (req, res) => {
    console.log('/article/:postId/likesCount');
    const { postId } = req.params;
    console.log(postId);
    const random = Math.floor(Math.random() * 100) + 1;
    res.status(200).json({"status":200, "data" : random, "message" : "msg" });
});

app.post('/articles/:postId/status', (req, res) => {
    console.log('/article/:postId/status');
    const { status } = req.body;
    console.log(status);
    res.status(200).json({"status":200, "data" : "success", "message" : "msg" });
});

app.post('/bookmark', async (req, res) => {
    console.log('/bookmark');
   const body = req.body;
   console.log(body);
   res.status(200).json({"status":200, "data" : "success", "message" : "msg" });
});

app.post('/blind', async (req, res) => {
    console.log('/blind');
    const body = req.body;
    console.log(body);
    res.status(200).json({"status":200, "data" : "success", "message" : "msg" });
});

app.post('/status', async (req, res) => {
    console.log('/status');
    const body = req.body;
    console.log(body);
    res.status(200).json({"status":200, "data" : "success", "message" : "msg" });
});

app.post('/posts/likes', async (req, res) => {
    console.log('/posts/likes');
    const body = req.body;
    console.log(body);
    res.status(200).json({"status":200, "data" : "success", "message" : "msg" });
});

app.get('/comments/:postId', async (req, res) => {
    console.log('/comments/:postId');
    const { postId } = req.params;
    console.log(postId);

    const filePath = path.join(__dirname, 'comments.json'); // JSON 파일 경로를 지정
    try {
        const data = await readJSONFile(filePath);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read JSON file' });
    }
});

app.get('/categories', async (req, res) => {
    console.log('/categories');

    const filePath = path.join(__dirname, 'categories.json'); // JSON 파일 경로를 지정
    try {
        const data = await readJSONFile(filePath);
        res.status(200).json({"status":200, "data" : data, "message" : "msg" });
    } catch (error) {
        res.status(500).json({ error: 'Failed to read JSON file' });
    }
});


// 서버 실행
app.listen(port, () => {
    console.log(`Server running`);
});