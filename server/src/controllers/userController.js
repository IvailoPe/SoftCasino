import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import userService from '../services/userServices.js';

const userController = Router();

userController.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await userService.register(username, password);
        res.json(user);
    } catch (err) {
        res.json({ message: err.message });
    }
});

userController.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await userService.login(username, password);

        res.json(result);
    } catch (err) {
        res.json({ message: err.message });
    }
});

userController.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await userService.getUserById(req.user.id);
        res.json(user);
    } catch (err) {
        res.json({ message: 'Error fetching profile' });
    }
});

userController.post('/add/money', authMiddleware, async (req, res) => {
    const { money } = req.body;
    try {
        const user = await userService.updateUserMoney(req.user.id,money);
        res.json({ message: "success" })
    } catch (err) {
        res.json({ message: 'Error fetching profile' });
    }
});

userController.put('/profile/update-password', authMiddleware, async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    try {
        await userService.updatePassword(req.user.id, oldPassword, newPassword);
        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        res.json({ error: err.message });
    }
});

userController.put('/profile/update-username', authMiddleware, async (req, res) => {
    const { password, newUsername } = req.body;

    try {
        await userService.updateUsername(req.user.id, password, newUsername);
        res.json({ message: 'Username updated successfully' });
    } catch (err) {
        res.json({ error: err.message });
    }
});

userController.put('/profile/update-username-picture', authMiddleware, async (req, res) => {
    const { password, newUrl } = req.body;
    try {
        await userService.updateProfilePicture(req.user.id, password, newUrl);
        res.json({ message: 'Url updated successfully' });
    } catch (err) {
        res.json({ error: err.message });
    }
});

userController.post('/delete/profile', authMiddleware, async (req, res) => {
    try {        
        let password = req.body.password
        let response = await userService.deleteProfile(req.user.id,password);
        res.json({ message: 'Username deleted' });
    } catch (err) {
        res.json({ error: err.message });
    }
});

export default userController