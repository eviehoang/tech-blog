const router = require('express').Router();
const { Comments } = require('../../models');
const withAuth = require('../../utils/auth');

// Get comment data.
router.get('/', (req, res) => {
    Comments.findAll({})
        .then(cData => res.json(cData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
});

router.get('/:id', (req, res) => {
    Comment.findAll({
        where: {
            id: req.params.id
        }
    })
        .then(cData => res.json(cData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// Post comment 
router.post('/', async (req, res) => {
    try {
        const newComment = await Comments.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.json(newComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete Comments
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const commentData = await Comments.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
      if (!commentData) {
        res.status(404).json({ message: 'Eep! Blog ID does not exist!' });
        return;
      }
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  module.exports = router;