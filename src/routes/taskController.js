import { Router } from 'express';

import { taskModel } from '../model/task';
import parameterMiddleware from '../middlewares/parameterMiddleware';
import authenticationMiddleware from '../middlewares/authenticationMiddleware';

const router = Router();

router.get('/', authenticationMiddleware, async (req, res, next) => {
    try {
        let { user } = res.locals;


        let tasks = await taskModel.find(
            { userId: user._id },
            '_id title text tags dueDate'
        );
        if (tasks === null) {
            throw { status: 404, message: 'no tasks found' };
        }

        return res.json(tasks);
    } catch (ex) {
        next(ex);
    }
});

router.post('/', authenticationMiddleware, async (req, res, next) => {
    try {
        let { user } = res.locals;

        let newTask = new taskModel({
            userId: user._id
        });

        await newTask.save();

        return res
            .status(201)
            .json({ task: { _id: newTask._id, tags: newTask.tags } });
    } catch (ex) {
        next(ex);
    }
});

router.put(
    '/:id',
    authenticationMiddleware,
    parameterMiddleware(['task']),
    async (req, res, next) => {
        try {
            let { id } = req.params;
            let { task } = req.body;
            let { user } = res.locals;

            await taskModel.updateOne({ _id: id, userId: user._id }, task);

            return res.status(200).send('Task updated');
        } catch (ex) {
            next(ex);
        }
    }
);

router.delete('/:id', authenticationMiddleware, async (req, res, next) => {
    try {
        let { id } = req.params;
        let { user } = res.locals;

        await taskModel.deleteOne({ _id: id, userId: user._id });

        return res.status(200).send('Task deleted');
    } catch (ex) {
        next(ex);
    }
});

export default router;
