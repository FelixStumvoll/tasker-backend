import { Router } from 'express';
import { taskModel } from '../model/task';
import parameterMiddleware from '../middlewares/parameterMiddleware';

const router = Router();

router.get('/', async (req, res, next) => {
    console.log('request started');
    try {
        let tasks = await taskModel.find({});

        if (tasks === null) {
            throw 'internal Error';
        }

        return res.json(tasks);
    } catch (ex) {
        next(ex);
    }
});

router.post('/', parameterMiddleware(['taskRoute']), async (req, res, next) => {
    try {
        let body = req.body;
        let newTask = new taskModel({
            route: body.taskRoute,
            title: '',
            text: undefined,
            tags: []
        });

        await newTask.save();
        return res.status(201).send('Task created');
    } catch (ex) {
        next(ex);
    }
});

router.put('/:id', parameterMiddleware(['task']), async (req, res, next) => {
    console.log('req.body', req.body);
    try {
        let { id } = req.params;
        let { task } = req.body;
        if (!id) throw 'Parameter missing';

        await taskModel.updateOne({ _id: id }, task);

        return res.status(200).send('Task updated');
    } catch (ex) {
        next(ex);
    }
});

export default router;
