import { dbCon } from "../server.js"

export const tournament = {
    
    findOneTournament: async (req,res,next)=>{
        
        try {
            const {id} = req.params

            const query = (`
                select * from tournaments
                where tournament_id = $1`)

            const result = await dbCon.query(query,[id])

            if(result.rowCount === 0){
                return res.status(404).send(`${id} not found`)
            }

            res.json(result.rows[0])
        } catch (error) {
            next(error)
        }
    },


    findAllTournament: async (req,res,next)=>{
        
        try {
            
            const query = (`select * from tournaments order by tournament_id`)
            
            const result = await dbCon.query(query)
            if(result.rowCount === 0){
                return res.status(404).send(`Insufficient data to find all`)
            }

            res.json(result.rows)


        } catch (error) {
            next(error)
        }
    },
    

    createTournament: async (req,res,next)=>{
         
        try {
            
            const {tournamentName,startDate,endDate,status} = req.body
             

            if(!tournamentName || !startDate || !endDate || !status){
                return res.status(400).send(`All data is required to post`)
            }

            const query = `
                insert into tournaments (tournament_name,start_date,end_date,status)
                values ($1,$2,$3,$4)
                returning *`;

            const result = await dbCon.query(query,
                   [tournamentName,
                    startDate,
                    endDate,
                    status])
            
            res.status(201).json(result.rows)
            
        } catch (error) {
            next(error)
        }
    },

    
    updateTournament: async (req,res,next)=>{
        
        try {
            const {id} = req.params
    
            if(!id) return res.status(404).send(`${id} not found`)
    
            const body = req.body
    
            if(!body.tournamentName && !body.startDate && !body.endDate && !body.status){
                return res.status(400).send(`At least one data is required to update`)
            }
    
            const fields = Object.keys(body)
            .map((key,i)=> `${key.replace(/([A-Z])/g, "_$1").toLowerCase()} = $${i + 1}`)
            .join(", ")
            const values = [...Object.values(body),id]
    
            const query = (`
                update tournaments 
                set ${fields} 
                where tournament_id = $${values.length}`)
    
            const result = await dbCon.query(query,values)
    
            if(result.rowCount === 0) return res.status(404).send(`Data not found in updating`)
            
            res.json(`Data has been updated`)
        } catch (error) {
            next(error)
        }
    },
    

    deleteTournament: async (req,res,next)=>{
         
        try {
            const {id} = req.params
            if(!id) return res.status(404).send(`${id} not found`)

            const query = (`
                delete from tournaments where tournament_id = $1`)
            
            const result = await dbCon.query(query,[id])
            if(result.rowCount === 0) return res.status(400).send(`Data not found in deleting`)
            
            res.json(`Data has been deleted`)
        } catch (error) {
            next(error)
        }
    },

}