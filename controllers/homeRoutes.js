const router = require('express').Router();
const { User, Blog, Comments} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all blog posts and render to homepage
    const data = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = data.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('dash', { 
      blogs, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get blogpost by id
router.get('/blog/:id', async (req, res) => {
  try {
    const data = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comments,
          include: User,
        },
      ],
    });

    const blog = data.get({ plain: true });

    res.render('blog', {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get and render the users posts to the dash.
router.get('/dash', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    res.render('dash', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dash');
    return;
  }

  res.render('login');
});

// If User need to signup, render signup
router.get('/signUp', (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/dash');
		return;
	}
	res.render('signUp');
});

module.exports = router;
