const router = require('express').Router();
const { Post, User, Vote, Comment } = require('../../models');
const sequelize = require('../../config/connection'); 
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 
        'draw_url', 
        'title', 
        'post_text',
        'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        order: [[ 'created_at', 'DESC' ]],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                  model: User,
                  attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        //function that converts filepath back to dataUrl
        // var plain_data = dbPostData.map(id => {
        //     return id.get({plain: true});
        // });
        // console.log(plain_data);
        // unformat_url(dbPostData.toJSON(), (data) => {
        //     let swap_data = { ...dbPostData };
        //     swap_data.draw_url = data;
        //     res.json(swap_data);
        // });
        // console.log(swap_data);
        res.json(dbPostData);

    })        
    .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
}); 

router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 
        'draw_url', 
        'title', 
        'post_text',
        'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                  model: User,
                  attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            if(!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            //function that converts filepath back to dataUrl
            // unformat_url(dbPostData);
            console.log(dbPostData);
            console.log("hi");
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        draw_url: req.body.draw_url,
        post_text: req.body.post_text,
        user_id: req.session.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//PUT /api/posts/upvote
router.put('/upvote', withAuth, (req, res) => {
    if(req.session) {
        //pass session id along with all destructured properties on req.body
        Post.upvote({ ...req.body, user_id: req.session.user_id }, { Vote, Comment, User })
        .then(updatedVoteData => res.json(updatedVoteData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err); 
        });
    }
});

router.put('/:id', withAuth, (req, res) => {
    Post.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostData => {
            if(!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;