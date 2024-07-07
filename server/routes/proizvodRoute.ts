import express from 'express'
import { Request, Response, NextFunction } from 'express';
import { Proizvod } from '../models/Proizvod';
import { Korpa } from '../models/Korpa';
import { Narudzbina } from '../models/Narudzbina';
import { Obavestenje } from '../models/Obavestenje';
const multer  = require('multer')
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

router.post("/upload", upload.single("slika"), async (req: Request, res: Response) => {
    // req.file can be used to access all file properties
    try {
      //check if the request has an image or not
      if (!(req as any).file) {
        res.json({
          success: false,
          message: "You must provide at least 1 file"
        });
      } else {
        let newProizvod = {
          slika: {
            data: (req as any).file.buffer,
            contentType: (req as any).file.mimetype
          },
          naziv: req.body.naziv,
          cena: req.body.cena,
          opis: req.body.opis,
          sastav: req.body.sastav,
          tip: req.body.tip,
          komentar: []
        };
        const proizvod = await Proizvod.create(newProizvod)
        return res.status(201).json({message: "Uspesno ste dodali novi proizvod"});
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });

  router.get("/torte", async (req, res) => {
    try{
        const torte = await Proizvod.find({tip: 'Torta'})
        if (torte) {
            return res.json(torte)
        }
    } catch(e: any){
        console.log(e.message)
        res.status(500).send({"message": e.message})
    }

  })

  router.get("/kolaci", async (req, res) => {
    const kolaci = await Proizvod.find({tip: 'Kolac'})
    if (kolaci) {
        res.json(kolaci)
    }
  })

  router.get("/torte/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const torta = await Proizvod.findById(id);

        return res.status(200).json(torta);
    } catch(e: any) {
        console.log(e);
        res.status(500).send({message: e.message })
    }
  })

  router.get("/kolaci/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const kolac = await Proizvod.findById(id);

        return res.status(200).json(kolac);
    } catch(e: any) {
        console.log(e);
        res.status(500).send({message: e.message })
    }
  })

  router.put("/addComment", async (req, res) => {
    try{

        const id = req.body.id;
        const comment = req.body.komentar;
        const username = req.body.username;

        let proizvod = await Proizvod.findById(id);

        if (proizvod) {
            proizvod.komentar.push({username: username, text: comment})
            await Proizvod.findByIdAndUpdate(id, proizvod)
            return res.status(200).json({message: "Uspesno"})
        }
        return res.status(200).json({message: "Neuspesno"})

    } catch(e:any) {
        console.log(e);
        res.status(500).send({message: e.message})
    }
  })

  router.post("/addKorpa", async (req, res) => {
    try {
        const username = req.body.username;
        const proizvod = req.body.naziv;
        const kolicina = req.body.kolicina;

        let korpaElem = await Korpa.findOne({username: username})

        if (korpaElem){
            korpaElem.proizvodi.push({naziv: proizvod, kolicina: kolicina})
            await Korpa.findByIdAndUpdate(korpaElem._id, korpaElem)
        } else {
            const newElem = {
                username: username,
                proizvodi: [{naziv: proizvod, kolicina: kolicina}]
            }
            const korpa = Korpa.create(newElem);
        }
        return res.status(200).json({message: "success"});
    } catch(e:any) {
        console.log(e);
        res.status(500).send({message: e.message})
    }
  })

  router.post("/getKorpa", async (req, res) => {
    try {
        const username = req.body.username;
        const korpaElem = await Korpa.findOne({username: username})
        if (korpaElem){
            return res.status(200).json(korpaElem.proizvodi);
        } else{
            return res.status(200).json([])
        }
    } catch(e:any) {
        console.log(e);
        res.status(500).send({message: e.message})
    }
  })

  router.post("/addPorudzbina", async (req, res) => {
    try {
        const username = req.body.username;

        let korpaElem = await Korpa.findOneAndDelete({username: username})
        const por = await Narudzbina.find().sort({broj_por: -1}).limit(1)
        let brojPor = 100
        if (por.length > 0 && por[0].broj_por){
            brojPor = parseInt(por[0].broj_por) + 1
        }
        if (korpaElem){
            const newNarudzbina = {
                username: korpaElem.username,
                broj_por: brojPor.toString(),
                proizvodi: korpaElem.proizvodi,
                status: "Aktivan"
            }
            await Narudzbina.create(newNarudzbina)
            return res.status(200).json({brojPor: brojPor});
        }
        return res.status(200).json({message: "Neuspesno"});
    } catch(e:any) {
        console.log(e);
        res.status(500).send({message: e.message})
    }
  })

  router.get("/getPorudzbine", async (req, res) => {
    try {
        const porudzbine = await Narudzbina.find({status: "Aktivan"});
        res.status(200).json(porudzbine);

    } catch(e:any) {
        console.log(e);
        res.status(500).send({message: e.message})
    }
  })

  router.put("/prihvati/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let porudzbina = await Narudzbina.findById(id);
        if (porudzbina){
            porudzbina.status = "Prihvaceno";
            await Narudzbina.findByIdAndUpdate(id, porudzbina);
            let obavestenje = await Obavestenje.findOne({username: porudzbina.username})
            const text = `Vasa porudzbina broj ${porudzbina.broj_por} je prihvacena`;
            if (obavestenje){
                obavestenje.obavestenja.push({text: text})
                await Obavestenje.findByIdAndUpdate(obavestenje._id, obavestenje)
            } else {
                const newObavestenje = {username: porudzbina.username, obavestenja: [{text: text}]}
                await Obavestenje.create(newObavestenje);
            }
        }
    } catch (e: any) {
        console.log(e);
        res.status(500).send({message: e.message})
    }
  })

  router.put("/odbij/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let porudzbina = await Narudzbina.findById(id);
        if (porudzbina){
            porudzbina.status = "Odbijeno";
            await Narudzbina.findByIdAndUpdate(id, porudzbina);
            let obavestenje = await Obavestenje.findOne({username: porudzbina.username})
            const text = `Vasa porudzbina broj ${porudzbina.broj_por} je odbijena`;
            if (obavestenje){
                obavestenje.obavestenja.push({text: text})
                await Obavestenje.findByIdAndUpdate(obavestenje._id, obavestenje)
            } else {
                const newObavestenje = {username: porudzbina.username, obavestenja: [{text: text}]}
                await Obavestenje.create(newObavestenje);
            }
        }
    } catch (e: any) {
        console.log(e);
        res.status(500).send({message: e.message})
    }
  })

  router.get("/getObavestenja/:username", async (req, res) => {
    try{
        const { username } = req.params;
        const obavestenje = await Obavestenje.findOne({username: username});
        if (obavestenje && obavestenje.obavestenja.length > 0){
            return res.status(200).json(obavestenje.obavestenja)
        } else{
            return res.status(200).json({"obavestenja": []})
        }
    } catch (e: any) {
        console.log(e);
        res.status(500).send({message: e.message})
    }
  })

  export default router;