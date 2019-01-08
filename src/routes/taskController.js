import { Router } from 'express';

import { taskModel } from '../model/task';
import parameterMiddleware from '../middlewares/parameterMiddleware';

const router = Router();

router.get('/', async (req, res, next) => {
    console.log('request started');
    try {
        let tasks = await taskModel.find({});

        if (tasks === null) {
            throw { status: 404, message: 'no tasks found' };
        }

        return res.json(tasks);
    } catch (ex) {
        next(ex);
    }
});

router.post('/', async (req, res, next) => {
    try {
        let newTask = new taskModel({
            tags: []
        });

        await newTask.save();
        return res.status(201).json({ task: newTask });
    } catch (ex) {
        next(ex);
    }
});

router.put('/:id', parameterMiddleware(['task']), async (req, res, next) => {
    try {
        let { id } = req.params;
        let { task } = req.body;

        await taskModel.updateOne({ _id: id }, task);

        return res.status(200).send('Task updated');
    } catch (ex) {
        next(ex);
    }
});

export default router;
