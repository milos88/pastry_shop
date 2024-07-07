import express from 'express'
import { Users } from '../models/Users'

const router = express.Router();

  router.post("/register/", async (req: any, res: any) => {
    try {
      const newUser = {
        name: req.body.name,
        surname: req.body.surname,
        adress: req.body.adress,
        telephone: req.body.telephone,
        username: req.body.username,
        password: req.body.password,
        type: req.body.type
      };
      const user = await Users.create(newUser);
      return res.status(201).send(user);
    } catch (error: any) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });

  router.post('/login', async (req: any, res: any) => {
    const { username, password } =  req.body

    const user = await Users.findOne({ username })
    if (user) {
      if (user.password === password) {
        res.json({ message: 'Login successful', type: user.type, name: user.name, surname: user.surname, telephone: user.telephone, address: user.adress,  username: user.username})
      } else {
        res.json({ message: 'Pogresna lozinka' })
      } 
    }else {
      res.json({ message: 'Uneto korisnicko ime ne postoji u sistemu' })
    }
  })

  router.put('/update', async (req, res) =>{
    try{
      const result = await Users.findOneAndUpdate({username: req.body.username}, req.body);
      if (!result) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).send({ message: 'Podaci uspesno promenjeni' });
    } catch (error: any) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  })

  export default router