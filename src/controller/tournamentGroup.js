import { dbCon } from "../server.js"

export const tournamentGroup = {
    
    findOneTournamentGroup: async (req,res,next)=>{
        
        try {
            const {id} = req.params

            const query = (`
                select * from tournament_groups
                where group_id = $1`)

            const result = await dbCon.query(query,[id])

            if(result.rowCount === 0){
                return res.status(404).send(`${id} not found`)
            }

            res.json(result.rows[0])
        } catch (error) {
            next(error)
        }
    },

    findAllTournamentGroup: async (req,res,next)=>{
        
        try {
            
            const query = (`select * from tournament_groups
                 order by group_id`)
            
            const result = await dbCon.query(query)
            if(result.rowCount === 0){
                return res.status(404).send(`Insufficient data to find all`)
            }

            res.json(result.rows)


        } catch (error) {
            next(error)
        }
    },

    createTournamentGroup: async (req,res,next)=>{
         
        try {
            
            const {groupName,tournamentId} = req.body
             

            if(!groupName || !tournamentId){
                return res.status(400).send(`All data is required to post`)
            }

            const query = `
                insert into tournament_groups (group_name,tournament_id)
                values ($1,$2)
                returning *`;

            const result = await dbCon.query(query,
                   [groupName,
                    tournamentId])
            
            res.status(201).json(result.rows)
            
        } catch (error) {
            next(error)
        }
    },

    updateTournamentGroup: async (req,res,next)=>{
        
        try {
            const {id} = req.params
    
            if(!id) return res.status(404).send(`${id} not found`)
    
            const body = req.body
    
            if(!body.groupName && !body.tournamentId){
                return res.status(400).send(`At least one data is required to update`)
            }
    
            const fields = Object.keys(body)
            .map((key,i)=> `${key.replace(/([A-Z])/g, "_$1").toLowerCase()} = $${i + 1}`)
            .join(", ")
            const values = [...Object.values(body),id]
    
            const query = (`
                update tournament_groups
                set ${fields} 
                where tournament_id = $${values.length}`)
    
            const result = await dbCon.query(query,values)
    
            if(result.rowCount === 0) return res.status(404).send(`Data not found in updating`)
            
            res.json(`Data has been updated`)
        } catch (error) {
            next(error)
        }
    },

    deleteTournamentGroup: async (req,res,next)=>{
         
        try {
            const {id} = req.params
            if(!id) return res.status(404).send(`${id} not found`)

            const query = (`
                delete from tournament_groups where group_id = $1`)
            
            const result = await dbCon.query(query,[id])
            if(result.rowCount === 0) return res.status(400).send(`Data not found in deleting`)
            
            res.json(`Data has been deleted`)
        } catch (error) {
            next(error)
        }
    },
}