const express = require('express');
const router = express.Router();
const User = require('../db/models/User');

const saltRounds = 10;

router.get('/', async (req, res) => {
	try {
		const users = await User.find({});
		if (users.length < 1) {
			res.json({ err: 'No Users in Database' });
		} else {
			res.json(users);
		}
	} catch (err) {
		console.log(err);
	}
});

router.get('/:email', async (req, res) => {
	const email = req.params.email;
	await User.findOne({ email })
		.then((user) => {
			res.json(user);
		})
		.catch((err) => {
			console.log(err);
			res.json({ err: 'could not find user by email' });
		});
});

// router.post('/register', async(req, res) => {
//   const password = req.body.password
//   try {
//     const email = await User.find({email: req.body.email})
//     if (email.length < 1) {
//       bcrypt.hash(password, saltRounds, async(err, hash) => {

//         const user = {
//           firstName: req.body.firstName.toUpperCase().trim(),
//           lastName: req.body.lastName.toUpperCase().trim(),
//           email: req
//             .body
//             .email
//             .toLowerCase().trim(),
//           password: hash.trim()
//         }

//         const newUser =  await User.create(user)
//         await newUser.save()
//         res.json({newUser})
//       })
//     } else {
//       console.log({err: 'This e-mail addresss is already in use'})
//       res.json({err:'This e-mail addresss is already in use'})
//     }
//   } catch (err) {
//     console.log(err)
//   }
// })

router.patch('/:email', async (req, res) => {
	const email = req.params.email;
	const newInfo = req.body;
	try {
		const user = await User.findOneAndUpdate(email, newInfo);
		res.json(user);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

router.delete('/:email', async (req, res) => {
	const email = req.params;

	await User.findOneAndRemove(email).then(() => {
		res.json({ message: 'user deleted via email' });
	});
});

// router.post('/login', async (req, res) => {
// 	const { password, email } = req.body;
// 	try {
// 		const user = await User.find({ email });

// 		const email_confirmation = user.map(function(detail) {
// 			return detail.emailConfirmed;
// 		});

// 		if (!user.length) {
// 			res.json({ emailError: 'Email not in database' });
// 		} else if (bcrypt.compareSync(password, user[0].password)) {
// 			// else if (email_confirmation[0] === false){
// 			//   res.json({emailNotConfirmed:'email confirmation needed'})
// 			// }
// 			// else if (email_confirmation[0] === true){
// 			//   res.json({emailConfirmed:'email conformed'})
// 			// }
// 			res.json({ email: true, passwordFound: true });
// 		} else {
// 			res.json({ passwordError: 'The password is incorrect. Please try again.' });
// 		}
// 	} catch (err) {
// 		console.log(err);
// 		res.json({ randomError: 'Error Loggin in ' });
// 	}
// });

module.exports = router;
