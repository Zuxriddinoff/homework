import { dbCon } from "../server.js"

export const teams = {

    findOneTeam: async (req,res,next)=>{
        
        try {
            const {id} = req.params

            const query = (`
                select * from teams
                where team_id = $1`)

            const result = await dbCon.query(query,[id])

            if(result.rowCount === 0){
                return res.status(404).send(`${id} not found`)
            }

            res.json(result.rows[0])
        } catch (error) {
            next(error)
        }
    },

    findAllTeams: async (req,res,next)=>{
        
        try {
            
            const query = (`select * from teams order by team_id`)
            
            const result = await dbCon.query(query)
            if(result.rowCount === 0){
                return res.status(404).send(`Insufficient data to find all`)
            }

            res.json(result.rows)


        } catch (error) {
            next(error)
        }
    },

    createTeams:async(req,res,next)=>{
        
        try {
            
            const {teamName,clubId,groupId,coachName} = req.body
            
            if(!teamName || !clubId || !groupId || !coachName) return res.status(400).send(`All data required to post`)

            const query = (`
                insert into teams (team_name,club_id,group_id,coach_name)
                values ($1,$2,$3,$4) returning *`)

            const result = await dbCon.query(query,[teamName,clubId,groupId,coachName])
            res.status(201).json(result.rows)
       
        } catch (error) {
            next(error)
        }
    },

    updateTeams: async (req,res,next)=>{
        
        try {
            const {id} = req.params
    
            if(!id) return res.status(404).send(`${id} not found`)
    
            const body = req.body
    
            if(!body.teamName && !body.clubId && !body.groupId && !body.coachName){
                return res.status(400).send(`At least one data is required to update`)
            }
    
            const fields = Object.keys(body)
            .map((key,i)=> `${key.replace(/([A-Z])/g, "_$1").toLowerCase()} = $${i + 1}`)
            .join(", ")
            const values = [...Object.values(body),id]
    
            const query = (`
                update teams
                set ${fields} 
                where team_id = $${values.length}`)
    
            const result = await dbCon.query(query,values)
    
            if(result.rowCount === 0) return res.status(404).send(`Data not found in updating`)
            
            res.json(`Data has been updated`)
        } catch (error) {
            next(error)
        }
    },

    deleteTeams: async (req,res,next)=>{
         
        try {
            const {id} = req.params
            if(!id) return res.status(404).send(`${id} not found`)

            const query = (`
                delete from teams where team_id = $1`)
            
            const result = await dbCon.query(query,[id])
            if(result.rowCount === 0) return res.status(400).send(`Data not found in deleting`)
            
            res.json(`Data has been deleted`)
        } catch (error) {
            next(error)
        }
    }
}

