import { dbCon } from "../server.js"

export const players = {
    
    findOnePlayer: async (req,res,next)=>{
        
        try {
            const {id} = req.params

            const query = (`
                select * from players
                where player_id = $1`)

            const result = await dbCon.query(query,[id])

            if(result.rowCount === 0){
                return res.status(404).send(`${id} not found`)
            }

            res.json(result.rows[0])
        } catch (error) {
            next(error)
        }
    },

    findAllPlayers: async (req,res,next)=>{
        
        try {
            
            const query = (`select * from players order by player_id`)
            
            const result = await dbCon.query(query)
            if(result.rowCount === 0){
                return res.status(404).send(`Insufficient data to find all`)
            }

            res.json(result.rows)


        } catch (error) {
            next(error)
        }
    },

    createPlayers: async (req,res,next)=>{
         
        try {
            
            const {fullName,dateOfBirth,position,teamId,jerseyNumber} = req.body
             

            if(!fullName || !dateOfBirth || !position || !teamId || !jerseyNumber){
                return res.status(400).send(`All data is required to post`)
            }

            const query = `
                insert into players (full_name,date_of_birth,position,team_id,jersey_number)
                values ($1,$2,$3,$4,$5)
                returning *`;

            const result = await dbCon.query(query,
                   [fullName,
                    dateOfBirth,
                    position,
                    teamId,
                    jerseyNumber])
            
            res.status(201).json(result.rows)
            
        } catch (error) {
            next(error)
        }
    },

    updatePlayers: async (req,res,next)=>{
        
        try {
            const {id} = req.params
    
            if(!id) return res.status(404).send(`${id} not found`)
    
            const body = req.body
    
            if(!body.fullName && !body.dateOfBirth && !body.position && !body.teamId && !body.jerseyNumber){
                return res.status(400).send(`At least one data is required to update`)
            }
    
            const fields = Object.keys(body)
            .map((key,i)=> `${key.replace(/([A-Z])/g, "_$1").toLowerCase()} = $${i + 1}`)
            .join(", ")
            const values = [...Object.values(body),id]
    
            const query = (`
                update players 
                set ${fields} 
                where player_id = $${values.length}`)
    
            const result = await dbCon.query(query,values)
    
            if(result.rowCount === 0) return res.status(404).send(`Data not found in updating`)
            
            res.json(`Data has been updated`)
        } catch (error) {
            next(error)
        }
    },

    deletePlayers: async (req,res,next)=>{
         
        try {
            const {id} = req.params
            if(!id) return res.status(404).send(`${id} not found`)

            const query = (`
                delete from players where player_id = $1`)
            
            const result = await dbCon.query(query,[id])
            if(result.rowCount === 0) return res.status(400).send(`Data not found in deleting`)
            
            res.json(`Data has been deleted`)
        } catch (error) {
            next(error)
        }
    },
}