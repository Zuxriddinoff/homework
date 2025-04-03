import { dbCon } from "../server.js"

export const footballClubs = {

    findOneFootballClubs: async (req,res,next)=>{
        
        try {
            
            const {id} = req.params
            if(!id) return res.status(404).send(`${id} not found`)
            
            const query = (`
                select * from football_clubs
                where club_id = $1`)

            const result = await dbCon.query(query,[id])
            if(result.rowCount === 0 ) return res.status(404).send(`Data not found by id`)

            res.json(result.rows)

        } catch (error) {
            next(error)
        }
    },

    findAllFootballClubs:async(req,res,next)=>{
        
        try {
            const query = (`
                select * from football_clubs`)
    
            const result = await dbCon.query(query)
            if(result.rowCount === 0) return res.status(404).send(`Insufficient length to get all`)
    
            res.json(result.rows)
        } catch (error) {
            next(error)
        }
    },

    createFootballClubs:async(req,res,next)=>{
        
        try {
            
            const {clubName,city,country,foundedYear} = req.body
            
            if(!clubName || !city || !country || !foundedYear) return res.status(400).send(`All data required to post`)

            const query = (`
                insert into football_clubs (club_name,city,country,founded_year)
                values ($1,$2,$3,$4) returning *`)

            const result = await dbCon.query(query,[clubName,city,country,foundedYear])
            res.status(201).json(result.rows)
       
        } catch (error) {
            next(error)
        }
    },

    updateFootballClubs:async(req,res,next)=>{
        
        const {id} = req.params
        const body = req.body
        
        if(!id || (!body.clubName && !body.city && !body.country && !body.foundedYear)){
            return res.status(400).send(`ID not found or at least one data is required to put data`)
        }

        const fields = Object.keys(body)
            .map((key,i)=> `${key.replace(/([A-Z])/g, "_$1").toLowerCase()} = $${i + 1}`)
            .join(", ")
            const values = [...Object.values(body),id]

        const query = (`
            update football_clubs
            set ${fields}
            where club_id = $${values.length}`)

        const result = await dbCon.query(query,values)

        if(result.rowCount === 0) return res.status(400).send(`Data not found in updating`)

        res.json(`Data has been successfully updated`)

    },

    deleteFootballClubs:async(req,res,next)=>{
        
        const {id} = req.params

        if(!id) return res.status(404).send(`${id} not found`)
        
        const query = (`
            delete from football_clubs where club_id = $1`)

        const result = await dbCon.query(query,[id])

        if(result.rowCount === 0) return res.status(404).send(`Data not found in deleting`)

        res.json(`Data has been successfully deleted`)
    },
}