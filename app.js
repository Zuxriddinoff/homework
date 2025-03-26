import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/static', express.static(join(__dirname, 'public')));

const admin = [];

app.use((req, res, next) => {
    const start = Date.now();
    next();
    const end = Date.now();
    console.log(`Request took ${end - start} ms`);
});


app.get('/', (req, res, next) => {
    try {
        const homePagePath = path.join(__dirname, 'public', 'index.html');
        res.sendFile(homePagePath);
    } catch (error) {
        next(error);
    }
});

app.get('/admin', (req, res, next) => {
    try {
        const user = req.cookies.user;
        if (!user) {
            throw new Error('User not found!');
        }
        console.log({ user });
        const profilePagePath = path.join(__dirname, 'public', 'admin.html');
        res.sendFile(profilePagePath);
    } catch (error) {
        next(error);
    }
});


app.put('/edit', (req, res, next) => {
    try {
        const editPagePath = join(__dirname, 'views', 'edit.html');
        res.sendFile(editPagePath);
    } catch (error) {
        next(error);
    }
});

app.post('/add', (req, res, next) => {
    try {
        const body = req.body;
        admin.push(body);
        res.redirect('/');
    } catch (error) {
        next(error);
    }
});

app.delete('/delete', (req, res, next) => {
    try {
        const body = req.body;
        const index = admin.findIndex((item) => item.id === body.id);
        admin.splice(index, 1);
        res.redirect('/');
    } catch (error) {
        next(error);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
